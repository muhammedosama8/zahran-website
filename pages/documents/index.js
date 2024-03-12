export default {
  async fetch() {
    try {
      const { data: documents } = await this.$axios.$get(
        '/user-module-api/documents',
        {
          params: this.queryUrlParams()
        }
      )
      this.documents = documents.data
      this.totalCount = documents.meta.total
    } catch (e) {
      this.$toast.error('Error fetching Documents')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        from:null,
        to:null,
        demos:[]
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      documents: [],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'title.en',
          label: 'Name',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'type',
          label: 'File Type',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      documentIdToDelete:[],
      demos:[]
    }
  },
  computed: {
    totalRows() {
      return this.documents.length
    },
    demoOptions() {
      return this.demos.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    
  },
  watch: {
    documents: 'setBreadcrumb',
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
    this.fetchDemos()

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
      if (this.filtering.from) params.date_from = this.filtering.from
      if (this.filtering.to) params.date_to = this.filtering.to
      if (this.filtering.demos.length) params.demo_ids = this.filtering.demos.map(({ value }) => value).join(',')
      return params
    },
    async fetchDemos() {
      try {
        const { data: demos } = await this.$axios.$get(
          'common-module-api/dropdown/demo'
        )
        this.demos = demos
      } catch (e) {
        this.$toast.error('Error fetching demos')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Documents list (${this.totalCount})`
      })
    },
    /* Delete */
    showDeleteModal(document) {
      this.documentToDelete = document.id
      this.$refs.deleteDocumentModal.show()
    },
    
    deleteDocument() {
      this.$toast.show('Deleting the Document...')

      this.$axios
        .$delete(`/user-module-api/documents/${this.documentToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteDocumentModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
