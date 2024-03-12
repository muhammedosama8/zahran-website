import ticketTypeFormSchema from '~/data/forms/system/addTicketType'
export default {
  name: 'TicketTypesPage',
  async fetch() {
    try {
      const { data: ticketTypes } = await this.$axios.$get(
        'setting-module-api/ticket-type',
        {
          params: this.queryUrlParams()
        }
      )
      this.ticketTypes = ticketTypes.data
      this.totalCount = ticketTypes.meta.total
    } catch (e) {
      this.$toast.error('Error fetching ticket types')
    }
  },
  data() {
    return {
      addTicketTypeFormValues: {},
      updateTicketTypeFormValues: {
        ticketType_ar: '',
        ticketType_en: ''
      },
      ticketTypeFormSchema,
      ticketTypeToDelete: null,
      ticketTypes: [],

      // tableData,
      filtering: {
        currentPage: 1,
        perPage: 100,
        searchTerm: null
      },
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'name.en',
          label: 'TicketType Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'TicketType Name (AR)',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  computed: {
    rowsCount() {
      return this.ticketTypes.length
    }
  },
  watch: {
    ticketTypes: 'setBreadcrumb',
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
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Ticket types list (${this.ticketTypes.length})`,
        parent: { title: 'System settings' }
      })
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
      return params
    },
    showUpdateModal(ticketType) {
      this.updateTicketTypeFormValues.id = ticketType.id
      this.updateTicketTypeFormValues.ticketType_ar = ticketType.name.ar
      this.updateTicketTypeFormValues.ticketType_en = ticketType.name.en
      this.$refs.updateTicketTypeModal.show()
    },
    showDeleteModal(ticketType) {
      this.ticketTypeToDelete = ticketType.id
      this.$refs.deleteTicketTypeModal.show()
    },
    addTicketType() {
      const data = {
        name: {
          ar: this.addTicketTypeFormValues.ticketType_ar,
          en: this.addTicketTypeFormValues.ticketType_en
        }
      }

      this.$toast.show('Creating the ticketType...')
      this.$axios
        .$post('setting-module-api/ticket-type', data)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$fetch()
          this.addTicketTypeFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.createTicketTypeModal.hide()
    },
    updateTicketType() {
      const data = {
        name: {
          ar: this.updateTicketTypeFormValues.ticketType_ar,
          en: this.updateTicketTypeFormValues.ticketType_en
        }
      }

      this.$toast.show('Updating the ticketType...')
      this.$axios
        .$put(
          `setting-module-api/ticket-type/${this.updateTicketTypeFormValues.id}`,
          data
        )
        .then((res) => {
          this.$toast.success('Successfully updated')
          this.$fetch()
          this.updateTicketTypeFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.updateTicketTypeModal.hide()
    },
    deleteTicketType() {
      this.$toast.show('Deleting the ticketType...')

      this.$axios
        .$delete(`setting-module-api/ticket-type/${this.ticketTypeToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.ticketTypeToDelete = null
      this.$refs.deleteTicketTypeModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
