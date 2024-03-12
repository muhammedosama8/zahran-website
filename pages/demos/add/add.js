import _ from 'lodash'

export default {
  name: 'AddNewDemo',
  data() {
    return {
      demoFormValue: {
        city: [],
        area: [],
        branch: [],
        chains: []
      },
      regions: [],
      cities: [],
      areas: [],
      branches: [],
      chains: [],
      chainsValue:[],
      validation: {}
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  computed: {
    regionOptions() {
      return this.regions.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    cityOptions() {
      return this.cities.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    areaOptions() {
      return this.areas.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    chainsOptions() {
      if (!this.chains.length) return []
      return this.chains.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    },
    branchOptions() {
      return this.branches.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  methods: {
    async fetchRegions() {
      try {
        const { data: regions } = await this.$axios.$get(
          'common-module-api/dropdown/region'
        )
        this.regions = regions
      } catch (e) {
        this.$toast.error('Error fetching regions')
      }
    },
    async fetchCities() {
      try {
        const regionsIds = this.demoFormValue.region
          .map(({ value }) => value)
          .join(',')
        const { data: cities } = await this.$axios.$get(
          'common-module-api/dropdown/city',
          {
            params: {
              region_ids: regionsIds
            }
          }
        )
        this.cities = cities
      } catch (e) {
        this.$toast.error('Error fetching cities')
      }
    },
    async fetchAreas() {
      try {
        const cityIds = this.demoFormValue.city
          .map(({ value }) => value)
          .join(',')
        const { data: areas } = await this.$axios.$get(
          'common-module-api/dropdown/area',
          {
            params: {
              city_ids: cityIds
            }
          }
        )
        this.areas = areas
        const areaIds = this.areas.map((area) => area.id)
        this.demoFormValue.area = this.demoFormValue.area.filter((area) =>
          areaIds.includes(area.value)
        )
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    fetchChains() {
      this.$axios
        .$get('/common-module-api/dropdown/chain')
        .then(({ data: chains }) => {
          this.chains = chains
          
        })
        .catch(() => {
          this.$toast.error('Error while fetching chains')
        })
    },
    fetchBranches() {
      const chainIds = _.map(this.chainsValue, 'value').join(',')
      this.$axios
        .$get(`/common-module-api/dropdown/branch?chain_ids=${chainIds}`)
        .then(({ data: branches }) => {
          this.branches = branches
          if (this.chainsValue.length) {
            this.branchesValue =  this.branchesOptions 
          } else {
            this.branchesValue = []
          }
        })
        .catch(() => {
          this.$toast.error('Error while fetching branches')
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Add demo`,
        parent: { title: 'Demos List' }
      })
    },
    addNewDemo() {
      const demo = {
        media_id: this.demoFormValue?.selectedFile?.results?.[0]?.data?.id,
        name: {
          ar: this.demoFormValue.demo_ar,
          en: this.demoFormValue.demo_en
        },
        phone: this.demoFormValue.phone,
        sab_number: this.demoFormValue.sab_number,
        password: this.demoFormValue.password,
        status: Boolean(this.demoFormValue.status),
        branch_ids: this.demoFormValue.branch.map(({ value }) => value)
      }
      this.$toast.show('Creating the demo...')
      this.$axios
        .$post('user-module-api/demo', demo)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/demos')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  },
  mounted() {
    this.fetchRegions()
    this.fetchChains()

  }
}
