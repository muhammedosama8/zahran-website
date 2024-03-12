export default {
  async fetch() {
    try {
      const { data: tasks } = await this.$axios.$get(
        '/chain-module-api/tasks',
        {
          params: this.queryUrlParams()
        }
      )
      this.tasks = tasks.data
      this.totalCount = tasks.meta.total
    } catch (e) {
      this.$toast.error('Error fetching tasks')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      statusOptions: [
        { value: null, text: 'Any status' },
        { value: 1, text: 'Active' },
        { value: 0, text: 'Deactive' }
      ],
      tasks: [],
      fields: [
        {
          key: 'title.en',
          label: 'Task Title',
          sortable: true
        },
        {
          key: 'task.name.en',
          label: 'Task Type',
          sortable: true
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'recurrence_rate',
          label: 'Recurrence rate',
          sortable: true
        },
        {
          key: 'total_branches',
          label: 'No. Of Branches',
          sortable: true
        },
        {
          key: 'total_brands',
          label: 'No. Of Brands',
          sortable: true
        },
        {
          key: 'total_products',
          label: 'No. Products',
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
      taskToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.tasks.length
    }
  },
  watch: {
    tasks: 'setBreadcrumb',
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
      if (this.searchKeyword) params.keyword = this.searchKeyword
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      return params
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Tasks List (${this.totalCount})`
      })
    },
    /* Delete */
    showDeleteModal(task) {
      this.taskToDelete = task.id
      this.$refs.deleteTaskModal.show()
    },
    deleteTask() {
      this.$toast.show('Deleting the task...')

      this.$axios
        .$delete(`/chain-module-api/tasks/${this.taskToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteTaskModal.hide()
    },
    /* Active/Deactivate */
    toggleStatus(task) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`/chain-module-api/tasks/${task.id}/toggle-activation`)
        .then((res) => {
          this.$toast.success('Successfully updated')
          task.status = res.data.status
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
