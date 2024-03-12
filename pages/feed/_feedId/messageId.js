export default {
  name: 'MessageShow',
  async fetch() {
    const { data: message } = await this.$axios.$get(
      `user-module-api/messages/${this.$route.params.messageId}`
    )
    this.message = message
  },
  data() {
    return {
      message: {}
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  methods: {
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Show Message',
        parent: { title: 'Direct Messages' }
      })
    },
    showDeleteModal(message) {
      this.messageToDelete = message.id
      this.$refs.deleteMessageModal.show()
    },
    deleteMessage() {
      this.$toast.show('Deleting the Message...')

      this.$axios
        .$delete(`user-module-api/messages/${this.messageToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$router.push('/messages')
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteMessageModal.hide()
    }
  }
}
