<template>
  <div v-if="!$fetchState.pending" class="col-xl-12 pt-0 pb-1">
    <div class="row">
      <!-- Card issues -->
      <div class="col-xl-6 pt-3">
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title mb-4">Top 10 Selling Products</h4>
            <b-tabs pills nav-class="bg-light rounded" content-class="mt-4">
              <b-tab title="CKW" active>
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Module Number</th>
                        <th>CMMF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="ckw_product in ckw_products"
                        :key="ckw_product.id"
                      >
                        <td>{{ ckw_product.name.en }}</td>
                        <td>{{ ckw_product.brand.name }}</td>
                        <td>{{ ckw_product.module_num }}</td>
                        <td>{{ ckw_product.serial_num }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
              <b-tab title="SDA">
                <div class="table-responsive issueT issues-table">
                  <table class="table table-centered table-nowrap text-center">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Module Number</th>
                        <th>CMMF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="sda_product in sda_products"
                        :key="sda_product.id"
                      >
                        <td>{{ sda_product.name.en }}</td>
                        <td>{{ sda_product.brand.name }}</td>
                        <td>{{ sda_product.module_num }}</td>
                        <td>{{ sda_product.serial_num }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-tab>
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
                Branches Achievements & Targets
                <span class="float-right" style="font-size: 16px">
                  <NuxtLink to="branches" class="btn btnCancel">
                    See all Branches
                  </NuxtLink>
                </span>
              </h4>
            </div>
            <div class="table-responsive issues-table tableR mt-2 mb-0">
              <!-- <simplebar style="max-height: 351px"> -->
              <table class="table table-centered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Achievement</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="branch in branches" :key="branch.id">
                    <td>{{ branch.name.en }}</td>
                    <td>{{ branch.achievement }}</td>
                    <td>{{ branch.target }}</td>
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
  name: 'BranchProductSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'common-module-api/dashboard-data',
        {
          params: { branch_product_section: true, ...this.paramsFilter }
        }
      )
      this.branches = data.branch_product_section.branches
      this.ckw_products = data.branch_product_section.ckw_products
      this.sda_products = data.branch_product_section.sda_products
    } catch (e) {
      this.$toast.error('Error in fetching Branch Product section' + e)
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
