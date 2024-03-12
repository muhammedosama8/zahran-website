import taskTypeFormSchema from '~/data/forms/system/addTaskType'
export default {
  name: 'TaskTypesPage',
  async fetch() {
    try {
      const { data: taskTypes } = await this.$axios.$get(
        'setting-module-api/task-type',
        {
          params: this.queryUrlParams()
        }
      )
      this.taskTypes = taskTypes.data
      this.totalCount = taskTypes.meta.total
    } catch (e) {
      this.$toast.error('Error fetching task types')
    }
  },
  data() {
    return {
      addTaskTypeFormValues: {},
      updateTaskTypeFormValues: {
        taskType_ar: '',
        taskType_en: ''
      },
      taskTypeFormSchema,
      taskTypeToDelete: null,
      taskTypes: [],

      // tableData,
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
          label: 'TaskType Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'TaskType Name (AR)',
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
  computed: {
    rowsCount() {
      return this.taskTypes.length
    }
  },
  watch: {
    taskTypes: 'setBreadcrumb',
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
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Task types list (${this.taskTypes.length})`,
        parent: { title: 'System settings' }
      })
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
      return params
    },
    showUpdateModal(taskType) {
      this.updateTaskTypeFormValues.id = taskType.id
      this.updateTaskTypeFormValues.taskType_ar = taskType.name.ar
      this.updateTaskTypeFormValues.taskType_en = taskType.name.en
      this.$refs.updateTaskTypeModal.show()
    },
    showDeleteModal(taskType) {
      this.taskTypeToDelete = taskType.id
      this.$refs.deleteTaskTypeModal.show()
    },
    addTaskType() {
      const data = {
        name: {
          ar: this.addTaskTypeFormValues.taskType_ar,
          en: this.addTaskTypeFormValues.taskType_en
        }
      }

      this.$toast.show('Creating the taskType...')
      this.$axios
        .$post('setting-module-api/task-type', data)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$fetch()
          this.addTaskTypeFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.createTaskTypeModal.hide()
    },
    updateTaskType() {
      const data = {
        name: {
          ar: this.updateTaskTypeFormValues.taskType_ar,
          en: this.updateTaskTypeFormValues.taskType_en
        }
      }

      this.$toast.show('Updating the taskType...')
      this.$axios
        .$put(
          `setting-module-api/task-type/${this.updateTaskTypeFormValues.id}`,
          data
        )
        .then((res) => {
          this.$toast.success('Successfully updated')
          this.$fetch()
          this.updateTaskTypeFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.updateTaskTypeModal.hide()
    },
    deleteTaskType() {
      this.$toast.show('Deleting the taskType...')

      this.$axios
        .$delete(`setting-module-api/task-type/${this.taskTypeToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.taskTypeToDelete = null
      this.$refs.deleteTaskTypeModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
