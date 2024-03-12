export default {
  name: 'EditAdmin',
  async fetch() {
    const { data: admins } = await this.$axios.$get(
      'user-module-api/admins/' + this.$route.params.adminId
    )
    this.admins = admins
    this.adminsFormValue.name = admins.name
    this.adminsFormValue.email = admins.email
    this.adminsFormValue.phone = admins.phone
    this.adminsFormValue.title = admins.title
    this.adminsFormValue.status = Boolean(admins.status)
    this.adminsFormValue.selectedFile = [{ url: admins.media.path }]
    await this.fetchRoles()
    this.adminsFormValue.role_id = this.roleOptions.filter(
      ({ value }) => admins.role.id == value
    )
    await this.fetchRegions()
    this.adminsFormValue.region = this.regionOptions.filter(({ value }) =>
      admins.region_ids.includes(value)
    )
    await this.fetchCities()
    this.adminsFormValue.city = this.cityOptions.filter(({ value }) =>
      admins.city_ids.includes(value)
    )
    await this.fetchAreas()
    this.adminsFormValue.areas = this.areaOptions.filter(({ value }) =>
      admins.area_ids.includes(value)
    )
    await this.fetchBranches()
    this.adminsFormValue.branch = this.branchOptions.filter(({ value }) =>
      admins.branch_ids.includes(value)
    )
  },
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
      roles: [],
      areas: [],
      branches: [],
      validation: {}
    }
  },
  computed: {
    roleOptions() {
      return this.roles.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
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
    // this.fetchRoles()
  },
  methods: {
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
        const cityIds = this.cities.map((city) => city.id)
        this.adminsFormValue.city = this.adminsFormValue.city.filter((city) =>
          cityIds.includes(city.value)
        )
      } catch (e) {
        this.$toast.error('Error fetching cities')
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
        this.adminsFormValue.areas = this.adminsFormValue.areas.filter((area) =>
          areaIds.includes(area.value)
        )
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    async fetchBranches() {
      try {
        const areaIds = this.adminsFormValue.areas
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
        title: `Edit admins`,
        parent: { title: 'adminss list' }
      })
    },
    updateAdmin() {
      const admins = {
        media_id: this.adminsFormValue?.selectedFile?.results?.[0]?.data?.id,
        name: this.adminsFormValue.name,
        email: this.adminsFormValue.email,
        phone: this.adminsFormValue.phone,
        title: this.adminsFormValue.title,
        role_id: this.adminsFormValue.role_id[0].value,
        status: Boolean(this.adminsFormValue.status),
        branch_ids: this.adminsFormValue.branch.map(({ value }) => value),
        areas_ids: this.adminsFormValue.areas?.map((value) => value.value)
      }
      this.$toast.show('Updating the admins...')
      this.$axios
        .$put(`user-module-api/admins/${this.$route.params.adminId}`, admins)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/admins')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    }
  }
}
