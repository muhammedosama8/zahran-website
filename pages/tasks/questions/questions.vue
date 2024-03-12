<template>
  <div class="row">
    <div class="col-12">
      <!--     eslint-disable     -->
      <div class="row py-2 widthFilter">
        <!-- Chain -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.chainIds"
              type="dataDropdown"
              :customplaceholder="'Chain'"
              :isMultiple="true"
              :options="chainOptions"
            />
          </div>
        </div>
        <!-- Branches -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.branchIds"
              type="dataDropdown"
              :customplaceholder="'Branch'"
              :isMultiple="true"
              :options="branchOptions"
            />
          </div>
        </div>
        <!-- Territory -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.territoryIds"
              type="dataDropdown"
              :customplaceholder="'Territory'"
              :isMultiple="true"
              :options="territoryOptions"
            />
          </div>
        </div>
        <!-- Brand -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.brandIds"
              type="dataDropdown"
              :customplaceholder="'Brand'"
              :isMultiple="true"
              :options="brandOptions"
            />
          </div>
        </div>
        <!-- Task Type -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.taskIds"
              type="dataDropdown"
              :customplaceholder="'Task type'"
              :isMultiple="true"
              :options="taskTypeOptions"
            />
          </div>
        </div>
        <!-- Question Type -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.merchandiserIds"
              type="dataDropdown"
              :customplaceholder="'Merchandiser'"
              :isMultiple="true"
              :options="merchandiserOptions"
            />
          </div>
        </div>
        <client-only>
          <div class="col-xl-2 col-md-6 pt-2">
            <div class="newDropDown">
              <b-dropdown
                id="dropdown-form"
                ref="dropdown"
                text="Filter By Date"
                class="btn-block"
              >
                <b-dropdown-form class="mt-2">
                  <b-form-group label="From Date" label-for="dropdown-form-date">
                    <b-form-input
                      id="dropdown-form-date"
                      v-model="filtering.from"
                      type="date"
                      size="sm"
                      placeholder="date"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="To Date" label-for="dropdown-form-date">
                    <b-form-input
                      id="dropdown-form-date"
                      v-model="filtering.to"
                      type="date"
                      size="sm"
                      placeholder="date"
                    ></b-form-input>
                  </b-form-group>
                </b-dropdown-form>
              </b-dropdown>
            </div>
          </div>
        </client-only>
        <div class="col-xl-12 col-md-12 pt-1 text-right">
          <div
            id="tickets-table_length"
            class="dataTables_length text-md-right"
          >
            <p class="d-inline-flex mt-1 align-items-center">
              Showing <strong class="px-2">{{ totalRows }}</strong> from
              <strong class="px-2">{{ totalCount }}</strong>
            </p>
          </div>
        </div>
      </div>
      <template v-if="tasks.length">
        <div v-for="(task,index) in tasks" :key="index" class="row pb-3">
          <div class="col-12">
            <div class="bgCardFeed px-3 pt-3 pb-2 my-2">
              <div class="row justify-content-between">
                <div class="col-lg-3 col-md-6">
                  <h6>
                    <b-avatar
                      variant="primary"
                      :src="task.chain_logo"
                      class="mr-3 imgCircleC"
                    ></b-avatar>
                    {{ task.branch.name.en }}
                  </h6>
                </div>
                <div class="col-lg-3 col-md-6">
                  <h6>{{ task.merchaindiser.name.en }}</h6>
                  <h6>{{ task.task_type.name.en }}</h6>
                </div>
                <div class="col-lg-2 col-md-6">
                  <h6>{{ task.date }}</h6>
                  <h6>Questions: {{ task.questions_count }}</h6>
                </div>
                <div class="col-lg-3 col-md-6">
                  <h6>{{ task.title.en }}</h6>
                </div>
                <div class="col-lg-1 col-md-6">
                  <b-button v-b-toggle="`collapse-${index}`" class="p-0" variant="light"
                  ><img
                    src="~/assets/images/arrow.png"
                    width="40"
                    height="auto"
                    alt=""
                  /></b-button>
                </div>
              </div>
              <b-collapse :id="`collapse-${index}`" class="mt-2 crdB">
                <b-card>
                  <div class="row border-bottom pb-2">
                    <!-- Media Type Answer-->
                    <div
                      v-for="(question, index) in task.questions"
                      :key="index"
                      class="col-md-6 pb-2 mb-4"
                    >
                      <h5 class="card-text">
                        <b>Question {{ index + 1 }} : </b> {{ question.title.en }}
                      </h5>
                      <template v-if="question.type === 'select'">
                        <div>
                          <b-list-group class="newListGroup" v-for="(answer,index) in question.answer" :key="index">
                            <b-list-group-item href="#some-link" :active="answer.selected"
                            > {{ index + 1 }}- {{answer.value}}
                            </b-list-group-item
                            >
                          </b-list-group>
                        </div>
                      </template>
                      <template v-else-if="question.type === 'media'">
                        <b-avatar
                          variant="primary"
                          :src="question.media"
                          size="10em"
                        ></b-avatar>
                      </template>
                      <template v-else>
                        <h6 class="card-text pt-2 pb-0">
                          <b>Ans : </b> {{ question.answer }}
                        </h6>
                      </template>
                    </div>
                  </div>
                </b-card>
              </b-collapse>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            Tasks
            <label class="d-inline-flex align-items-center">
              <b-form-select
                v-model="filtering.perPage"
                size="md"
                :options="pageOptions"
              ></b-form-select>
            </label
            >&nbsp;Per page
          </div>
          <div class="col">
            <div class="dataTables_paginate paging_simple_numbers float-right">
              <ul class="pagination pagination-rounded mb-0">
                <!-- pagination -->
                <b-pagination
                  v-model="filtering.currentPage"
                  :total-rows="totalCount"
                  :per-page="filtering.perPage"
                  hide-goto-end-buttons
                ></b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h3 class="text-center p-3">No  Matching Results Found</h3>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      const { data: tasks } = await this.$axios.$get('task_questions', {
        params: this.queryUrlParams()
      })
      this.tasks = tasks.data
      this.totalCount = tasks.meta.total
    } catch (e) {
      this.$toast.error('Error fetching questions')
    }
  },
  data() {
    return {
      totalCount: 0,
      filtering: {
        currentPage: 1,
        perPage: 100,
        searchTerm: null,
        chainIds: [],
        branchIds: [],
        territoryIds: [],
        brandIds: [],
        taskIds: [],
        merchandiserIds: []
      },
      pageOptions: [100, 50, 25, 10],
      tasks: [],
      chains: [],
      branches: [],
      territories: [],
      cities: [],
      brands: [],
      merchandisers: [],
      taskTypes: [],
      branchToDelete: null
    }
  },
  computed: {
    totalRows() {
      return this.tasks.length
    },
    chainOptions() {
      return [
        { value: null, label: 'Any chain' },
        ...this.chains.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    branchOptions() {
      return [
        { value: null, label: 'Any branch' },
        ...this.branches.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    territoryOptions() {
      return [
        { value: null, label: 'Any Territory' },
        ...this.territories.map(({ name, id }) => ({
          value: id,
          label: name.en
        }))
      ]
    },
    brandOptions() {
      return [
        { value: null, label: 'Any brand' },
        ...this.brands.map(({ name, id }) => ({ value: id, label: name.en }))
      ]
    },
    taskTypeOptions() {
      return [
        { value: null, label: 'Any task type.' },
        ...this.taskTypes.map(({ name, id }) => ({
          value: id,
          label: name.en
        }))
      ]
    },
    merchandiserOptions() {
      if (!this.merchandisers.length) return []
      return [
        { value: null, label: 'Any merchandiser' },
        ...this.merchandisers.map(({ name, id }) => ({
          value: id,
          label: name.en
        }))
      ]
    }
  },
  watch: {
    tasks: 'setBreadcrumb',
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
    this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    this.fetchChains()
    this.fetchBranches()
    this.fetchTerritories()
    this.fetchBrands()
    this.fetchTaskTypes()
    this.fetchMerchandisers()
  },
  methods: {
    queryUrlParams() {
      const params = {}
      params.page = this.filtering.currentPage
      params.per_page = this.filtering.perPage
      if (this.filtering.chainIds.length) {
        params.chain_id = this.filtering.chainIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.branchIds.length) {
        params.branch_id = this.filtering.branchIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.territoryIds.length) {
        params.territory_id = this.filtering.territoryIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.brandIds.length) {
        params.brand_id = this.filtering.brandIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.taskIds.length) {
        params.task_id = this.filtering.taskIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.merchandiserIds) {
        params.merchandiser_id = this.filtering.merchandiserIds
          .map(({ value }) => value)
          .join(',')
      }
      if (this.filtering.from) params.from = this.filtering.from
      if (this.filtering.to) params.to = this.filtering.to
      return params
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
    async fetchChains() {
      try {
        const { data: chains } = await this.$axios.$get('/dropdown/chain')
        this.chains = chains
      } catch (e) {
        this.$toast.error('Error fetching task chains')
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
    async fetchTaskTypes() {
      try {
        const { data: taskTypes } = await this.$axios.$get('/dropdown/taskType')
        this.taskTypes = taskTypes
      } catch (e) {
        this.$toast.error('Error fetching task types')
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
    setBreadcrumb() {
      this.$store.dispatch('breadcrumb/update', {
        title: `Tasks Questions (${this.totalCount})`
      })
    },
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
</script>

<style scoped>
.bgCardFeed h5 {
  color: #0a063d;
  font-weight: 500;
}

.bgCardFeed {
  border-radius: 4px;
}

.imgCircleC {
  width: 30px;
  height: 30px;
  object-fit: cover;
}

.crdB .card-body {
  padding-bottom: 0px;
}

.newListGroup .list-group-item {
  border: none;
  padding: 0.3rem !important;
}

.newListGroup .list-group-item.active {
  background-color: unset !important;
  color: black !important;
  font-weight: bolder;
}
</style>
