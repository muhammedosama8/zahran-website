const pricingBaseUrl = 'brand-module-api/product/pricing'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(pricingBaseUrl, {
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
        brands: [],
        branches: []
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
          key: 'branch_name',
          label: 'Branch Name',
          sortable: true
        },
        {
          key: 'brand_name',
          label: 'Brand Name',
          sortable: true
        },
        {
          key: 'product_name',
          label: 'Product Name',
          sortable: true
        },
        {
          key: 'price',
          label: 'Price',
          class: 'inputPricing',
          sortable: true
        }
      ],
      products: [],
      brands: [],
      branches: []
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
    },
    branchOptions() {
      return [
        ...this.branches.map(({ name, id }) => ({ value: id, label: name.en }))
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
    this.setBreadcrumb()
    this.$fetch()
  },
  deactivated() {
    this.$destroy()
  },
  mounted() {
    this.fetchBrands()
    this.fetchBranches()
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
      if (this.filtering.brands.length) {
        params.brand_ids = this.filtering.brands
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.branches.length) {
        params.branch_ids = this.filtering.branches
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
    async fetchBranches() {
      try {
        const { data: branches } = await this.$axios.$get(
          'common-module-api/dropdown/branch'
        )
        this.branches = branches
      } catch (e) {
        this.$toast.error('Error fetching branches')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Product Pricing list (${this.totalCount})`
      })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    },
    exportExcel() {
      this.$axios
        .$get(`${pricingBaseUrl}/export`, {
          params: this.queryUrlParams(),
          responseType: 'blob'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'products.xlsx')
          document.body.appendChild(link)
          link.click()
          this.$toast.success('Excel Successfully Exported')
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
        .$post(`${pricingBaseUrl}/import`, formData, {
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
    editPrice(e) {
      e.target.removeAttribute('readonly')
    },
    updatePrice(e, item) {
      this.$toast.show('update the product price...')
      this.$axios
        .$put(`brand-module-api/product/${item.id}/pricing`, {
          price: item.price
        })
        .then(() => {
          this.$toast.success('price successfully updated')
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
      item.disable = false
      e.target.setAttribute('readonly', item.disable)
    }
  }
}
