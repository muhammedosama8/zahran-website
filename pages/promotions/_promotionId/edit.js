import _ from 'lodash'
import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

export default {
  name: 'EditPromotion',
  async fetch() {
    const { data: promotion } = await this.$axios.$get(
      `brand-module-api/promotions/${this.$route.params.promotionId}`
    )
    this.promotion = promotion
    /* Strings */
    this.updatePromotionFormValue.title_en = promotion.title.en
    this.updatePromotionFormValue.title_ar = promotion.title.ar
    this.updatePromotionFormValue.description_en = promotion.description.en
    this.updatePromotionFormValue.description_ar = promotion.description.ar
    this.updatePromotionFormValue.status = promotion.status
    this.updatePromotionFormValue.from_date = promotion.from_date
    this.updatePromotionFormValue.to_date = promotion.to_date
    this.updatePromotionFormValue.value = promotion.value
    this.updatePromotionFormValue.selectedFile = [{ url: promotion.media.path }]

    // this.updatePromotionFormValue.selectedFile = promotion.media_id
    this.updatePromotionFormValue.promotion_type = this.promotionTypesOptions.find(
      ({ value }) => value == promotion.promotion_type
    )
    /* Brands-select */
    if (promotion.brands.length)
      this.forceSelectBrands.brands = promotion.brands

    if (promotion.products.length)
      this.forceSelectBrands.products = promotion.products

    /* Dropdowns */
    await this.fetchChains()

    this.chainsValue = this.chainsOptions.filter(({ value }) =>
      promotion.chain_ids.includes(value)
    )

    await this.fetchBranches(this.chainsValue)
    this.branchesValue = this.branchesOptions.filter(({ value }) =>
      promotion.branch_ids.includes(value)
    )
  },
  data() {
    return {
      updatePromotionFormValue: {},
      promotion: {},
      validation: {},
      branches: [],
      chains: [],
      promotionTypes: [
        { id: 'OFFER', name: 'Offer' },
        { id: 'VALUE', name: 'Value' }
      ],
      branchesValue: {},
      selectedBranches: null,
      chainsValue: {},
      forceSelectBrands: {},
      isAllChainsSelected: false,
      isAllBranchesSelected: false
    }
  },
  computed: {
    chainsOptions() {
      if (!this.chains.length) return []
      return this.chains.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    },
    branchesOptions() {
      if (!this.branches.length) return []
      return this.branches.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    },
    promotionTypesOptions() {
      if (!this.promotionTypes.length) return []
      return this.promotionTypes.map(({ id, name }) => ({
        value: id,
        label: name
      }))
    }
  },
  activated() {
    this.setBreadcrumb()
    this.changeSelectedBranches(this.branchesValue)
  },
  deactivated() {
    Brand.deleteAll()
    Product.deleteAll()
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    if (process.environment === 'production') {
      window.onbeforeunload = () => 1
    }
  },
  methods: {
    updatePromotion() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      this.$toast.show('Updating the Promotion...')
      const promotion = {
        media_id: this.updatePromotionFormValue?.selectedFile?.results?.[0]
          ?.data?.id,

        title: {
          en: this.updatePromotionFormValue.title_en,
          ar: this.updatePromotionFormValue.title_ar
        },
        description: {
          en: this.updatePromotionFormValue.description_en,
          ar: this.updatePromotionFormValue.description_ar
        },
        promotion_type: this.updatePromotionFormValue.promotion_type?.value,
        value: this.updatePromotionFormValue.value,
        status: Boolean(this.updatePromotionFormValue.status),
        from_date: this.updatePromotionFormValue.from_date,
        to_date: this.updatePromotionFormValue.to_date,
        branches: this.branchesValue.map(({ value }) => value),
        brands: this.$refs.brandsSelect?.getSelectedBrandsIDs(),
        products: this.$refs.brandsSelect?.getSelectedProductsIDs()
      }
      this.$axios
        .$put(
          `brand-module-api/promotions/${this.$route.params.promotionId}`,
          promotion
        )
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/promotions')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Update promotions',
        parent: { title: 'Promotions' }
      })
    },
    async fetchDislayTypes() {
      if (this.displayTypes.length) return

      try {
        const { data: displayTypes } = await this.$axios.$get(
          'common-module-api/dropdown/displayType'
        )
        this.displayTypes = displayTypes
      } catch (e) {
        this.$toast.error('Error while fetching displayType')
      }
    },
    async fetchChains() {
      // if (this.chains.length) return
      try {
        const { data: chains } = await this.$axios.$get(
          'common-module-api/dropdown/chain'
        )
        this.chains = chains
        this.chainsValue = this.isAllChainsSelected
          ? this.chainsOptions
          : this.chainsOptions.filter(({ value }) =>
              this.promotion.chain_ids.includes(value)
            )
      } catch (e) {
        this.$toast.error('Error while fetching chains')
      }
    },
    async fetchBranches() {
      // if (this.branches.length) return
      try {
        const chainIds = _.map(this.chainsValue, 'value').join(',')
        const { data: branches } = await this.$axios.$get(
          `common-module-api/dropdown/branch?chain_id=${chainIds}&has_no_visits=1`
        )
        this.branches = branches
        this.branchesValue = this.isAllBranchesSelected
          ? this.branchesOptions
          : this.branchesOptions.filter(({ value }) =>
              this.promotion.branch_ids.includes(value)
            )
      } catch (e) {
        this.$toast.error('Error while fetching branches')
      }
    },
    changeSelectedBranches(newTerr) {
      this.selectedBranches = _.map(newTerr, 'value').join(',')
    },
    showDeleteModal(task) {
      this.taskToDelete = task.id
      this.$refs.deleteTaskModal.show()
    }
  }
}
