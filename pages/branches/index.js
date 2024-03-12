const branchBaseUrl = 'chain-module-api/branch'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(branchBaseUrl, {
        params: this.queryUrlParams()
      })
      this.branches = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      pageOptions: [100, 50, 25, 10],
      filtering: {
        currentPage: 1,
        perPage: 100,
        cityId: null,
        areaId: null,
        selectedStatus: null
      },
      searchKeyword: '',
      totalCount: 0,
      statusOptions: [
        { value: null, text: 'Filter by status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Branch English Name',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Branch Arabic Name',
          sortable: true
        },
        {
          key: 'chain_name',
          label: 'Chain Name',
          sortable: true
        },
        {
          key: 'brands_count',
          label: 'Brands Number',
          sortable: true
        },
        {
          key: 'area.city.name.en',
          label: 'City',
          sortable: true
        },
        {
          key: 'area.name.en',
          label: 'Area',
          sortable: true
        },
        {
          key: 'target',
          label: 'Target',
          sortable: true
        },
        {
          key: 'achievement',
          label: 'Achievement',
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
      branches: [],
      areas: [],
      cities: [],
      branchToDelete: null,
      branchTarget: {
        branch_id: null,
        target: 0,
        date: null
      }
    }
  },
  computed: {
    totalRows() {
      return this.branches.length
    },
    citiesOptions() {
      return [
        // { value: null, label: 'Any city' },
        ...this.cities.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    areaOptions() {
      return [
        // { value: null, label: 'Any Area' },
        ...this.areas.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    branches: 'setBreadcrumb',
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
    this.fetchCities()
    this.fetchAreas()
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
      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      if (this.filtering.areaId) {
        const areaIds = this.filtering.areaId
          .map(({ value }) => value)
          .join(',')
        if (areaIds) params.area_ids = areaIds
      }
      if (this.filtering.cityId) {
        const cityIds = this.filtering.cityId
          .map(({ value }) => value)
          .join(',')
        if (cityIds) params.city_ids = cityIds
      }
      return params
    },
    async fetchCities() {
      try {
        const { data: cities } = await this.$axios.$get(
          'common-module-api/dropdown/city'
        )
        this.cities = cities
      } catch (e) {
        this.$toast.error('Error fetching areas')
      }
    },
    fetchAreas(cityId) {
      // if (!cityId && !cityId.length) throw new Error('No city selected')
      const params = cityId?.map((city) => city.value).join(',')
      let endPoint
      if (params)
        endPoint = `common-module-api/dropdown/area?city_ids=${params}`
      else endPoint = `common-module-api/dropdown/area?city_id=`
      this.$axios
        .$get(endPoint)
        .then(({ data }) => {
          this.areas = data
        })
        .catch(() => {
          this.$toast.error('Error while fetching territory')
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Branches list (${this.totalCount})`
      })
    },
    showDeleteModal(branch) {
      this.branchToDelete = branch.id
      this.$refs.deleteBranchModal.show()
    },
    checkTarget() {
      const data = {
        branch_id: this.branchTarget.branch_id,
        date: this.branchTarget.date
      }
      this.$axios
        .$post(`${branchBaseUrl}/target/check`, data)
        .then((res) => {
          this.branchTarget.target = res.data.target
        })
        .catch(() => {
          this.branchTarget.target = 0
        })
    },
    addTarget() {
      const data = {
        branch_id: this.branchTarget.branch_id,
        target: this.branchTarget.target,
        date: this.branchTarget.date
      }

      this.$toast.show('Adding Target to Demo...')
      this.$axios
        .$post(`${branchBaseUrl}/target/add`, data)
        .then(() => {
          this.$toast.success('Successfully Added')
          this.branchTarget.branch_id = ''
          this.branchTarget.target = ''
          this.branchTarget.date = ''
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.targetModal.hide()
      this.$fetch()
    },
    showTargetModal(branch) {
      this.branchTarget.branch_id = branch.id
      this.$refs.targetModal.show()
    },
    deleteBranch() {
      this.$toast.show('Deleting the branch...')

      this.$axios
        .$delete(`${branchBaseUrl}/${this.branchToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteBranchModal.hide()
    },
    toggleStatus(branch) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${branchBaseUrl}/${branch.id}/toggle-activation`)
        .then(() => {
          this.$toast.success('Successfully updated')
          branch.status = !branch.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    handleFileUpload() {
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      this.$toast.show('Importing Excel...')
      this.$axios
        .$post(`chain-module-api/branch/data/import`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.$toast.success('Successfully Imported')
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
