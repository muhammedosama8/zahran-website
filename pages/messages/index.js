export default {
  async fetch() {
    try {
      const { data: messages } = await this.$axios.$get(
        '/user-module-api/messages',
        {
          params: this.queryUrlParams()
        }
      )
      this.messages = messages.data
      this.totalCount = messages.meta.total
    } catch (e) {
      this.$toast.error('Error fetching Messages')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        from: null,
        to: null,
        demoIds: []
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      messages: [],
      fields: [
        {
          key: 'send_date',
          label: 'Send Date',
          sortable: true
        },
        {
          key: 'send_time',
          label: 'Send Time',
          sortable: true
        },
        {
          key: 'title.en',
          label: 'Message Title',
          sortable: true
        },
        {
          key: 'total_receivers',
          label: 'No. of Receivers',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      messageToDelete: null,
      demos: []
    }
  },
  computed: {
    totalRows() {
      return this.messages.length
    },
    demoOptions() {
      return [
        // { value: null, label: 'Any demo' },
        ...this.demos.map(({ name, id }) => ({
          value: id,
          label: name.en
        }))
      ]
    }
  },
  watch: {
    messages: 'setBreadcrumb',
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
      if (this.filtering.demoIds.length)
        params.demos = this.filtering.demoIds.map(({ value }) => value).join()
      return params
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Messages list (${this.totalCount})`
      })
    },
    /* Delete */
    showDeleteModal(message) {
      this.messageToDelete = message.id
      this.$refs.deleteMessageModal.show()
    },
    deleteMessage() {
      this.$toast.show('Deleting the Message...')

      this.$axios
        .$delete(`/user-module-api/messages/${this.messageToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteMessageModal.hide()
    },
    async fetchDemos() {
      try {
        const { data: demos } = await this.$axios.$get('/common-module-api/dropdown/demo')
        this.demos = demos
      } catch (e) {
        this.$toast.error('Error fetching demos')
      }
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
