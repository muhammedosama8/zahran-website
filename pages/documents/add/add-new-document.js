export default {
  name: 'AddNewDocument',
  data() {
    return {
      /* Brand */
      addNewDocument: {},
      validation: {},
      demos: [],
      receiversValue: [],
      isAllReceiversSelected: false,
      disabled: false
    }
  },
  computed: {
    demosOptions() {
      if (!this.demos.length) return []
      return this.demos.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    if (process.environment === 'production') {
      window.onbeforeunload = () => 1
    }
    this.fetchDemos()
  },
  methods: {
    addDocument() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
        if (this.validation.hasErrors) {
          this.$toast.error(this.validation.errors.join(' &'))
          return
        }
        this.$toast.show('Creating the document...')
        // const media = this.addNewDocument.hasOwnProperty('documentImages')
        //   ? this.addNewDocument.documentImages
        //   : []
        const document = {
          title: {
            en: this.addNewDocument.title_en,
            ar: this.addNewDocument.title_ar
          },
          media_id: this.addNewDocument?.selectedFile?.results?.[0]?.data?.id,
          receivers: this.receiversValue.length
            ? this.receiversValue.map(({ value }) => value)
            : []
        }
        this.$axios
          .$post('user-module-api/documents', document)
          .then(() => {
            this.$toast.success('Successfully created')
            this.$router.push('/documents')
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
          })
      }, 1000)
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add New Documents',
        parent: { title: 'Documents' }
      })
    },
    fetchDemos() {
      // if (this.demos.length) return
      this.$axios
        .$get('/common-module-api/dropdown/demo')
        .then(({ data: demos }) => {
          this.demos = demos
          if (this.isAllReceiversSelected) {
            this.receiversValue = this.demosOptions
          }
          // this.receiversValue = this.isAllReceiversSelected
          //   ? this.demosOptions
          //   : ''
        })
        .catch(() => {
          this.$toast.error('Error while fetching demos')
        })
    }
  }
}
