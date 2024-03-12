

export default {
  name: 'EditCompetitor',
  async fetch() {
    const { data: competitor } = await this.$axios.$get(
      `brand-module-api/competitors/${this.$route.params.competitorId}`
    )
    this.competitor = competitor
    /* Strings */
    this.updateCompetitorFormValue.name_en = competitor.name.en
    this.updateCompetitorFormValue.name_ar = competitor.name.ar
    this.updateCompetitorFormValue.status = competitor.status



    if (competitor.products.length) {
      this.products = competitor.products.map(
        // eslint-disable-next-line camelcase
        (product) => ({
          product: { en: product.name.en, ar: product.name.ar }
        })
      )
    } else {
      this.addProduct()
    }
  },
  data() {
    return {
      updateCompetitorFormValue: {},
      competitor: {},
      validation: {},
      products: [],
    }
  },
  computed: {
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
  },
  methods: {
    updateCompetitor() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      this.$toast.show('Updating the competitor...')

      const competitor = {
        name: {
          en: this.updateCompetitorFormValue.name_en,
          ar: this.updateCompetitorFormValue.name_ar
        },
        status: Boolean(this.updateCompetitorFormValue.status),
        products: this.products
          .filter(
            (product) =>
              product.product.en != ''
          )
          .map((product) => ({
            name: {'en':product.product.en, 'ar':product.product.ar},
          })),
      }
      this.$axios
        .$put(`brand-module-api/competitors/${this.$route.params.competitorId}`, competitor)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/competitors')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Update Competitor',
        parent: { title: 'Competitors' }
      })
    },
    removeProduct(index) {
      this.products.splice(index, 1)
    },
    addProduct() {
      this.products.push({
        product: { en: '', ar: '' },
      })
    },
    
    randomKey() {
      this.random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    }
  }
}
