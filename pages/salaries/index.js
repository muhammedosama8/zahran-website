const salaryBaseUrl = 'user-module-api/salaries'
export default {
  async fetch() {
    try {
      const { data } = await this.$axios.$get(salaryBaseUrl, {
        params: this.queryUrlParams()
      })
      this.salaries = data.data
      this.totalCount = data.meta.total
    } catch (e) {}
  },
  data() {
    return {
      pageOptions: [100, 50, 25, 10],
      totalCount:0,
      filtering: {
        currentPage: 1,
        perPage: 100,
        demos: [],
        netSalary:'',
        dateFrom:'',
        dateTo:'',
        departments: []
      },
      searchKeyword:'',
      fields: [
        {
          key: 'sab_number',
          label: 'SAB Number',
          sortable: true
        },
        {
          key: 'payment_type',
          label: 'Payment Type',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'eraning',
          label: 'Eraning',
          sortable: true
        },
        {
          key: 'desiccation',
          label: 'Desiccation',
          class: 'inputPricing',
          sortable: true
        },
        {
          key: 'net_salary',
          label: 'NET Salary',
          class: 'inputPricing',
          sortable: true
        },
        {
          key: 'department',
          label: 'Department',
          class: 'inputPricing',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      salaries: [],
      demos: [],
      netsalaries:[],
      departments: []
    }
  },
  computed: {
    totalRows() {
      return this.salaries.length
    },
    demoOptions() {
      return this.demos.map(({ sabNumber, id }) => ({ value: id, label: sabNumber }))
    },
    departmentOptions() {
      return this.departments.map(({ name,id }) => ({ value: id, label: name }))
    },
    salaryOptions() {
      this.netsalaries = [
        {'id':'','name':'All salaries'},
        {'id':'1000,2000','name':'1000 - 2000'},
        {'id':'2000,3000','name':'2000 - 3000'},
        {'id':'3000,4000','name':'3000 - 4000'},
        {'id':'4000,5000','name':'4000 - 5000'},
        {'id':'5000,6000','name':'5000 - 6000'},
        {'id':'6000,7000','name':'6000 - 7000'},
        {'id':'7000,8000','name':'7000 - 8000'},
        {'id':'8000,9000','name':'8000 - 9000'},
        {'id':'9000,10000','name':'9000 - 10000'},
        {'id':'10000,11000','name':'10000 - 11000'},
        {'id':'11000,12000','name':'11000 - 12000'},
        {'id':'12000,13000','name':'12000 - 13000'},
        {'id':'13000,14000','name':'13000 - 14000'},
        {'id':'14000,15000','name':'14000 - 15000'},
        {'id':'15000,16000','name':'15000 - 16000'},
        {'id':'16000,17000','name':'16000 - 17000'},
        {'id':'17000,18000','name':'17000 - 18000'},
        {'id':'18000,19000','name':'18000 - 19000'},
        {'id':'19000,20000','name':'19000 - 20000'},
        {'id':'20000,21000','name':'20000 - 21000'}
      ]
      return this.netsalaries.map(({ name,id }) => ({ value: id, label: name }))
    }
  },
  watch: {
    salaries: 'setBreadcrumb',
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
    this.fetchDepartment()
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
      if (this.filtering.dateFrom) params.dateFrom = this.filtering.dateFrom
      if (this.filtering.dateTo) params.dateTo = this.filtering.dateTo
      if (this.filtering.netSalary) params.net_salary = this.filtering.netSalary.value
      if (this.filtering.demos.length) params.demo_ids = this.filtering.demos.map(({ value }) => value).join(',')
      if (this.filtering.departments.length) params.departments = this.filtering.departments.map(({ value }) => value).join(',')
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
    async fetchDepartment() {
      try {
        const { data: departments } = await this.$axios.$get(
          'common-module-api/dropdown/department'
        )
        this.departments = departments
      } catch (e) {
        this.$toast.error('Error fetching Departments')
      }
    },
    
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Salary Slip (${this.totalCount})`
      })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    },
    
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    handleFileUpload() {
      const formData = new FormData()
      formData.append('sheet', this.$refs.file.files[0])
      this.$toast.show('Importing Excel...')
      this.$axios
        .$post(`user-module-api/salary/import`, formData, {
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
    editPrice(e) {
      e.target.removeAttribute('readonly')
    },
  }
}
