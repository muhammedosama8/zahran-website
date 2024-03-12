const baseUrl = 'chain-module-api/visit'
export default {
  name: 'ReportList',
  async fetch() {
    try {
      const { data: reports } = await this.$axios.$get(baseUrl, {
        params: this.queryUrlParams()
      })
      this.reports = reports.data
      this.totalCount = reports.meta.total
    } catch (e) {
      this.$toast.error('Error fetching reports')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        searchTerm: null,
        selectedStatus: null,
        demos:[],
        chains: [],
        branches: [],
        areas: []
      },
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'check_in.time',
          label: 'Time',
          sortable: true
        },
        {
          key: 'demo.name',
          label: 'Demo',
          sortable: true
        },
        {
          key: 'product.name',
          label: 'Products',
          sortable: true
        },
        {
          key: 'hours',
          label: 'Items',
          sortable: true
        },
        {
          key: 'area.name',
          label: 'Total Price',
          sortable: true
        },
        {
          key: 'branch.name',
          label: 'Branch',
          sortable: true
        },
        {
          key: 'check_in.day',
          label: 'Reason',
          sortable: true
        },
        {
          key: 'comment',
          label: 'Comment',
          sortable: true
        },
        {
          key: 'media',
          label: 'Media',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      reports: [],
      ChainToDelete: null,
      statusOptions: [
        { value: null, text: 'Filter by status' },
        { value: 'pending', text: 'Pending' },
        { value: 'completed', text: 'Completed' },
        { value: 'incomplete', text: 'InComplete' }
      ],
      demos: [],
      chains:[],
      branches: [],
      areas: []
    }
  },
  computed: {
    totalRows() {
      return this.reports.length
    },
    demoOptions() {
      return this.demos.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    chainOptions() {
      return this.chains.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    branchOptions() {
      return this.branches.map(({ name, id }) => ({ value: id, label: name.en }))
    },
    areaOptions() {
        return this.areas.map(({ name, id }) => ({ value: id, label: name.en }))
    }
  },
  watch: {
    reports: 'setBreadcrumb',
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
  mounted() {
    this.fetchDemos()
    this.fetchChains()
    this.fetchBranches()
    this.fetchAreas()
  },
  methods: {
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
      if (this.filtering.hours) params.hours = this.filtering.hours
      if (this.filtering.demos.length) params.demo_ids = this.filtering.demos.map(({ value }) => value).join(',')
      if (this.filtering.chains.length) params.chain_ids = this.filtering.chains.map(({ value }) => value).join(',')
      if (this.filtering.branches.length) params.branch_ids = this.filtering.branches.map(({ value }) => value).join(',')
      if (this.filtering.areas.length) params.area_ids = this.filtering.areas.map(({ value }) => value).join(',')
      if (this.filtering.selectedStatus !== null)
        params.status = this.filtering.selectedStatus
      return params
    },
    async fetchDemos() {
      try {
        const { data: demos } = await this.$axios.$get(
          'common-module-api/dropdown/demo'
        )
        this.demos = demos
      } catch (e) {
        this.$toast.error('Error fetching demos')
      }
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
        title: `New Report (${this.reports.length})`
      })
    },
    exportFile(type) {
      this.$axios
          .$get(`${baseUrl}`, {
            params: {
              ...this.queryUrlParams(),
              'export_type' : type
            },
            responseType: 'blob'
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', type === 'excel' ? 'reports.xlsx' : 'reports.pdf')
            document.body.appendChild(link)
            link.click()
            this.$toast.success('Excel Successfully Exported')
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
