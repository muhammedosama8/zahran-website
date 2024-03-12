<template>
  <div class="col-xl-12 pt-4 pb-1">
    <div class="row">
      <!-- <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">
              <span>Reports</span>
              <span class="float-right"
                >150 Reports in total</span
              >
            </h5>
            <client-only>
              <apexchart
                class="apex-charts"
                height="320"
                type="donut"
                dir="ltr"
                :series="[50]"
                :options="chart.chartOptions"
              ></apexchart>
            </client-only>
          </div>
        </div>
      </div> -->
      <div class="col-xl-12">
        <div class="card mb-3">
          <div class="card-body container">
            <b-tabs pills nav-class="bg-light rounded" content-class="mt-4">
              <b-tab title="Task Reports">
                <div class="table-responsive issues-table taskReport">
                  <table class="table table-centered table-nowrap">
                    <tbody>
                      <tr>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small>  item.sub_brand.name.en  </small>
                                </p>
                                <h5 class="mb-1"> item.product.name.en </h5>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p class="text-wrap">item.comment</p>
                          </div>
                        </td>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small> item.task_date </small>
                                </p>
                                <h5 class="mb-1">
                                   item.merchandiser.name.en 
                                </h5>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Competition Reports">
                <div class="table-responsive issues-table taskReport">
                  <table class="table table-centered table-nowrap">
                    <tbody>
                      <tr>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small>  item.sub_brand.name.en  </small>
                                </p>
                                <h5 class="mb-1"> item.product.name.en </h5>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p class="text-wrap"> item.comment </p>
                          </div>
                        </td>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small>  item.task_date </small>
                                </p>
                                <h5 class="mb-1">
                                   item.merchandiser.name.en 
                                </h5>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Tickets">
                <div class="table-responsive issues-table taskReport">
                  <table class="table table-centered table-nowrap">
                    <tbody>
                      <tr>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small> item.sub_brand.name.en</small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p class="text-wrap">item.description</p>
                          </div>
                        </td>
                        <td>
                          <div class="media">
                            <div class="mr-3">
                              <b-avatar
                                variant="primary"
                                style="width: 4em; height: 4em"
                              >
                              </b-avatar>
                            </div>
                            <div class="media-body align-self-center">
                              <div class="text-muted">
                                <p class="mb-0">
                                  <small>  item.ticket_date </small>
                                </p>
                                <h5 class="mb-1">
                                   item.merchandiser.name.en 
                                </h5>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'FifthSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get('common-module-api/dashboard-data', {
        params: { fifth_section: true, ...this.paramsFilter }
      })
      this.data = data.fifth_section
      this.chart.series = [
        this.data.task_reports.count,
        this.data.competition_reports.count,
        this.data.issues.count
      ]
    } catch (e) {
      this.$toast.error('Error in fetching fifth section')
    }
  },
  data() {
    return {
      data: {},
      chart: {
        series: [0, 0, 0],
        chartOptions: {
          labels: ['Task Reports', 'Competition Reports', 'Tickets'],
          colors: ['#556ee6', '#f1b44c', '#f46a6a'],
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                chart: {
                  height: 240
                },
                legend: {
                  show: false
                }
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    totalReportCount() {
      const { competition_reports, task_reports, issues } = this.data
      return competition_reports.count + task_reports.count + issues.count
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

.taskReport {
  max-height: 261px;
}

.table-responsive thead th,
.table-responsive tbody td {
  vertical-align: middle;
}
</style>
