export default {
  name: 'SalaryShow',
  async fetch() {
    const { data: salary } = await this.$axios.$get(
      `user-module-api/salaries/${this.$route.params.salariesId}`
    )
    this.salary = salary
    this.earnings = salary.details.earnings
    this.desiccations = salary.details.desiccation
    this.date = salary.date
  },
  data() {
    return {
      salary: {},
      earnings:[],
      desiccations:[],
      date:''
    }
  },
  updated() {
    this.setBreadcrumb()
  },
  methods: {
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: this.date,
        parent: { title: 'Salary Slip' }
      })
    },
    
    
  }
}
