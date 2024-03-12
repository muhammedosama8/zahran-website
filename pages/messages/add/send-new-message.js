export default {
  name: 'SendNewMessage',
  data() {
    return {
      /* Brand */
      sendNewMessage: {},
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
    sendDM() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
        if (this.validation.hasErrors) {
          this.$toast.error(this.validation.errors.join(' &'))
          return
        }
        this.$toast.show('Creating the Send message...')
        // eslint-disable-next-line no-prototype-builtins
        const media = this.sendNewMessage.hasOwnProperty('messageImages')
          ? this.sendNewMessage.messageImages
          : []
        // const media = []
        const dM = {
          title: {
            en: this.sendNewMessage.title_en,
            ar: this.sendNewMessage.title_ar
          },
          body: {
            en: this.sendNewMessage.message_body_en,
            ar: this.sendNewMessage.message_body_ar
          },

          media: media
            .map(({ selectedFile }) =>
              selectedFile.results.map(({ data }) => data.id)
            )
            .flat(),
          receivers: this.receiversValue.length
            ? this.receiversValue.map(({ value }) => value)
            : []
        }
        this.$axios
          .$post('user-module-api/messages', dM)
          .then(() => {
            this.$toast.success('Successfully created')
            this.$router.push('/messages')
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
          })
      }, 1000)
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Send New Messages',
        parent: { title: 'Messages' }
      })
    },
    fetchDemos() {
      // if (this.demos.length) return
      this.$axios
        .$get('/common-module-api/dropdown/demo')
        .then(({ data: demos }) => {
          this.demos = demos
          this.receiversValue = this.isAllReceiversSelected
            ? this.demosOptions
            : ''
        })
        .catch(() => {
          this.$toast.error('Error while fetching demos')
        })
    }
  }
}
