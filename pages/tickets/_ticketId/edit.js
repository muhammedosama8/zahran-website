const ticketBaseUrl = 'chain-module-api/ticket'
export default {
  name: 'EditTicket',
  async fetch() {
    const { data: ticket } = await this.$axios.$get(
      'chain-module-api/ticket/' + this.$route.params.ticketId
    )
    this.ticket = ticket
  },
  data() {
    return {
      ticket: {}
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Show Ticket`,
        parent: { title: 'Tickets' }
      })
    },
    toggleStatus(ticket) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${ticketBaseUrl}/${ticket.id}/toggle-status`)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.ticket.status = 'Resolved'
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
