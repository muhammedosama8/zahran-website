const ticketBaseUrl = 'chain-module-api/ticket'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(ticketBaseUrl, {
        params: this.queryUrlParams()
      })
      if (this.filtering.selectedStatus === 1)
        this.fields.splice(7, 0, {
          key: 'resolving_date_time.general',
          label: 'Resolving date/time',
          sortable: true
        })
      else this.fields.splice(7, 1)
      this.tickets = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      pageOptions: [100, 50, 25, 10],
      filtering: {
        currentPage: 1,
        perPage: 100,
        severity: null,
        from: null,
        to: null,
        demos: [],
        branches: [],
        products: [],
        selectedStatus: 1,
        selectedTicketType: []
      },
      searchKeyword: '',
      totalCount: 0,
      statusOptions: [
        { value: 1, text: 'Resolved' },
        { value: 0, text: 'Opened' }
      ],
      severityOptions: [
        { value: null, label: 'Severity' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'title',
          label: 'Ticket Title',
          sortable: true
        },
        {
          key: 'ticket_type.name',
          label: 'Ticket Type',
          sortable: true
        },
        {
          key: 'severity',
          label: 'Severity',
          sortable: true
        },
        {
          key: 'branch.name',
          label: 'Branch',
          sortable: true
        },
        // {
        //   key: 'brand.name',
        //   label: 'Brand',
        //   sortable: true
        // },
        {
          key: 'demo.name',
          label: 'Creator',
          sortable: true
        },
        {
          key: 'created_at.date',
          label: 'Creation date',
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
      tickets: [],
      branches: [],
      products: [],
      demos: [],
      ticketTypes: [],
      ticketToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.tickets.length
    },
    demosOptions() {
      return this.demos.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    ticketTypesOptions() {
      return this.ticketTypes.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    branchesOptions() {
      return this.branches.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    productOptions() {
      return this.products.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  watch: {
    tickets: 'setBreadcrumb',
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
    this.fetchBranches()
    this.fetchTicketTypes()
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
      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.selectedStatus !== null)
        params.resolved = this.filtering.selectedStatus
      if (this.filtering.severity !== null)
        params.severity = this.filtering.severity.value
      if (this.filtering.demos.length)
        params.demo_ids = this.filtering.demos
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.branches.length)
        params.branch_ids = this.filtering.branches
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.products.length)
        params.product_ids = this.filtering.products
          .map(({ value }) => value)
          .join(',')
      // if (this.filtering.selectedTicketType)
      //   params.ticketType_ids = this.filtering.selectedTicketType.value
      if (this.filtering.selectedTicketType.length) {
        params.ticketType_ids = this.filtering.selectedTicketType
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.from) params.from_date = this.filtering.from
      if (this.filtering.to) params.to_date = this.filtering.to
      // if (this.filtering.selectedTicketStatus !== false)
      //   params.resolved = this.filtering.selectedTicketStatus
      return params
    },
    async fetchBranches() {
      try {
        const { data: branches } = await this.$axios.$get(
          'common-module-api/dropdown/branch'
        )
        this.branches = branches
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    async fetchDemos() {
      try {
        const { data: demos } = await this.$axios.$get(
          'common-module-api/dropdown/demo'
        )
        this.demos = demos
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    async fetchTicketTypes() {
      try {
        const { data: ticketTypes } = await this.$axios.$get(
          'common-module-api/dropdown/ticket-type'
        )
        this.ticketTypes = ticketTypes
      } catch (e) {
        this.$toast.error('Error fetching ticket Types')
      }
    },
    async fetchProducts() {
      try {
        const { data: products } = await this.$axios.$get(
          'common-module-api/dropdown/product'
        )
        this.products = products
      } catch (e) {
        this.$toast.error('Error fetching products')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Tickets list (${this.totalCount})`
      })
    },
    showDeleteModal(ticket) {
      this.ticketToDelete = ticket.id
      this.$refs.deleteTicketModal.show()
    },
    deleteTicket() {
      this.$toast.show('Deleting the Ticket...')

      this.$axios
        .$delete(`${ticketBaseUrl}/${this.ticketToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteTicketModal.hide()
    },
    toggleStatus(ticket) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${ticketBaseUrl}/${ticket.id}/toggle-status`)
        .then(() => {
          this.$toast.success('Successfully updated')
          // ticket.status = !ticket.status
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    exportFile(type) {
      this.$axios
        .$get(`${ticketBaseUrl}`, {
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
            type === 'excel' ? 'tickets.xlsx' : 'tickets.pdf'
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
