export default {
  name: 'DocumentShow',
  async fetch() {
    const { data: document } = await this.$axios.$get(
      `user-module-api/documents/${this.$route.params.documentId}`
    )
    this.document = document
  },
  data() {
    return {
      document: {}
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  methods: {
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Show Document',
        parent: { title: 'Documents' }
      })
    },
    showDeleteModal(document) {
      this.documentToDelete = document.id
      this.$refs.deleteDocumentModal.show()
    },
    deleteDocument() {
      this.$toast.show('Deleting the Document...')

      this.$axios
        .$delete(`user-module-api/documents/${this.documentToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$router.push('/documents')
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteDocumentModal.hide()
    }
  }
}
