import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

const baseUrl = 'chain-module-api/chain'
export default {
  name: 'AddNewChain',
  data() {
    return {
      chainFormValue: {},
      validation: {},
      goAddChain: false
    }
  },
  watch: {
    chains: 'setBreadcrumb'
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    Brand.deleteAll()
    Product.deleteAll()
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {},
  methods: {
    saveAndAdd() {
      this.goAddChain = true
      this.addChain()
    },
    addChain() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
      }
      this.$toast.show('Creating the chain...')

      const chain = {
        name: {
          en: this.chainFormValue.chain_en,
          ar: this.chainFormValue.chain_ar
        },
        status: Boolean(this.chainFormValue.status),
        media_id: this.chainFormValue?.selectedFile?.results?.[0]?.data?.id,
        brand_ids: this.$refs.brandsSelect.getSelectedBrandsIDs(),
        product_ids: this.$refs.brandsSelect.getSelectedProductsIDs()
      }
      this.$axios
        .$post(baseUrl, chain)
        .then(({ data }) => {
          this.$toast.success('Successfully created')
          if (this.goAddChain) {
            this.$router.push({
              name: 'branches-add',
              query: {
                chainId: data.id,
                chainName: this.chainFormValue.chain_en
              }
            })
          } else {
            this.$router.push('/chains')
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add new chain',
        parent: { title: 'Chains list' }
      })
    }
  }
}
