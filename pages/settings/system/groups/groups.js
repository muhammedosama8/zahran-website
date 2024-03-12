import groupFormSchema from '~/data/forms/system/addGroup'

export default {
  name: 'CategoriesPage',
  async fetch() {
    try {
      const { data: groups } = await this.$axios.$get(
        'setting-module-api/group',
        {
          params: this.queryUrlParams()
        }
      )
      this.groups = groups.data
      this.totalCount = groups.meta.total
    } catch (e) {
      this.$toast.error('Error fetching groups')
    }
  },
  data() {
    return {
      parentCategories: [],
      addGroupFormValues: {},
      updateGroupFormValues: {
        parent: null,
        group_ar: '',
        group_en: ''
      },
      groupFormSchema,
      groupToDelete: null,
      groups: [],
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
          label: 'Category Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Category Name (AR)',
          sortable: true
        },
        {
          key: 'parent.name.en',
          label: 'Parent',
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
  mounted() {
    this.fetchParentCategories()
  },
  computed: {
    parentCategoriesOptions() {
      return this.parentCategories.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    }
  },
  watch: {
    groups: 'setBreadcrumb',
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
      if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
      return params
    },
    async fetchParentCategories() {
      try {
        const { data: regions } = await this.$axios.$get(
          'common-module-api/dropdown/group-parent'
        )
        this.parentCategories = regions
      } catch (e) {
        this.$toast.error('Error fetching categories parents')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Categories list (${this.groups.length})`,
        parent: { title: 'System settings' }
      })
    },
    async showUpdateModal(group) {
      await this.fetchParentCategories()
      this.updateGroupFormValues.id = group.id
      this.updateGroupFormValues.group_ar = group.name.ar
      this.updateGroupFormValues.group_en = group.name.en
      this.updateGroupFormValues.parent = {
        value: group.parent.id,
        label: group.parent?.name?.en
      }
      this.$refs.updateGroupModal.show()
    },
    showDeleteModal(group) {
      this.groupToDelete = group.id
      this.$refs.deleteGroupModal.show()
    },
    async addGroup() {
      const data = {
        parent_id: this.addGroupFormValues?.parent?.value,
        name: {
          ar: this.addGroupFormValues.group_ar,
          en: this.addGroupFormValues.group_en
        }
      }
      this.$toast.show('Creating the group...')
      this.$axios
        .$post('setting-module-api/group', data)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$fetch()
          this.addGroupFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      await this.fetchParentCategories()
      this.$refs.createGroupModal.hide()
    },
    updateGroup() {
      const data = {
        parent_id: this.updateGroupFormValues?.parent?.value,
        name: {
          ar: this.updateGroupFormValues.group_ar,
          en: this.updateGroupFormValues.group_en
        }
      }

      this.$toast.show('Updating the group...')
      this.$axios
        .$put(`setting-module-api/group/${this.updateGroupFormValues.id}`, data)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$fetch()
          this.updateGroupFormValues = {}
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.updateGroupModal.hide()
    },
    async deleteGroup() {
      this.$toast.show('Deleting the group...')
      this.$axios
        .$delete(`setting-module-api/group/${this.groupToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.groupToDelete = null
      await this.fetchParentCategories()
      this.$refs.deleteGroupModal.hide()
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
