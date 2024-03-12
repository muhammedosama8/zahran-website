import { ADMIN_ROLE_ID } from '~/data/values'

export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get('setting-module-api/role', {
        params: this.queryUrlParams()
      })
      this.roles = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      totalCount: 0,
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null
      },
      searchKeyword: '',
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Role Name',
          sortable: true
        },
        {
          key: 'users_count',
          label: 'No. of Users Assigned',
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

      /* For filters */
      roles: [],
      statusOptions: [
        { value: null, text: 'Status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      roleToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.roles.length
    }
  },
  watch: {
    roles: 'setBreadcrumb',
    filtering: {
      handler: 'getZahranData',
      deep: true
    }
  },
  activated() {
    this.setBreadcrumb()
    this.$fetch()
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
      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      return params
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Users Roles`
      })
    },
    showDeleteModal(role) {
      this.roleToDelete = role.id
      this.$refs.deleteRoleModal.show()
    },
    deleteRole() {
      this.$toast.show('Deleting the Role...')

      this.$axios
        .$delete(`setting-module-api/role/${this.roleToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.deleteRoleModal.hide()
    },
    toggleStatus(role) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`setting-module-api/role/${role.id}/toggle-activation`)
        .then((res) => {
          this.$toast.success('Successfully updated')
          role.status = res.data.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    },
    hasPrivilege(role) {
      const isLoggedUserSuperAdmin =
        this.$auth.user.data.role_id == ADMIN_ROLE_ID
      if (isLoggedUserSuperAdmin) {
        return true
      }
      if (!isLoggedUserSuperAdmin && role.id != ADMIN_ROLE_ID) {
        return true
      }
    }
  }
}
