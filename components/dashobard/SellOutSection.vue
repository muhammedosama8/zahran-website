<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 mt-4">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 align-self-center">
                <div class="text-lg-center mt-4 mt-lg-0">
                  <div class="row justify-content-around">
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.allYearTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">Year Total</p>
                      </div>
                    </div>
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.CKWYearTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">
                          CKW Year Total
                        </p>
                      </div>
                    </div>
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.SDAYearTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">
                          SDA Year Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
      </div>

      <div class="col-lg-6 mt-4">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 align-self-center">
                <div class="text-lg-center mt-4 mt-lg-0">
                  <div class="row justify-content-around">
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.allMonthTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">Month Total</p>
                      </div>
                    </div>
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.CKWMonthTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">
                          CKW Month Total
                        </p>
                      </div>
                    </div>
                    <div class="col-xl-4 col-md-4 col-6">
                      <div>
                        <h2 class="mb-0 font-weight-bold">
                          {{ data.SDAMonthTotal }}
                        </h2>
                        <p class="text-muted text-truncate mb-2">
                          SDA Month Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellOutSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'common-module-api/dashboard-data',
        {
          params: { sell_out_section: 1, ...this.paramsFilter }
        }
      )
      this.data = data.sell_out_section
    } catch (e) {
      this.$toast.error('Error in fetching first section')
    }
  },
  data() {
    return {
      data: {},
      paramsFilter: {}
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
