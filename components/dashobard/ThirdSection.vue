<template>
  <div class="col-xl-12 pt-4 pb-1">
    <div class="row">
      <div class="col-xl-6 pb-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title pt-2 mb-4">
              Visits Distribution
              <span class="float-right"
                >{{ total_visits }} Visits in total</span
              >
            </h4>
            <b-tabs pills nav-class="bg-light rounded" content-class="mt-4">
              <b-tab title="Branches">
                <!-- <simplebar style="max-height: 340px"> -->
                <div class="table-responsive visitD issues-table">
                  <table class="table table-centered table-nowrap">
                    <thead>
                      <tr>
                        <th>Branch Name</th>
                        <th>Total Visits</th>
                        <th class="mr-0">Avg. Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="branch in branchs" :key="branch.id">
                        <td>
                          <div>
                            <h5 class="font-size-14 mb-1">
                              {{ branch.name.en }}
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p class="text-muted mb-0">
                              {{ branch.total_visit }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="text-right">
                            <p class="font-size-14 mb-0">
                              {{ branch.avg_time }} h
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- </simplebar> -->
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
      <div class="col-xl-6">
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-left" style="padding-top: 20px">
              Task Completion
              <span style="display: block"
                >{{ completed_tasks }}/{{ total_tasks }}</span
              >
            </h3>
          </div>
          <div class="col-md-6 text-right">
            <client-only>
              <apexchart
                class="apex-charts"
                height="200"
                type="radialBar"
                dir="rtl"
                :series="[completed_perctage]"
                :options="taskChartOptions"
              ></apexchart>
            </client-only>
          </div>
        </div>
        <div class="card mb-3">
          <div class="card-body container">
            <b-row>
              <b-col class="pt-2">
                <h4 class="card-title mb-4">Performance</h4>
              </b-col>
              <b-col>
                <!-- eslint-disable -->
                <!--                      <FormulateInput-->
                <!--                        type="dataDropdown"-->
                <!--                        :customplaceholder="'Top Cities'"-->
                <!--                        :isMultiple="true"-->
                <!--                        :options="citiesOptions"-->
                <!--                      />-->
              </b-col>
            </b-row>
            <b-tabs pills nav-class="bg-light rounded" content-class="mt-4">
              <b-tab title="Top Performance">
                <!-- <simplebar style="max-height: 165px"> -->
                <div class="table-responsive issues-table top_p">
                  <table class="table table-centered table-nowrap">
                    <tbody>
                      <tr v-for="top_per in top_performance" :key="top_per.id">
                        <td style="vertical-align: middle">
                          <div>
                            <p class="text-muted mb-1">{{ top_per.name.en }}</p>
                          </div>
                        </td>
                        <td>
                          <apexchart
                            class="apex-charts"
                            height="120"
                            type="radialBar"
                            dir="ltr"
                            :series="[top_per.perctage]"
                            :options="performanceChartOptions"
                          ></apexchart>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- </simplebar> -->
              </b-tab>
              <b-tab title="Least Performance">
                <!-- <simplebar style="max-height: 340px"> -->
                <div class="table-responsive issues-table top_p">
                  <table class="table table-centered table-nowrap">
                    <tbody>
                      <tr
                        v-for="least_per in least_performance"
                        :key="least_per.id"
                      >
                        <td style="vertical-align: middle">
                          <div>
                            <p class="text-muted mb-1">
                              {{ least_per.name.en }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <apexchart
                            class="apex-charts"
                            height="120"
                            type="radialBar"
                            dir="ltr"
                            :series="[least_per.perctage]"
                            :options="performanceChartOptions"
                          ></apexchart>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- </simplebar> -->
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThirdSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'common-module-api/dashboard-data',
        {
          params: { third_section: true, ...this.paramsFilter }
        }
      )
      this.data = data.third_section
      this.branchs = data.third_section.visit_distribution
      this.total_visits = data.third_section.total_visits
      this.total_tasks = data.third_section.total_tasks
      this.completed_tasks = data.third_section.completed_tasks
      this.top_performance = data.third_section.performance.top_performance
      this.least_performance = data.third_section.performance.least_performance
      this.completed_perctage = data.third_section.completed_perctage
      // this.data = data.third_section
      // this.performanceChartOptions.series = [0, 50]
    } catch (e) {
      this.$toast.error('Error in fetching third section' + e)
    }
  },
  data() {
    return {
      data: {},
      total_visits: 0,
      branchs: [],
      completed_tasks: 0,
      total_tasks: 0,
      completed_perctage: 0,
      top_performance: [],
      least_performance: [],
      performanceChartOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              // showOn: 'always',
              value: {
                offsetY: -10,
                show: true,
                // color: '#888',
                fontSize: '13px'
              }
            }
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['']
      },
      taskChartOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              value: {
                offsetY: -10,
                show: true,
                fontSize: '13px'
              }
            }
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['']
      }
    }
  },
  computed: {
    taskCompletion() {
      const { completed, all } = this.data.performance
      return `${completed}/${all}`
    },
    completedTasksPercentage() {
      const completed = this.completed_tasks
      const all = this.total_tasks
      return all !== 0 ? Number((completed / all) * 100).toFixed(2) : 0
    }
  },
  mounted() {
    this.$root.$on('filterDataEvent', (data) => {
      this.paramsFilter = data
      this.$fetch()
    })
  }
}
</script>

<style scoped>
/* width */
.issues-table::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background: white;
}

/* Track */
.issues-table::-webkit-scrollbar-track {
  box-shadow: inset 0 0 4px rgb(212, 211, 211);
  border-radius: 10px;
}

/* Handle */
.issues-table::-webkit-scrollbar-thumb {
  background: #969696;
  border-radius: 10px;
}

/* Handle on hover */
.issues-table::-webkit-scrollbar-thumb:hover {
  background: #969696;
}
.visitD {
  max-height: 340px;
}
.top_p {
  max-height: 165px;
}
.table-responsive thead th,
.table-responsive tbody td {
  vertical-align: middle;
}
</style>
