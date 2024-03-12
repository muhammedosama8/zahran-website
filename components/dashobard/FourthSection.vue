<template>
  <div v-if="!$fetchState.pending" class="col-xl-12 pt-0 pb-1">
    <div class="row">
      <!-- Card issues -->
      <div class="col-xl-6 pt-3">
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title mb-4">
              Issues
              <span class="float-right"
                >{{ total_tickets }} Issues in total</span
              >
            </h4>
            <b-tabs pills nav-class="bg-light rounded" content-class="mt-4">
              <b-tab title="Branches" active>
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>Brand Name</th>
                        <th>Open Tickets Percentage</th>
                        <th>Open Tickets</th>
                        <th>Closed Tickets</th>
                        <th>Avg. Solving Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="branch_ticket in branch_tickets"
                        :key="branch_ticket.id"
                      >
                        <td>{{ branch_ticket.name.en }}</td>
                        <td>
                          <div>
                            <apexchart
                              class="apex-charts"
                              height="120"
                              type="radialBar"
                              dir="ltr"
                              :series="[branch_ticket.perctage]"
                              :options="issueChartOptions"
                            ></apexchart>
                          </div>
                        </td>
                        <td>{{ branch_ticket.open_tickets }}</td>
                        <td>{{ branch_ticket.closed_tickets }}</td>
                        <td>{{ branch_ticket.avg_time }} h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <!-- <b-tab title="Chains">
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>Chain Name</th>
                        <th>Open Tickets Percentage</th>
                        <th>Open Tickets</th>
                        <th>Closed Tickets</th>
                        <th>Avg. Solving Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> chain.name.en </td>
                        <td>
                          <apexchart
                            class="apex-charts"
                            height="120"
                            type="radialBar"
                            dir="ltr"
                            :series="[46]"
                            :options="issueChartOptions"
                          ></apexchart>
                        </td>
                        <td> chain.open_tickets </td>
                        <td> chain.closed_tickets </td>
                        <td> chain.tickets_avg </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Cities">
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>City Name</th>
                        <th>Open Tickets Percentage</th>
                        <th>Open Tickets</th>
                        <th>Closed Tickets</th>
                        <th>Avg. Solving Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> city.name.en </td>
                        <td>
                          <apexchart
                            class="apex-charts"
                            height="120"
                            type="radialBar"
                            dir="ltr"
                            :series="[59]"
                            :options="issueChartOptions"
                          ></apexchart>
                        </td>
                        <td> city.open_tickets </td>
                        <td> city.closed_tickets </td>
                        <td> city.tickets_avg </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="Branches">
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>Branch Name</th>
                        <th>Open Tickets Percentage</th>
                        <th>Open Tickets</th>
                        <th>Closed Tickets</th>
                        <th>Avg. Solving Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(branch, index) in data.branches" :key="index">
                        <td> branch.name.en </td>
                        <td>
                          <apexchart
                            class="apex-charts"
                            height="120"
                            type="radialBar"
                            dir="ltr"
                            :series="[57]"
                            :options="issueChartOptions"
                          ></apexchart>
                        </td>
                        <td> branch.open_tickets </td>
                        <td> branch.closed_tickets </td>
                        <td> branch.tickets_avg </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab> -->
            </b-tabs>
          </div>
        </div>
      </div>
      <!-- Card Top Selling -->
      <div class="col-xl-6 py-3">
        <div class="card">
          <div class="card-body pb-0">
            <div class="clearfix">
              <h4 class="card-title mb-4">
                {{ total_tickets }} Issues in Total
                <span class="float-right" style="font-size: 16px">
                  <NuxtLink to="tickets" class="btn btnCancel">
                    See all Issues
                  </NuxtLink>
                </span>
              </h4>
            </div>
            <div class="table-responsive issues-table tableR mt-2 mb-0">
              <!-- <simplebar style="max-height: 351px"> -->
              <table class="table table-centered">
                <tbody>
                  <tr v-for="ticket in tickets" :key="ticket.id">
                    <td>
                      <h5 class="font-size-14 mb-1">{{ ticket.title }}</h5>
                      <p class="text-muted mb-0">
                        <span class="badge badge-primary">
                          {{ ticket.severity }}
                        </span>
                        {{ ticket.type.name.en }}
                      </p>
                    </td>
                    <td>
                      <div class="media">
                        <div class="mr-3">
                          <b-avatar
                            variant="primary"
                            :src="ticket.demo.media"
                          ></b-avatar>
                        </div>
                        <div class="media-body align-self-center">
                          <div class="text-muted">
                            <p class="mb-0">
                              <small> {{ ticket.created_at }} </small>
                            </p>
                            <h5 class="mb-1">
                              {{ ticket.demo.name.en }}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- </simplebar> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FourthSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'common-module-api/dashboard-data',
        {
          params: { forth_section: true, ...this.paramsFilter }
        }
      )
      this.branch_tickets = data.forth_section.branch_tickets
      this.tickets = data.forth_section.tickets
      this.total_tickets = data.forth_section.total_tickets
    } catch (e) {
      this.$toast.error('Error in fetching fourth section' + e)
    }
  },
  data() {
    return {
      data: {},
      branch_tickets: [],
      tickets: [],
      total_tickets: 0,
      issueChartOptions: {
        plotOptions: {
          radialBar: {
            width: 20,
            inverseOrder: false,
            startAngle: 0,
            endAngle: 360,
            offsetX: -20,
            offsetY: 0,
            dataLabels: {
              value: {
                offsetX: 0,
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
  mounted() {
    this.$root.$on('filterDataEvent', (data) => {
      this.paramsFilter = data
      this.$fetch()
    })
  },
  methods: {
    getTicketPercentage(item) {
      const countTickets = item.open_tickets + item.closed_tickets
      const percentage =
        countTickets !== 0 ? (item.open_tickets / countTickets) * 100 : 0
      return Number(percentage).toFixed(2)
    }
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
.issueT {
  /* overflow: auto; */
  max-height: 263px;
}
.tableR {
  max-height: 350px;
}
.table-responsive thead th,
.table-responsive tbody td {
  vertical-align: middle;
}
</style>
