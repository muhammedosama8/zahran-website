import _ from 'lodash'
import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

export default {
  /* eslint-disable */
  name: 'AddNewTask',
  data() {
    return {
      /* Brand */
      addNewTaskFormValue: {},
      validation: {},
      branches: [],
      promotions: [],
      chains: [],
      taskTypes: [],
      taskTypeValue: null,
      promotionValue: null,
      branchesValue: [],
      chainsValue: [],
      selectedBranches: null,
      isDateFrom: false,
      isDateTo: false,
      isAllChainsSelected:false,
      isAllBranchesSelected:false,
      answerTypes: [
        { id: 'text', name: 'text' },
        { id: 'media', name: 'media' },
        { id: 'select', name: 'selection' },
        { id: 'number', name: 'numeric' },
        { id: 'date', name: 'date' }
      ],
      recurrenceRate: [
        { id: 'every_visit', name: 'Every visit' },
        { id: 'next_visit', name: 'Next visit' },
        { id: 'specific_date', name: 'Visit specific Date' },
        { id: 'date_range', name: 'Visit date range' }
      ],
      forceSelectBrands: {},
      questions: [],
      random: 0
    }
  },
  computed: {
    chainsOptions() {
      if (!this.chains.length) return []
      return this.chains.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    },
    branchesOptions() {
      if (!this.branches.length) return []
      return this.branches.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
    },

    taskTypeOptions() {
      if (!this.taskTypes.length) return []
      return [
        { value: null, label: 'Choose Task type', selected: true },
        ...this.taskTypes
          .map(({ id, name }) => ({
            value: id,
            label: name.en
          }))
      ]
    },
    recurrenceRateOptions() {
      if (!this.recurrenceRate.length) return []
      return this.recurrenceRate.map(({ id, name }) => ({
        value: id,
        label: name
      }))
    },
    answerTypesOptions() {
      if (!this.answerTypes.length) return []
      return this.answerTypes.map(({ id, name }) => ({
        value: id,
        label: name
      }))
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  deactivated() {
    Brand.deleteAll()
    Product.deleteAll()
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    if (process.environment === 'production') {
      window.onbeforeunload = () => 1
    }
    this.fetchChains()
    this.fetchBranches()
    this.fetchTaskTypes()
  },
  methods: {
    addTask() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      const recurrenceRate = {
        type: this.addNewTaskFormValue.recurrenceType
          ? this.addNewTaskFormValue.recurrenceType.value
          : null,
        from: this.addNewTaskFormValue.recurrenceFrom,
        to: this.addNewTaskFormValue.recurrenceTo
      }

      let taskImages = this.addNewTaskFormValue.taskImages || []
      if (Array.isArray(taskImages) && taskImages.length) {
        taskImages = taskImages
          .map(({ selectedFile }) =>
            selectedFile.results.map(({ data }) => data.id)
          )
          .flat()
      }

      this.$toast.show('Creating the task...')
      const task = {
        title: {
          en: this.addNewTaskFormValue.task_en,
          ar: this.addNewTaskFormValue.task_ar
        },
        description: {
          en: this.addNewTaskFormValue.task_description_en,
          ar: this.addNewTaskFormValue.task_description_ar
        },
        instructions: {
          en: this.addNewTaskFormValue.task_instructions_en,
          ar: this.addNewTaskFormValue.task_instructions_ar
        },
        status: Boolean(this.addNewTaskFormValue.status),
        questions: this.questions
          .filter(
            (question) =>
              question.answer_type != null &&
              question.question.en != '' 
              // && question.question.ar != ''
          )
          .map((question) => ({
            question: question.question,
            answer_type: question.answer_type
              ? question.answer_type.value
              : null,
            is_mandatory: question.is_mandatory,
            answers: question.answer_values.filter((answer) => answer != '')
          })),
        media: taskImages,
        branches: this.branchesValue.map(({ value }) => value),

        brands: this.$refs.brandsBranchSelect != null ? this.$refs.brandsBranchSelect.getSelectedBrandsIDs() : [],
        products: this.$refs.brandsBranchSelect != null ? this.$refs.brandsBranchSelect.getSelectedProductsIDs() : [],
        task_id: this.taskTypeValue ? this.taskTypeValue.value : null,
        recurrence_rate: recurrenceRate
      }
      this.$axios
        .$post('/chain-module-api/tasks', task)
        .then(() => {
          this.$toast.success('Successfully created')
          this.$router.push('/tasks')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Add New Task',
        parent: { title: 'Tasks' }
      })
    },
    fetchChains() {
      this.$axios
        .$get('/common-module-api/dropdown/chain')
        .then(({ data: chains }) => {
          this.chains = chains
          if (this.isAllChainsSelected) {
            this.chainsValue = this.chainsOptions
          }
          // this.chainsValue = this.isAllChainsSelected ? this.chainsOptions : ''
        })
        .catch(() => {
          this.$toast.error('Error while fetching chains')
        })
    },
    fetchBranches() {
      const chainIds = _.map(this.chainsValue, 'value').join(',')
      if(!chainIds) return
      this.$axios
        .$get(`/common-module-api/dropdown/branch?chain_id=${chainIds}`)
        .then(({ data: branches }) => {
          this.branches = branches
          if (this.chainsValue.length) {
            if (this.isAllBranchesSelected) {
              this.branchesValue = this.branchesOptions
            }
            // this.branchesValue = this.isAllBranchesSelected ? this.branchesOptions : ''
          } else {
            this.branchesValue = []
          }
        })
        .catch(() => {
          this.$toast.error('Error while fetching branches')
        })
    },
    fetchTaskTypes() {
      if (this.taskTypes.length) return
      this.$axios
        .$get('common-module-api/dropdown/task-type')
        .then(({ data: taskTypes }) => {
          this.taskTypes = taskTypes.filter(({ name }) => name.en !== 'PROMOTION_REGULAR_CHECK')
        })
        .catch(() => {
          this.$toast.error('Error while fetching task types')
        })
    },

    dateRangeToggle(recurrenceRate) {
      this.isDateFrom = false
      this.isDateTo = false
      if (recurrenceRate.value === 'specific_date') this.isDateFrom = true
      if (recurrenceRate.value === 'date_range') {
        this.isDateFrom = true
        this.isDateTo = true
      }
    },
    changeSelectedBranches(newTerr) {
      this.selectedBranches = _.map(newTerr, 'value').join(',')
    },
    removeQuestion(index) {
      this.questions.splice(index, 1)
    },
    addQuestion() {
      this.questions.push({
        question: { en: '', ar: '' },
        answer_type: null,
        showAnswerValues: false,
        answer_values: [],
        is_mandatory: true
      })
    },
    showAnswerValues(index) {
      if (this.questions[index].answer_type.value == 'select')
        this.questions[index].showAnswerValues = true
      else {
        this.questions[index].showAnswerValues = false
        this.questions[index].answer_values = []
      }
    },
    unAssign() {
      this.promotionValue = ''
    },
    randomKey() {
      this.random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    }
  }
}
