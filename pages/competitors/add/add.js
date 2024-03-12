
export default {
  /* eslint-disable */
  name: 'AddNewCompetitor',
  data() {
    return {
      addNewCompetitorFormValue: {},
      validation: {},
      products: [],
      random: 0
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
    addCompetitor() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      

      this.$toast.show('Creating the competitor...')
      const competitor = {
        name: {
          en: this.addNewCompetitorFormValue.name_en,
          ar: this.addNewCompetitorFormValue.name_ar
        },
       
        
        status: Boolean(this.addNewCompetitorFormValue.status),
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
        .$post('/brand-module-api/competitors', competitor)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/competitors')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add New Competitor',
        parent: { title: 'Competitors' }
      })
    },

    removeProduct(index) {
      this.products.splice(index, 1)
    },
    addProduct() {
      this.products.push({
        product: { en: '', ar: '' }
      })
    },
    randomKey() {
      this.random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    }
  }
}
