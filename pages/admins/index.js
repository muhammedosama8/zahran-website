const adminsBaseUrl = 'user-module-api/admins'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(adminsBaseUrl, {
        params: this.queryUrlParams()
      })
      this.admins = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      pageOptions: [100, 50, 25, 10],
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null,
        branch: [],
        area: [],
        role: []
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
          key: 'name',
          label: 'Admin Name',
          sortable: true
        },
        {
          key: 'title',
          label: 'Title',
          sortable: true
        },
        {
          key: 'role.name.en',
          label: 'Admin Role',
          sortable: true
        },
        {
          key: 'branches',
          label: 'Branches',
          sortable: true
        },
        {
          key: 'areas',
          label: 'Areas',
          sortable: true
        },
        {
          key: 'email',
          label: 'Email',
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
      admins: [],
      branches: [],
      areas: [],
      roles: [],
      adminsToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.admins.length
    },
    branchOptions() {
      return [
        { value: null, label: 'Any branch' },
        ...this.branches.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    areaOptions() {
      return [
        { value: null, label: 'Any Area' },
        ...this.areas.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    roleOptions() {
      return [
        { value: null, label: 'Any Role' },
        ...this.roles.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    admins: 'setBreadcrumb',
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
    this.fetchBranches()
    this.fetchAreas()
    this.fetchRoles()
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
      if (this.filtering.branch.length) {
        params.branch_ids = this.filtering.branch
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.area.length) {
        params.area_ids = this.filtering.area
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.role.length) {
        params.role_ids = this.filtering.role
          .map(({ value }) => value)
          .join(',')
      }
      return params
    },
    async fetchBranches() {
      try {
        const { data: branches } = await this.$axios.$get(
          'common-module-api/dropdown/branch'
        )
        this.branches = branches
      } catch (e) {
        this.$toast.error('Error fetching branches')
      }
    },
    async fetchAreas() {
      try {
        const { data: areas } = await this.$axios.$get(
          'common-module-api/dropdown/area'
        )
        this.areas = areas
      } catch (e) {
        this.$toast.error('Error fetching areas')
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
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Admins list (${this.totalCount})`
      })
    },
    showDeleteModal(admins) {
      this.adminsToDelete = admins.id
      this.$refs.deleteAdminModal.show()
    },
    deleteAdmin() {
      this.$toast.show('Deleting the admins...')
      this.$axios
        .$delete(`${adminsBaseUrl}/${this.adminsToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })

      this.$refs.deleteAdminModal.hide()
    },
    toggleStatus(admins) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${adminsBaseUrl}/${admins.id}/activate-deactivate`)
        .then(() => {
          this.$toast.success('Successfully updated')
          admins.status = !admins.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
