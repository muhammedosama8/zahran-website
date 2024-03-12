const baseUrl = 'chain-module-api/chain'
export default {
  name: 'Chain',
  async fetch() {
    try {
      const { data: chains } = await this.$axios.$get(baseUrl, {
        params: this.queryUrlParams()
      })
      this.chains = chains.data
      this.totalCount = chains.meta.total
    } catch (e) {
      this.$toast.error('Error fetching chains')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null,
        brandIds: []
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Chain Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Chain Name (AR)',
          sortable: true
        },
        {
          key: 'branches_count',
          label: 'No. Of Branches',
          sortable: true
        },
        {
          key: 'brands_count',
          label: 'No. Of Brands',
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
      chains: [],
      ChainToDelete: null,
      statusOptions: [
        { value: null, text: 'Filter by status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      brands: []
    }
  },
  computed: {
    totalRows() {
      return this.chains.length
    },
    brandOptions() {
      return [
        { value: null, label: 'Brand', selected: true },
        ...this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    chains: 'setBreadcrumb',
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
      if (this.filtering.brandIds.length)
        params.brand_ids = this.filtering.brandIds
          .map(({ value }) => value)
          .join()
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
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
        title: `Chains list (${this.totalCount})`
      })
    },
    showDeleteModal(Chain) {
      this.ChainToDelete = Chain.id
      this.$refs.deleteChainModal.show()
    },
    deleteChain() {
      this.$toast.show('Deleting the Chain...')
      this.$axios
        .$delete(`${baseUrl}/${this.ChainToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })
      this.$refs.deleteChainModal.hide()
    },
    toggleStatus(chain) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${baseUrl}/${chain.id}/toggle-activation`)
        .then((res) => {
          this.$toast.success('Successfully updated')
          chain.status = res.data.status
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
        .$post(`chain-module-api/chain/data/import`, formData, {
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
