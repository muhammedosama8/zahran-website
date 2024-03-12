import _ from 'lodash'

export default {
  name: 'EditDemo',
  async fetch() {
    const { data: demo } = await this.$axios.$get(
      'user-module-api/demo/' + this.$route.params.demoId
    )
    this.demo = demo
    this.demoFormValue.demo_en = demo.name.en
    this.demoFormValue.demo_ar = demo.name.ar
    this.demoFormValue.phone = demo.phone
    this.demoFormValue.sab_number = demo.sab_number
    this.demoFormValue.status = Boolean(demo.status)
    this.demoFormValue.selectedFile = [{ url: demo.media.path }]
    await this.fetchRegions()
    this.demoFormValue.region = this.regionOptions.filter(({ value }) =>
      demo.region_ids.includes(value)
    )
    await this.fetchCities()
    this.demoFormValue.city = this.cityOptions.filter(({ value }) =>
      demo.city_ids.includes(value)
    )
    await this.fetchAreas()
    this.demoFormValue.area = this.areaOptions.filter(({ value }) =>
      demo.area_ids.includes(value)
    )
    await this.fetchChains()
    this.demoFormValue.chains = this.chainsOptions.filter(({ value }) =>
      demo.chains_ids.includes(value)
    )
    await this.fetchBranches()
    this.demoFormValue.branch = this.branchOptions.filter(({ value }) =>
      demo.branch_ids.includes(value)
    )
  },
  data() {
    return {
      demoFormValue: {
        region: [],
        city: [],
        area: [],
        branch: [],
        chains: []

      },
      regions: [],
      cities: [],
      areas: [],
      chainsValue: [],
      branches: [],
      validation: {}
    }
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
      if (!this.chainsValue.length) return []
      return this.chainsValue.map(({ id, name }) => ({
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
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    this.fetchRegions()
    this.fetchChains()
  },
  methods: {
    async fetchRegions() {
      try {
        const { data: regions } = await this.$axios.$get(
          'common-module-api/dropdown/region'
        )
        this.regions = regions
      } catch (e) {
        this.$toast.error('Error fetching cities')
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
    async fetchChains() {
      await this.$axios
        .$get('/common-module-api/dropdown/chain')
        .then(({ data: chains }) => {
          this.chainsValue = chains
          
        })
        .catch(() => {
          this.$toast.error('Error while fetching chains')
        })
    },
    async fetchBranches() {
        const chainIds = _.map(this.demoFormValue.chains, 'value').join(',')
        await this.$axios.$get(`/common-module-api/dropdown/branch?chain_ids=${chainIds}`)
        .then(({ data: branches }) => {
          this.branches = branches
          const branchIds = this.branches.map((branch) => branch.id)
          this.demoFormValue.branch = this.demoFormValue.branch.filter((branch) =>
            branchIds.includes(branch.value)
          )
        })
        .catch(() => {
          this.$toast.error('Error while fetching branches')
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Edit demo`,
        parent: { title: 'Demos List' }
      })
    },
    updateDemo() {
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
      this.$toast.show('Updating the demo...')
      this.$axios
        .$put(`user-module-api/demo/${this.$route.params.demoId}`, demo)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/demos')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
