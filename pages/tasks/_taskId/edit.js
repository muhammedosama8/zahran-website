import _ from 'lodash'
import Brand from '~/store/models/Brand'
import Product from '~/store/models/Product'

export default {
  name: 'EditTask',
  async fetch() {
    const { data: task } = await this.$axios.$get(
      `chain-module-api/tasks/${this.$route.params.taskId}`
    )
    this.task = task
    /* Strings */
    this.updateTaskFormValue.task_en = task.title.en
    this.updateTaskFormValue.task_ar = task.title.ar
    this.updateTaskFormValue.task_description_en = task.description.en
    this.updateTaskFormValue.task_description_ar = task.description.ar
    this.updateTaskFormValue.task_instructions_en = task.instructions.en
    this.updateTaskFormValue.task_instructions_ar = task.instructions.ar
    this.updateTaskFormValue.status = task.status
    this.updateTaskFormValue.recurrenceFrom = task.date_from
    this.updateTaskFormValue.recurrenceTo = task.date_to
    /* Images */
    // this.updateTaskFormValue.selectedFile = task.media.map(
    //   // eslint-disable-next-line camelcase
    //   ({ media_path, id }) => ({ url: media_path, id, old: true })
    // )

    this.updateTaskFormValue.taskImages = []
    if (task.media.length) {
      for (let index = 0; index < task.media.length; index++) {
        this.updateTaskFormValue.taskImages.push({
          selectedFile: [
            {
              url: task.media[index].media_path,
              id: task.media[index].id,
              old: true
            }
          ]
        })
      }
    }

    /* Brands-select */
    if (task.brands.length) this.forceSelectBrands.brands = task.brands
    if (task.products.length) this.forceSelectBrands.products = task.products
    // if (task.brand_ids.length) this.forceSelectBrands_id = task.brand_ids
    // if (task.product_ids.length) this.forceSelectProducts_id = task.product_ids
    /* Dropdowns */
    await this.fetchChains()
    this.chainsValue = this.chainsOptions.filter(({ value }) =>
      task.chain_ids.includes(value)
    )

    await this.fetchTaskTypes()
    this.taskTypeValue = this.taskTypeOptions.find(
      ({ value }) => value == task.task_id
    )

    this.updateTaskFormValue.recurrenceType = this.recurrenceRateOptions.find(
      ({ value }) => value == task.recurrence_rate
    )

    await this.fetchBranches(this.chainsValue)
    this.branchesValue = this.branchesOptions.filter(({ value }) =>
      task.branch_ids.includes(value)
    )


    if (task.questions.length) {
      this.questions = task.questions.map(
        // eslint-disable-next-line camelcase
        (question) => ({
          question: { en: question.question.en, ar: question.question.ar },
          answer_type: this.answerTypesOptions.find(
            ({ value }) => value == question.answer_type
          ),
          showAnswerValues: question.answer_type == 'select',
          answer_values:
            question.answer_type == 'select' ? question.answers : [],
          is_mandatory: question.mandatory
        })
      )
    } else {
      this.addQuestion()
    }
  },
  data() {
    return {
      updateTaskFormValue: {},
      task: {},
      validation: {},
      branches: [],
      chains: [],
      taskTypes: [],
      taskTypeValue: {},
      branchesValue: {},
      chainsValue: {},
      forceSelectBrands: {},
      forceSelectBrands_id: {},
      forceSelectProducts_id: {},
      selectedBranches: null,
      isPromotionRegularCheckTask: false,
      isDateFrom: false,
      isDateTo: false,
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
      questions: [],
      isAllChainsSelected: false,
      isAllBranchesSelected: false
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
      return this.taskTypes.map(({ id, name }) => ({
        value: id,
        label: name.en
      }))
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
    },
    
  },
  activated() {
    this.setBreadcrumb()
    this.changeSelectedBranches(this.branchesValue)
    
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
  },
  methods: {
    updateTask() {
      if (this.validation.hasErrors) {
        this.$toast.error(this.validation.errors.join(' &'))
        return
      }
      const oldMediaIds = this.updateTaskFormValue.taskImages
        .filter(({ selectedFile }) => selectedFile.results[0].old)
        .map(({ selectedFile }) => selectedFile.results[0].id)
      const newMediaIds = this.updateTaskFormValue.taskImages
        .filter(({ selectedFile }) => !selectedFile.results[0].old)
        .map(({ selectedFile }) => selectedFile.results[0].data.id)

      const recurrenceRate = {
        type: this.updateTaskFormValue.recurrenceType.value,
        from: this.updateTaskFormValue.recurrenceFrom,
        to: this.updateTaskFormValue.recurrenceTo
      }

      this.$toast.show('Updating the task...')

      const task = {
        title: {
          en: this.updateTaskFormValue.task_en,
          ar: this.updateTaskFormValue.task_ar
        },
        description: {
          en: this.updateTaskFormValue.task_description_en,
          ar: this.updateTaskFormValue.task_description_ar
        },
        instructions: {
          en: this.updateTaskFormValue.task_instructions_en,
          ar: this.updateTaskFormValue.task_instructions_ar
        },
        status: Boolean(this.updateTaskFormValue.status),

        media: [...oldMediaIds, ...newMediaIds],
        questions: this.questions
          .filter(
            (question) =>
              question.answer_type != null && question.question.en != ''
            // && question.question.ar != ''
          )
          .map((question) => ({
            question: question.question,
            answer_type: question.answer_type
              ? question.answer_type.value
              : null,
            answers: question.answer_values.filter((answer) => answer != ''),
            is_mandatory: question.is_mandatory
          })),
        chains: this.chainsValue.map(({ value }) => value),
        branches: this.branchesValue.map(({ value }) => value),

        brands: this.$refs.brandsSelect != null ? this.$refs.brandsSelect.getSelectedBrandsIDs() : [],
        products: this.$refs.brandsSelect != null ? this.$refs.brandsSelect.getSelectedProductsIDs() : [],
        // task_id: this.getTaskTypeIDValue(),
        task_id: this.taskTypeValue ? this.taskTypeValue.value : null,
        recurrence_rate: recurrenceRate
      }
      this.$axios
        .$put(`chain-module-api/tasks/${this.$route.params.taskId}`, task)
        .then(() => {
          this.$toast.success('Successfully updated')
          this.$router.push('/tasks')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    getTaskTypeIDValue() {
      return this.taskTypeValue.value
    },
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: 'Update task',
        parent: { title: 'Tasks' }
      })
    },
    async fetchChains() {
      // if (this.chains.length) return
      try {
        const { data: chains } = await this.$axios.$get('/common-module-api/dropdown/chain')
        this.chains = chains
        this.chainsValue = this.isAllChainsSelected
          ? this.chainsOptions
          : this.chainsOptions
      } catch (e) {
        this.$toast.error('Error while fetching chains')
      }
    },
    async fetchBranches() {
      try {
        const chainIds = _.map(this.chainsValue, 'value').join(',')
        const { data: branches } = await this.$axios.$get(
          `/common-module-api/dropdown/branch?chain_id=${chainIds}&has_no_visits=1`
        )
        this.branches = branches
        this.branchesValue = this.isAllBranchesSelected
          ? this.branchesOptions
          : this.branchesOptions.filter(({ value }) =>
              this.task.branch_ids.includes(value)
            )
      } catch (e) {
        this.$toast.error('Error while fetching branches')
      }
    },
    async fetchTaskTypes() {
      if (this.taskTypes.length) return

      try {
        const { data: taskTypes } = await this.$axios.$get('/common-module-api/dropdown/task-type')
        this.taskTypes = taskTypes.filter(
          ({ name }) => name.en !== 'PROMOTION_REGULAR_CHECK'
        )
      } catch (e) {
        this.$toast.error('Error while fetching branches')
      }
    },
    changeSelectedBranches(newTerr) {
      this.selectedBranches = _.map(newTerr, 'value').join(',')
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
    removeQuestion(index) {
      this.questions.splice(index, 1)
    },
    addQuestion() {
      this.questions.push({
        question: { en: '', ar: '' },
        answer_type: null,
        answer_values: [],
        showAnswerValues: false,
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
    randomKey() {
      this.random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    }
  }
}
