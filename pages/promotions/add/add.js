import _ from 'lodash'
import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

export default {
  /* eslint-disable */
  name: 'AddNewPromotion',
  data() {
    return {
      /* Brand */
      addNewPromotionFormValue: {},
      validation: {},
      branches: [],
      chains: [],
      selectedBranches: null,
      branchesValue: [],
      chainsValue: [],
      forceSelectBrands: {},
      isAllChainsSelected:false,
      isAllBranchesSelected:false,
      promotionTypes:[
        { id: 'OFFER', name: 'Offer' },
        { id: 'VALUE', name: 'Value' },
      ]
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
    this.fetchChains()
    this.fetchpromotionTypes()
  },
  methods: {
    addTask() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }

      this.$toast.show('Creating the promotion...')

      if (! this.checkAr(this.addNewPromotionFormValue.title_ar)) {
        this.$toast.error('العنوان العربى يجب أن يكون حروف وأرقام عربية')
      }
      if (! this.checkAr(this.addNewPromotionFormValue.description_ar)) {
        this.$toast.error('الوصف العربى يجب أن يكون حروف وأرقام عربية')
      }

      const promotion = {
        media_id: this.addNewPromotionFormValue?.selectedFile?.results?.[0]?.data?.id,
        title: {
          en: this.addNewPromotionFormValue.title_en,
          ar: this.addNewPromotionFormValue.title_ar
        },
        description: {
          en: this.addNewPromotionFormValue.description_en,
          ar: this.addNewPromotionFormValue.description_ar
        },
        promotion_type: this.addNewPromotionFormValue.promotion_type?.value,
        value: this.addNewPromotionFormValue.value,
        status: Boolean(this.addNewPromotionFormValue.status),
        // eslint-disable-next-line no-prototype-builtins
        display_type_id: this.addNewPromotionFormValue.hasOwnProperty(
          'displayTypeValue'
        )
          ? this.addNewPromotionFormValue.displayTypeValue.value
          : '',
        from_date: this.addNewPromotionFormValue.from_date,
        to_date: this.addNewPromotionFormValue.to_date,
        branches: this.branchesValue.map(({ value }) => value),
        brands: this.$refs.brandsBranchSelect?.getSelectedBrandsIDs(),
        products: this.$refs.brandsBranchSelect?.getSelectedProductsIDs()
      }
      this.$axios
        .$post('brand-module-api/promotions', promotion)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/promotions')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    checkAr(val) { 
      const pattern = /^[\u0621-\u064A\u0660-\u0669 ]+$/

      return pattern.test(val)
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add New Promotion',
        parent: { title: 'Promotions' }
      })
    },
    fetchChains() {
      this.$axios
        .$get('common-module-api/dropdown/chain')
        .then(({ data: chains }) => {
          this.chains = chains
          if (this.isAllChainsSelected) {
            this.chainsValue = this.chainsOptions
          }
          // this.chainsValue = this.isAllChainsSelected ? this.chainsOptions : ''
        })
        .catch(() => {
          this.$toast.error('Error while fetching chains')
        })
    },
    fetchpromotionTypes() {
      
    },
    fetchBranches() {
      const chainIds = _.map(this.chainsValue, 'value').join(',')
      if(chainIds){
        this.$axios
        .$get(`common-module-api/dropdown/branch?chain_id=${chainIds}&has_no_visits=1`)
        .then(({ data: branches }) => {
          this.branches = branches
          if (this.chainsValue.length) {
            if (this.isAllBranchesSelected) {
              this.branchesValue = this.branchesOptions
            }
            // this.branchesValue = this.isAllBranchesSelected ? this.branchesOptions : ''
          } else {
            this.branchesValue = []
          }
        })
        .catch(() => {
          this.$toast.error('Error while fetching branches')
        })
      }
      
    },
    
    changeSelectedBranches(newTerr) {
      this.selectedBranches = _.map(newTerr, 'value').join(',')
    }
  }
}