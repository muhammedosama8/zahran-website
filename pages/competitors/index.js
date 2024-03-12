export default {
  async fetch() {
    try {
      const { data: competitors } = await this.$axios.$get(
        '/brand-module-api/competitors',
        {
          params: this.queryUrlParams()
        }
      )
      this.competitors = competitors.data
      this.totalCount = competitors.meta.total
    } catch (e) {
      this.$toast.error('Error fetching competitors')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      statusOptions: [
        { value: null, text: 'Any status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      competitors: [],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Competitor Name(EN)',
          sortable: true
        },
        {
          key: 'products_count',
          label: 'Products Count',
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
      competitorToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.competitors.length
    }
  },
  watch: {
    competitors: 'setBreadcrumb',
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
      return params
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Competitors List (${this.totalCount})`
      })
    },
    /* Delete */
    showDeleteModal(competitor) {
      this.competitorToDelete = competitor.id
      this.$refs.deleteCompetitorModal.show()
    },
    deleteCompetitor() {
      this.$toast.show('Deleting the competitor...')

      this.$axios
        .$delete(`/brand-module-api/competitors/${this.competitorToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteCompetitorModal.hide()
    },
    /* Active/Deactivate */
    toggleStatus(competitor) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`/brand-module-api/competitors/${competitor.id}/toggle-activation`)
        .then((res) => {
          this.$toast.success('Successfully updated')
          competitor.status = res.data.status
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
        .$post(`brand-module-api/competitors/data/import`, formData, {
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
