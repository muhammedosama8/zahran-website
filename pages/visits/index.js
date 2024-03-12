const baseUrl = 'chain-module-api/visit'
export default {
  name: 'VisitList',
  async fetch() {
    try {
      const { data: visits } = await this.$axios.$get(baseUrl, {
        params: this.queryUrlParams()
      })
      this.visits = visits.data
      this.totalCount = visits.meta.total
    } catch (e) {
      this.$toast.error('Error fetching visits')
    }
  },
  data() {
    return {
      filtering: {
        currentPage: 1,
        perPage: 100,
        selectedStatus: null,
        demos: [],
        chains: [],
        branches: [],
        areas: [],
        from: null,
        to: null
      },
      searchKeyword: '',
      totalCount: 0,
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'demo.name',
          label: 'Demo Name (EN)',
          sortable: true
        },
        {
          key: 'branch.name',
          label: 'Branch Name (EN)',
          sortable: true
        },
        {
          key: 'check_in.day',
          label: 'Day',
          sortable: true
        },
        {
          key: 'check_in.date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'check_in.time',
          label: 'Check in Time',
          sortable: true
        },
        {
          key: 'media.check_in.path',
          label: 'Check in Image',
          sortable: true
        },
        {
          key: 'check_out.time',
          label: 'Check Out Time',
          sortable: true
        },
        {
          key: 'media.check_out.path',
          label: 'Check Out Image',
          sortable: true
        },
        {
          key: 'hours',
          label: 'Hours',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        }
      ],
      visits: [],
      ChainToDelete: null,
      statusOptions: [
        { value: null, text: 'Filter by status' },
        { value: 'pending', text: 'Pending' },
        { value: 'completed', text: 'Completed' },
        { value: 'in-progress', text: 'In-Progress' }
        // { value: 'incomplete', text: 'InComplete' }
      ],
      demos: [],
      chains: [],
      branches: [],
      areas: []
    }
  },
  computed: {
    totalRows() {
      return this.visits.length
    },
    demoOptions() {
      return this.demos.map(({ name, id }) => ({ value: id, label: name.en }))
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
    visits: 'setBreadcrumb',
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
      if (this.filtering.hours) params.hours = this.filtering.hours
      if (this.filtering.demos.length)
        params.demo_ids = this.filtering.demos
          .map(({ value }) => value)
          .join(',')
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
      // if (this.filtering.selectedStatus !== null)
        // if (this.filtering.from) params.from_date = this.filtering.from
      if (this.filtering.from) params.from_date = this.filtering.from
      if (this.filtering.to) params.to_date = this.filtering.to
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
        title: `Visits list (${this.totalCount})`
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
            type === 'excel' ? 'visits.xlsx' : 'visits.pdf'
          )
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
