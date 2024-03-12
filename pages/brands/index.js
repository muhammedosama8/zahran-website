const brandBaseUrl = 'brand-module-api/brand'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(brandBaseUrl, {
        params: this.queryUrlParams()
      })
      this.brands = data.data
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
        group : null

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
          label: 'ID'
        },
        {
          key: 'name.en',
          label: 'Brand Name'
        },
        {
          key: 'products_count',
          label: 'No. of products'
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      brands: [],
      groups: [],
      brandToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.brands.length
    },
    groupOptions() {
      return [
        // { value: null, label: 'Any group' },
        ...this.groups.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    }
  },
  watch: {
    brands: 'setBreadcrumb',
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
    this.fetchGroups()
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
      if (this.filtering.group) {
        const groupIds = this.filtering.group
          .map(({ value }) => value)
          .join(',')
        if (groupIds) params.group_ids = groupIds
      }
      return params
    },
    async fetchGroups() {
      try {
        const { data: groups } = await this.$axios.$get(
          'common-module-api/dropdown/group'
        )
        this.groups = groups
      } catch (e) {
        this.$toast.error('Error fetching groups')
      }
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Brands list (${this.totalCount})`
      })
    },
    showDeleteModal(brand) {
      this.brandToDelete = brand.id
      this.$refs.deleteBrandModal.show()
    },
    deleteBrand() {
      this.$toast.show('Deleting the brand...')

      this.$axios
        .$delete(`${brandBaseUrl}/${this.brandToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteBrandModal.hide()
    },
    toggleStatus(brand) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${brandBaseUrl}/${brand.id}/toggle-activation`)
        .then(() => {
          this.$toast.success('Successfully updated')
          brand.status = !brand.status
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
        .$post(`brand-module-api/brands/data/import`, formData, {
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
