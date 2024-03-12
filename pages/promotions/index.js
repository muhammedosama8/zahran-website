export default {
  // activated() {
  //   this.$store.dispatch('breadcrumb/update', { title: 'Promotions' })
  // }
  async fetch() {
    try {
      const { data } = await this.$axios.$get('brand-module-api/promotions', {
        params: this.queryUrlParams()
      })
      this.promotions = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      totalCount: 0,
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null,
        // brandId: null,
        brandId: [],
        subBrandId: null,
        from: null,
        to: null,
        productId: null
      },
      searchKeyword: '',
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'title',
          label: 'Promotion Title',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'from_date',
          label: 'Date From',
          sortable: true
        },
        {
          key: 'to_date',
          label: 'Date To',
          sortable: true
        },
        {
          key: 'brands_no',
          label: 'Brand',
          sortable: true
        },
        {
          key: 'promotion_type',
          label: 'Promotion Type',
          sortable: true
        },
        {
          key: 'value',
          label: 'Value',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],

      /* For filters */
      promotions: [],
      brands: [],
      products: [],
      statusOptions: [
        { value: null, text: 'Status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' },
        { value: 2, text: 'Expired' }
      ],
      branches: [],
      promotionToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.promotions.length
    },
    brandOptions() {
      return [
        // { value: null, label: 'Brand', selected: true },
        ...this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    productOptions() {
      return [
        // { value: null, label: 'Product', selected: true },
        ...this.products.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    promotions: 'setBreadcrumb',
    filtering: {
      handler: 'getZahranData',
      deep: true
    }
  },
  activated() {
    this.setBreadcrumb()
    this.$fetch()
  },
  deactivated() {
    this.$destroy()
  },
  mounted() {
    this.fetchBrands()
    this.fetchProducts()
  },
  methods: {
    getZahranData() {
      setTimeout(() => {
        this.$fetch()
      }, 1000)
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      // if (this.filtering.brandId) params.brand_ids = this.filtering.brandId.value
      if (this.filtering.brandId.length) {
        params.brand_ids = this.filtering.brandId
          .map(({ value }) => value)
          .join(',')
      }
      if (
        Array.isArray(this.filtering.products) &&
        this.filtering.products.length > 0
      ) {
        params.product_ids = this.filtering.products
          .map(({ value }) => value)
          .join()
      }

      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.from) params.from_date = this.filtering.from
      if (this.filtering.to) params.to_date = this.filtering.to

      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      return params
    },
    async fetchBrands() {
      try {
        const { data: brands } = await this.$axios.$get(
          'common-module-api/dropdown/brand?parent_id='
        )
        this.brands = brands
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    async fetchProducts(brandId) {
      try {
        const params = {}
        if (this.filtering.brandId.length) {
          params.brand_ids = this.filtering.brandId
            .map(({ value }) => value)
            .join(',')
        }
        // const subBrandIds = brandId.value
        // `common-module-api/dropdown/product?brand_id=${subBrandIds}`
        const { data: products } = await this.$axios.$get(
          'common-module-api/dropdown/product',
          {
            params
          }
        )
        this.products = products
      } catch (e) {
        this.$toast.error('Error fetching products')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Promotions list (${this.totalCount})`
      })
    },
    /* Delete */
    showDeleteModal(promotion) {
      this.promotionToDelete = promotion.id
      this.$refs.deletePromotionModal.show()
    },
    deletePromotion() {
      this.$toast.show('Deleting the promotion...')

      this.$axios
        .$delete(`brand-module-api/promotions/${this.promotionToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deletePromotionModal.hide()
    },
    /* Active/Deactivate */
    toggleStatus(promotion) {
      this.$toast.show('Updating...')
      this.$axios
        .$post(`brand-module-api/promotions/${promotion.id}/toggle-activation`)
        .then((res) => {
          this.$toast.success('Successfully updated')
          promotion.status = res.data.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
