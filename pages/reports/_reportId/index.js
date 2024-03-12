export default {
  name: 'ReportList',
  async fetch() {
    try {
      const { data: report } = await this.$axios.$get(`chain-module-api/reports/${this.$route.params.reportId}`, {
        params: this.queryUrlParams()
      })
      this.report = report
      this.demo = report.demo
      this.branch = report.branch
      this.products = report.products
    } catch (e) {
      this.$toast.error('Error fetching report')
    }
  },
  data() {
    return {
      
      pageOptions: [100, 50, 25, 10],
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Name (AR)',
          sortable: true
        }
      ],
      productfields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Name (AR)',
          sortable: true
        },
        {
          key: 'quantity',
          label: 'Quantity',
          sortable: true
        }
      ],
      fullfields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Name (AR)',
          sortable: true
        },
        {
          key: 'quantity',
          label: 'Quantity',
          sortable: true
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true
        }
      ],
      returnfields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name.en',
          label: 'Name (EN)',
          sortable: true
        },
        {
          key: 'name.ar',
          label: 'Name (AR)',
          sortable: true
        },
        {
          key: 'reason',
          label: 'Reason',
          sortable: true
        }
      ],
      report: {},
      demo: {
        id:'',
        name:{
          en:''
        }
      },
      branch: {
        id:'',
        name:{
          en:''
        }
      },
      products:[]
    }
  },
  computed: {
    totalRows() {
      return 1
    }
  },
  watch: {
    report: 'setBreadcrumb',
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
  },
  methods: {
    queryUrlParams() {
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Report Details`
      })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
