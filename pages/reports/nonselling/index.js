const productBaseUrl = 'chain-module-api/non-selling'
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
        branches: [],
        chains: [],
        from: null,
        to: null
      },
      totalCount: 0,
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
          key: 'branches',
          label: 'Branches',
          sortable: true
        }
      ],
      products: [],
      branches: [],
      chains: [],
      productToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.products.length
    },
    chainOptions() {
      return this.chains.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    branchOptions() {
      return this.branches.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
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
    this.fetchBranches()
    this.fetchChains()
  },
  methods: {
    getZahranData() {
      setTimeout(() => {
        this.$fetch()
      }, 1000)
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
    async fetchChains() {
      try {
        const { data: chains } = await this.$axios.$get(
          'common-module-api/dropdown/chain'
        )
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching chains')
      }
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.branches.length)
        params.branch_ids = this.filtering.branches
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.chains.length)
        params.chain_ids = this.filtering.chains
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.from) params.from_date = this.filtering.from
      if (this.filtering.to) params.to_date = this.filtering.to
      return params
    },
    // async fetchBrands() {
    //   try {
    //     const { data: brands } = await this.$axios.$get(
    //       'common-module-api/dropdown/brand'
    //     )
    //     this.brands = brands
    //   } catch (e) {
    //     this.$toast.error('Error fetching brands')
    //   }
    // },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Product list (${this.totalCount})`
      })
    },
    // showDeleteModal(brand) {
    //   this.productToDelete = brand.id
    //   this.$refs.deleteProductModal.show()
    // },

    exportFile(type) {
      this.$axios
        .$get(`${productBaseUrl}`, {
          params: {
            ...this.queryUrlParams(),
            export_type: type
          },
          responseType: 'blob'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            type === 'excel' ? 'reports.xlsx' : 'reports.pdf'
          )
          document.body.appendChild(link)
          link.click()
          this.$toast.success('Excel Successfully Exported')
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
