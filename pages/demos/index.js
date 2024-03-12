const baseUrl = 'user-module-api/demo'

export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(baseUrl, {
        params: this.queryUrlParams()
      })
      this.demos = data.data
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
        chains: [],
        branches: [],
        areas: []
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
          label: 'Demo Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Demo Name (AR)',
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
          key: 'sab_number',
          label: 'Sab Number',
          sortable: true
        },
        // {
        //   key: 'target',
        //   label: 'Target',
        //   sortable: true
        // },
        // {
        //   key: 'achievement',
        //   label: 'Achievement',
        //   sortable: true
        // },
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
      demos: [],
      chains: [],
      branches: [],
      areas: [],
      demoToDelete: null,
      demoTarget: {
        demo_id: null,
        target: 0,
        date: null
      }
    }
  },
  computed: {
    totalRows() {
      return this.demos.length
    },
    chainOptions() {
      return this.chains.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    branchOptions() {
      return this.branches.map(({ name, id }) => ({
        value: id,
        label: name.en
      }))
    },
    areaOptions() {
      return this.areas.map(({ name, id }) => ({ value: id, label: name.en }))
    }
  },
  watch: {
    demos: 'setBreadcrumb',
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
    this.fetchChains()
    this.fetchBranches()
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
      if (this.filtering.chains.length)
        params.chain_ids = this.filtering.chains
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.branches.length)
        params.branch_ids = this.filtering.branches
          .map(({ value }) => value)
          .join(',')
      if (this.filtering.areas.length)
        params.area_ids = this.filtering.areas
          .map(({ value }) => value)
          .join(',')
      return params
    },
    async fetchChains() {
      try {
        const { data: chains } = await this.$axios.$get(
          'common-module-api/dropdown/chain'
        )
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching chains')
      }
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
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Demos List (${this.totalCount})`
      })
    },
    showDeleteModal(demo) {
      this.demoToDelete = demo.id
      this.$refs.deleteDemoModal.show()
    },
    checkTarget() {
      const data = {
        demo_id: this.demoTarget.demo_id,
        date: this.demoTarget.date
      }
      this.$axios
        .$post(`${baseUrl}/target/check`, data)
        .then((res) => {
          this.demoTarget.target = res.data.target
        })
        .catch(() => {
          this.demoTarget.target = 0
        })
    },
    addTarget() {
      const data = {
        demo_id: this.demoTarget.demo_id,
        target: this.demoTarget.target,
        date: this.demoTarget.date
      }

      this.$toast.show('Adding Target to Demo...')
      this.$axios
        .$post(`${baseUrl}/target/add`, data)
        .then(() => {
          this.$toast.success('Successfully Added')
          this.demoTarget.demo_id = ''
          this.demoTarget.target = ''
          this.demoTarget.date = ''
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })

      this.$refs.targetModal.hide()
      this.$fetch()
    },
    showTargetModal(demo) {
      this.demoTarget.demo_id = demo.id
      this.$refs.targetModal.show()
    },
    deleteDemo() {
      this.$toast.show('Deleting the demo...')
      this.$axios
        .$delete(`${baseUrl}/${this.demoToDelete}`)
        .then(() => {
          this.$toast.success('Successfully Deleted')
          this.$fetch()
        })
        .catch(() => {
          this.$toast.error('Error while deleting')
        })

      this.$refs.deleteDemoModal.hide()
    },
    toggleStatus(demo) {
      this.$toast.show('Updating...')
      this.$axios
        .$get(`${baseUrl}/${demo.id}/toggle-activation`)
        .then(() => {
          this.$toast.success('Successfully updated')
          demo.status = !demo.status
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.message)
        })
    },
    exportFile(type) {
      this.$axios
        .$get(`${baseUrl}`, {
          params: {
            ...this.queryUrlParams(),
            export_type: type
          },
          responseType: 'blob'
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            type === 'excel' ? 'demos.xlsx' : 'demos.pdf'
          )
          document.body.appendChild(link)
          link.click()
          this.$toast.success('Excel Successfully Exported')
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
        .$post(`${baseUrl}/data/import`, formData, {
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
