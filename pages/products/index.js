const productBaseUrl = 'brand-module-api/product'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(productBaseUrl, {
        params: this.queryUrlParams()
      })
      this.products = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      pageOptions: [100, 50, 25, 10],
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null,
        brand: []
      },
      searchKeyword: '',
      totalCount: 0,
      statusOptions: [
        { value: null, text: 'Filter by status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Product Name',
          sortable: true
        },
        {
          key: 'module_num',
          label: 'Module Number',
          sortable: true
        },
        {
          key: 'serial_num',
          label: 'CMMF',
          sortable: true
        },
        {
          key: 'barcode',
          label: 'Barcode',
          sortable: true
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true
        },
        {
          key: 'brand.name',
          label: 'Brand Name',
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
      products: [],
      brands: [],
      productToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.products.length
    },
    brandOptions() {
      return [
        ...this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    products: 'setBreadcrumb',
    filtering: {
      handler: 'getZahranData',
      deep: true
    }
  },
  activated() {
    this.$fetch()
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
  },
  mounted() {
    this.fetchBrands()
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
      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      if (this.filtering.brand.length) {
        params.brand_ids = this.filtering.brand
          .map(({ value }) => value)
          .join(',')
      }
      return params
    },
    async fetchBrands() {
      try {
        const { data: brands } = await this.$axios.$get(
          'common-module-api/dropdown/brand'
        )
        this.brands = brands
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Product list (${this.totalCount})`
      })
    },
    showDeleteModal(brand) {
      this.productToDelete = brand.id
      this.$refs.deleteProductModal.show()
    },
    deleteProduct() {
      this.$toast.show('Deleting the product...')
      this.$axios
        .$delete(`${productBaseUrl}/${this.productToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })
      this.$refs.deleteProductModal.hide()
    },
    toggleStatus(product) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${productBaseUrl}/${product.id}/toggle-activation`)
        .then(() => {
          this.$toast.success('Successfully updated')
          product.status = !product.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    handleFileUpload() {
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      this.$toast.show('Importing Excel...')
      this.$axios
        .$post(`brand-module-api/product/import`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.$toast.success('Successfully Imported')
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
