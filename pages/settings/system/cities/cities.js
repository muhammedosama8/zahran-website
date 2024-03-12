import cityFormSchema from '~/data/forms/system/addCity'
export default {
  name: 'CitiesPage',
  async fetch() {
    try {
      const { data: cities } = await this.$axios.$get(
        'setting-module-api/city',
        {
          params: this.queryUrlParams()
        }
      )
      this.cities = cities.data
      this.totalCount = cities.meta.total
    } catch (e) {
      this.$toast.error('Error fetching cities')
    }
  },
  data() {
    return {
      addCityFormValues: {},
      updateCityFormValues: {
        region_id : null,
        city_ar: '',
        city_en: ''
      },
      cityFormSchema,
      cityToDelete: null,
      cities: [],
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
          label: 'City Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'City Name (AR)',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'region.name.en',
          label: 'Region',
          sortable: true
      },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  computed: {
    addCityFormOptions() {
        if (!this.regions.length) return []
        return this.regions.map(({ id, name }) => ({
            value: id,
            label: name.en
        }))
    }
  },
  watch: {
    cities: 'setBreadcrumb',
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
  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.fetchRegions()
    })
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
        title: `Cities list (${this.cities.length})`,
        parent: { title: 'System settings' }
      })
    },
    showUpdateModal(city) {
      this.updateCityFormValues.id = city.id
      this.updateCityFormValues.city_ar = city.name.ar
      this.updateCityFormValues.city_en = city.name.en
      this.updateCityFormValues.region = {
          value: city?.region?.id,
          label: city?.region?.name?.en
        }
      this.$refs.updateCityModal.show()
    },
    showDeleteModal(city) {
      this.cityToDelete = city.id
      this.$refs.deleteCityModal.show()
    },
    fetchRegions() {
      if (this.regions.length) return
      this.$axios
          .$get('setting-module-api/region')
          .then(({ data }) => {
              for (const region of data.data) {
                  this.regions.push(region)
              }
          })
          .catch(() => {
              this.$toast.error('Error while fetching regions')
          })
    },
    addCity() {
      const data = {
        region_id: this.addCityFormValues.region.value,
        name: {
          ar: this.addCityFormValues.city_ar,
          en: this.addCityFormValues.city_en
        }
      }
      this.$toast.show('Creating the city...')
      this.$axios
        .$post('setting-module-api/city', data)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$fetch()
          this.addCityFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.createCityModal.hide()
    },
    updateCity() {
      const data = {
        region_id: this.updateCityFormValues.region.value,
        name: {
          ar: this.updateCityFormValues.city_ar,
          en: this.updateCityFormValues.city_en
        }
      }

      this.$toast.show('Updating the city...')
      this.$axios
        .$put(`setting-module-api/city/${this.updateCityFormValues.id}`, data)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$fetch()
          this.updateCityFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.updateCityModal.hide()
    },
    deleteCity() {
      this.$toast.show('Deleting the city...')
      this.$axios
        .$delete(`setting-module-api/city/${this.cityToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.cityToDelete = null
      this.$refs.deleteCityModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
