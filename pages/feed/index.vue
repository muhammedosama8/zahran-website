<template>
  <div>
    <div class="row justify-content-end">
      <div class="col-md-4">
        <div class="newDropDown">
          <b-dropdown
            id="dropdown-form"
            ref="dropdown"
            class="mb-3 btn-block"
            :text="`Filter By Date (${selectedDate})`"
          >
            <b-dropdown-form class="mt-2">
              <!--     eslint-disable     -->
              <FormulateInput
                v-model="selectedDateOption"
                type="dataDropdown"
                :customplaceholder="'Select Date'"
                :options="dateOptions"
              />
              <template v-if="isDateRangeSelected">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="dateFrom"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="dateTo"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
              </template>
              <b-button variant="primary" class="px-5" size="md" @click="fetchComments"
              >Search
              </b-button>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
      <div class="col-md-12">
        <div>
          <b-form-group class="listFeed">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="filters.commentType"
              :options="commentTypeOptions"
              buttons
              class="w-100 overflow-auto"
              name="radios-btn-default"
              @input="$fetch"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-4">
        <div class="card p-3 mt-3 cardShadow">
          <div v-if="filters.commentType !== 'promotion'">
            <label>Task Type</label>
            <b-form-select
              v-model="filters.taskType"
              :options="taskTypeOptions"
            />
          </div>
          <div class="pt-3">
            <label>Brand</label>
            <b-form-select
              v-model="filters.brand"
              :options="brandOptions"
              @change="fetchSubBrands"
            />
          </div>
          <div class="pt-3">
            <label>Sub-brand</label>
            <b-form-select
              v-model="filters.subBrand"
              :options="subBrandOptions"
              @change="fetchProducts"
            />
          </div>
          <div class="pt-3">
            <label>Product</label>
            <b-form-select
              v-model="filters.product"
              :options="productOptions"
            />
          </div>
          <div class="pt-3">
            <label>Chain</label>
            <b-form-select v-model="filters.chain" :options="chainOptions" />
          </div>
          <div class="pt-3">
            <label>Branch</label>
            <b-form-select v-model="filters.branch" :options="branchOptions" />
          </div>
          <div class="pt-3">
            <label>Merchandiser</label>
            <b-form-select
              v-model="filters.merchandiser"
              :options="merchandiserOptions"
            />
          </div>
          <div class="pt-3">
            <label> Territory</label>
            <b-form-select
              v-model="filters.territory"
              :options="territoryOptions"
            />
          </div>
          <div class="pt-3">
            <label>Show Per page</label>
            <b-form-select v-model="filters.perPage" :options="pageOptions" />
          </div>
          <button class="btn btn-block btnAdd text-white mt-3" @click="$fetch">
            Apply Filters
          </button>
        </div>
      </div>
      <div class="col-lg-9 col-md-8">
        <div class="mt-3">
          <div class="bgCardFeed px-3 pt-3 pb-2">
              <h6 class="colorGray">Reports ({{ totalCount }})</h6>
          </div>
        </div>
        <div
          class="row justify-content-center pt-3 rowBorder mx-0 pb-5"
        >
          <div class="col-lg-11">
            <div>
              <h4 class="pb-2 colorGray">Today Comments</h4>
              <div>
                <lazy-feed-card :comment="comment" :commentType="filters.commentType" />
              </div>
            </div>
            <h4 class="pt-3 pb-2 colorGray">Yesterday Comments</h4>
            <div>
              <lazy-feed-card :comment="comment" :commentType="filters.commentType" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div
                class="dataTables_paginate paging_simple_numbers float-right"
              >
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination
                    v-model="filters.currentPage"
                    :total-rows="totalCount"
                    :per-page="filters.perPage"
                    hide-goto-end-buttons
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetch() {
    this.fetchComments()
  },
  data() {
    return {
      comments: [],
      filters: {
        brand: null,
        subBrand: null,
        product: null,
        merchandiser: null,
        taskType: null,
        branch: null,
        chain: null,
        time: null,
        date: '',
        from: null,
        to: null,
        commentType: 'comment',
        territory: null,
        currentPage: 1,
        perPage: 10
      },
      commentTypeOptions: [
        { text: 'Task reports', value: 'comment', selected: true },
        { text: 'Shell-Out Reports', value: 'task-feed' },
        { text: 'Stock-count Report', value: 'promotion' },
        { text: 'Return Report', value: 'return-report' },
        { text: 'Order Supply Report', value: 'supply-report' },
        { text: 'Competition reports', value: 'competition' }
      ],
      selectedDateOption: '',
      selectedDate: 'All Time',
      dateFrom: '',
      dateTo: '',
      dateOptions: [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'This Week', value: 'week' },
        { label: 'Last Week', value: 'last_week' },
        { label: 'This Month', value: 'this_month' },
        { label: 'Last Month', value: 'last_month' },
        { label: 'Year', value: 'year' },
        { label: 'Last Year', value: 'last_year' },
        { label: 'Date Range', value: 'date_range' }
      ],
      pageOptions: [100, 50, 25, 10],
      brands: [],
      subBrands: [],
      products: [],
      merchandisers: [],
      taskTypes: [],
      branches: [],
      chains: [],
      territories: [],
      totalCount: 0
    }
  },
  computed: {
    todayComments() {
      return this.comments.filter(
        // eslint-disable-next-line camelcase
        ({ task_date }) =>
          new Date(task_date).toDateString() === new Date().toDateString()
      )
    },
    otherComments() {
      return this.comments.filter(
        // eslint-disable-next-line camelcase
        ({ task_date }) =>
          new Date(task_date).toDateString() !== new Date().toDateString()
      )
    },
    timeOptions() {
      return [{ value: null, text: 'All time', selected: true }]
    },
    brandOptions() {
      return [
        { value: null, text: 'Any brand', selected: true },
        ...this.brands.map(({ name, id }) => ({ value: id, text: name.en }))
      ]
    },
    taskTypeOptions() {
      return [
        { value: null, text: 'Any task type', selected: true },
        ...this.taskTypes.map(({ name, id }) => ({ value: id, text: name.en }))
      ]
    },
    productOptions() {
      return [
        { value: null, text: 'Any product', selected: true },
        ...this.products.map(({ type, id }) => ({ value: id, text: type.en }))
      ]
    },
    branchOptions() {
      return [
        { value: null, text: 'Any branch', selected: true },
        ...this.branches.map(({ name, id }) => ({ value: id, text: name.en }))
      ]
    },
    chainOptions() {
      return [
        { value: null, text: 'Any chain', selected: true },
        ...this.chains.map(({ name, id }) => ({ value: id, text: name.en }))
      ]
    },
    merchandiserOptions() {
      return [
        { value: null, text: 'Any merchandise', selected: true },
        ...this.merchandisers.map(({ name, id }) => ({
          value: id,
          text: name.en
        }))
      ]
    },
    territoryOptions() {
      return [
        {
          value: null,
          text: 'Select Territory',
          disabled: true,
          selected: true
        },
        ...this.territories.map(({ name, id }) => ({
          value: id,
          text: name.en
        }))
      ]
    },
    subBrandOptions() {
      return [
        {
          value: null,
          text: 'Select sub-brand',
          disabled: true,
          selected: true
        },
        ...this.subBrands.map(({ name, id }) => ({ value: id, text: name.en }))
      ]
    },
    isDateRangeSelected() {
      return this.selectedDateOption.value === 'date_range'
    },
    getSelectedDate() {
      if (!this.selectedDateOption.value) return this.selectedDate
      switch (this.selectedDateOption.value) {
        case 'date_range':
          return `${this.dateFrom} : ${this.dateTo}`
        default:
          return this.selectedDateOption.label
      }
    }
  },
  watch: {
    filters: {
      handler: 'getZahranData',
      deep: true
    }
  },
  mounted() {
    this.fetchBrands()
    this.fetchMerchandisers()
    this.fetchTaskTypes()
    this.fetchBranches()
    this.fetchChains()
    this.fetchTerritories()
  },
  activated() {
    this.setBreadCrumb()
    this.$fetch()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setBreadCrumb() {
      this.$store.dispatch('breadcrumb/update', { title: 'News Feed' })
    },
    async fetchBrands() {
      try {
        const { data: brands } = await this.$axios.$get(
          '/dropdown/brand?parent_id='
        )
        this.brands = brands
      } catch (e) {
        this.$toast.error('Error fetching brands')
      }
    },
    async fetchSubBrands(brand) {
      try {
        let url = '/dropdown/brand?parent_id='
        if (brand) url += brand
        const { data: subBrands } = await this.$axios.$get(url)
        this.subBrands = subBrands
        this.products.splice(0, this.products.length)
      } catch (e) {
        this.$toast.error('Error fetching sub brands')
      }
    },
    async fetchProducts(subBrand) {
      try {
        let url = '/dropdown/product?brand_id='
        if (subBrand) url += subBrand
        const { data: products } = await this.$axios.$get(url)
        this.products = products
      } catch (e) {
        this.$toast.error('Error fetching products')
      }
    },
    async fetchMerchandisers() {
      try {
        const { data: merchandisers } = await this.$axios.$get(
          '/dropdown/merchandiser'
        )
        this.merchandisers = merchandisers
      } catch (e) {
        this.$toast.error('Error fetching merchandisers')
      }
    },
    async fetchTaskTypes() {
      try {
        const { data: taskTypes } = await this.$axios.$get('/dropdown/taskType')
        this.taskTypes = taskTypes
      } catch (e) {
        this.$toast.error('Error fetching task types')
      }
    },
    async fetchBranches() {
      try {
        const { data: branches } = await this.$axios.$get('/dropdown/branch')
        this.branches = branches
      } catch (e) {
        this.$toast.error('Error fetching task branches')
      }
    },
    async fetchChains() {
      try {
        const { data: chains } = await this.$axios.$get('/dropdown/chain')
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching task chains')
      }
    },
    async fetchTerritories() {
      try {
        const { data: territories } = await this.$axios.$get(
          '/dropdown/territory'
        )
        this.territories = territories
      } catch (e) {
        this.$toast.error('Error fetching task territories')
      }
    },
    async fetchComments() {
      try {
        const { data: comments } = await this.$axios.$get('/comment', {
          params: this.queryUrlParams()
        })
        this.selectedDate = this.getSelectedDate
        this.comments = comments.data
        this.totalCount = comments.meta.total
        this.$toast.success('Comments fetched')
      } catch (e) {
        this.$toast.error('Error fetching comments')
      }
    },
    queryUrlParams() {
      const params = {}
      params.page = this.filters.currentPage
      params.per_page = this.filters.perPage
      if (this.filters.brand) params.brand_id = this.filters.brand
      if (this.filters.subBrand) params.sub_brand_id = this.filters.subBrand
      if (this.filters.product) params.product_id = this.filters.product
      if (this.filters.merchandiser)
        params.merchandiser_id = this.filters.merchandiser
      if (this.filters.taskType) params.task_type_id = this.filters.taskType
      if (this.filters.branch) params.branch_id = this.filters.branch
      if (this.filters.chain) params.chain_id = this.filters.chain
      if (this.filters.territory) params.territory_id = this.filters.territory
      if (this.selectedDateOption) params.date = this.selectedDateOption.value
      if (this.dateFrom) params.from = this.dateFrom
      if (this.dateTo) params.to = this.dateTo
      if (this.filters.commentType)
        params.comment_type = this.filters.commentType
      else params.comment_type = 'comment'

      return params
    }
  }
}
</script>
<style src="./style.css"></style>