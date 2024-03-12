/* eslint-disable */
import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

const baseUrl = 'chain-module-api/chain'
export default {
  name: 'EditChain',
  async fetch() {
    const { data: chain } = await this.$axios.$get(
        `${baseUrl}/${ this.$route.params.chainId}`
    )
    this.chain = chain
    this.chainFormValue.chain_en = chain.name.en
    this.chain_name_en = chain.name.en
    this.chainFormValue.chain_ar = chain.name.ar
    this.chainFormValue.status = Boolean(chain.status)
    this.chainFormValue.selectedFile = [{ url: chain.media.path }]
    this.branches = this.chain.branches;
  },
  data() {
    return {
      chainFormValue: {},
      validation: {},
      chain: {},
      chain_name_en: null,
      branches: [],
      branchesTable: [
        {
          key: 'name.en',
          label: 'Branch Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Branch Name (AR)',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'area.name.en',
          label: 'Area',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      renderForm: 0,
      branchToDelete: null
    }
  },
  activated() {
    this.setBreadcrumb()
    this.$fetch()
  },
  deactivated() {
    Brand.deleteAll()
    Product.deleteAll()
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    alertme() { 
      alert('ok');
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    },
    updateChain() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      this.$toast.show('Updating the chain...')

      var media_id = this.chainFormValue?.selectedFile?.results?.[0]?.data?.id;
      if (this.chainFormValue.selectedFile?.files?.length == 0) { 
        media_id = '';
      }
      
      const chain = {
        name: {
          en: this.chainFormValue.chain_en,
          ar: this.chainFormValue.chain_ar
        },
        status: Boolean(this.chainFormValue.status),
        media_id: media_id,
        brand_ids: this.$refs.brandsSelect.getSelectedBrandsIDs(),
        product_ids: this.$refs.brandsSelect.getSelectedProductsIDs()
      }
      this.$axios
          .$put(`${baseUrl}/${this.chain.id}`, chain)
          .then(() => {
            this.$toast.success('Successfully updated')
            this.$router.push('/chains')
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
          })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Update chain',
        parent: {title: 'Chains list'}
      })
    },
    showDeleteBranchModal(branch) {
      this.branchToDelete = branch.id
      this.$refs.deletebranchModal.show()
    },
    deleteBranch() {
      this.$toast.show('Deleting the branch...')
      this.$axios
          .$delete(`chain-module-api/branch/${this.branchToDelete}`)
          .then(() => {
            this.$toast.success('Successfully Deleted')
            this.$fetch()
          })
          .catch(() => {
            this.$toast.error('Error while deleting')
          })

      this.$refs.deletebranchModal.hide()
    },
    toggleStatus(branch) {
      this.$toast.show('Updating...')
      this.$axios
          .$get(`chain-module-api/branch/${branch.id}/toggle-activation`)
          .then((res) => {
            this.$toast.success('Successfully updated')
            branch.status = res.data.status
          })
          .catch((error) => {
            this.$toast.error(error.response?.data?.message)
          })
    }
  }
}
