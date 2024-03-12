import regionFormSchema from '~/data/forms/system/addRegion'
export default {
  name: 'regionsPage',
  async fetch() {
    try {
      const { data: regions } = await this.$axios.$get(
        'setting-module-api/region',
        {
          params: this.queryUrlParams()
        }
      )
      this.regions = regions.data
      this.totalCount = regions.meta.total
    } catch (e) {
      this.$toast.error('Error fetching regions')
    }
  },
  data() {
    return {
      addRegionFormValues: {},
      updateRegionFormValues: {
        region_ar: '',
        region_en: ''
      },
      regionFormSchema,
      regionToDelete: null,
      regions: [],
      filtering: {
        currentPage: 1,
        perPage: 100,
        searchTerm: null
      },
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'name.en',
          label: 'Region Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Region Name (AR)',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  watch: {
    regions: 'setBreadcrumb',
    filtering: {
      handler: 'getZahranData',
      deep: true
    }
  },
  activated() {
    this.$fetch()
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    getZahranData() {
      setTimeout(() => {
        this.$fetch()
      }, 1000)
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
      return params
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `regions list (${this.regions.length})`,
        parent: { title: 'System settings' }
      })
    },
    showUpdateModal(region) {
      this.updateRegionFormValues.id = region.id
      this.updateRegionFormValues.region_ar = region.name.ar
      this.updateRegionFormValues.region_en = region.name.en
      this.$refs.updateRegionModal.show()
    },
    showDeleteModal(region) {
      this.regionToDelete = region.id
      this.$refs.deleteRegionModal.show()
    },
    addRegion() {
      const data = {
        name: {
          ar: this.addRegionFormValues.region_ar,
          en: this.addRegionFormValues.region_en
        }
      }
      this.$toast.show('Creating the region...')
      this.$axios
        .$post('setting-module-api/region', data)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$fetch()
          this.addRegionFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.createRegionModal.hide()
    },
    updateRegion() {
      const data = {
        name: {
          ar: this.updateRegionFormValues.region_ar,
          en: this.updateRegionFormValues.region_en
        }
      }

      this.$toast.show('Updating the region...')
      this.$axios
        .$put(
          `setting-module-api/region/${this.updateRegionFormValues.id}`,
          data
        )
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$fetch()
          this.updateRegionFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.updateRegionModal.hide()
    },
    deleteRegion() {
      this.$toast.show('Deleting the region...')
      this.$axios
        .$delete(`setting-module-api/region/${this.regionToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.regionToDelete = null
      this.$refs.deleteRegionModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
