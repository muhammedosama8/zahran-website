export default {
  name: 'AddNewAdmin',
  data() {
    return {
      adminsFormValue: {
        region: [],
        city: [],
        areas: [],
        branch: []
      },
      regions: [],
      cities: [],
      areas: [],
      roles: [],
      branches: [],
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
    roleOptions() {
      return this.roles.map(({ name, id }) => ({
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
        const regionIds = this.adminsFormValue.region
          .map(({ value }) => value)
          .join(',')
        const { data: cities } = await this.$axios.$get(
          'common-module-api/dropdown/city',
          {
            params: {
              region_ids: regionIds
            }
          }
        )
        this.cities = cities
        const citiesIds = this.cities.map((city) => city.id)
        this.adminsFormValue.city = this.adminsFormValue.city.filter((city) =>
        citiesIds.includes(city.value)
        )
      } catch (e) {
        this.$toast.error('Error fetching cities')
      }
    },
    async fetchRoles() {
      try {
        const { data: roles } = await this.$axios.$get(
          'common-module-api/dropdown/role'
        )
        this.roles = roles
      } catch (e) {
        this.$toast.error('Error fetching roles')
      }
    },
    async fetchAreas() {
      try {
        const cityIds = this.adminsFormValue.city
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
        this.adminsFormValue.areas = areas.filter((area) =>
          areaIds.includes(area.id)
        )
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    async fetchBranches() {
      try {
        const areaIds = this.adminsFormValue.area
          .map(({ value }) => value)
          .join(',')
        const { data: branches } = await this.$axios.$get(
          'common-module-api/dropdown/branch',
          {
            params: {
              area_ids: areaIds
            }
          }
        )
        this.branches = branches
        const branchIds = this.branches.map((branch) => branch.id)
        this.adminsFormValue.branch = this.adminsFormValue.branch.filter(
          (branch) => branchIds.includes(branch.value)
        )
      } catch (e) {
        this.$toast.error('Error fetching branches')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Add admins`,
        parent: { title: 'adminss list' }
      })
    },
    addNewAdmin() {
      const admins = {
        media_id: this.adminsFormValue?.selectedFile?.results?.[0]?.data?.id,
        name: this.adminsFormValue.admins_name,
        email: this.adminsFormValue.email,
        phone: this.adminsFormValue.phone,
        title: this.adminsFormValue.title,
        status: Boolean(this.adminsFormValue.status),
        role_id: this.adminsFormValue.role_id?.value,
        branch_ids: this.adminsFormValue.branch?.map(({ value }) => value),
        areas_ids: this.adminsFormValue.areas?.map((value) => value.id)
      }
      this.$toast.show('Creating the admins...')
      this.$axios
        .$post('user-module-api/admins', admins)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/admins')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  },
  mounted() {
    this.fetchRegions()
    this.fetchRoles()
  }
}
