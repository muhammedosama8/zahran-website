<template>
  <div class="col-xl-12 pt-3 pb-1">
    <div class="row">
      <!-- Completed Promotions -->
      <div class="col-xl-4 col-md-6">
        <div class="card">
          <div class="card-body p-4">
            <h4>Completed Promotions</h4>
            <!-- <simplebar class="simplebar"> -->
            <div class="table-responsive issues-table px-1 taskReport">
              <div
                v-for="completed_promo in completed"
                :key="completed_promo.id"
                class="row border-bottom"
              >
                <div class="col-md-6 pt-2 mt-1">
                  <div>
                    <h6>{{ completed_promo.title.en }}</h6>
                    <p>{{ completed_promo.promotion_type }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="text-right">
                    <div>
                      <b-avatar
                        v-for="brand in completed_promo.brands"
                        :key="brand.id"
                        variant="primary"
                        :src="brand.media"
                      ></b-avatar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- </simplebar> -->
          </div>
        </div>
      </div>
      <!-- Active Promotions -->
      <div class="col-xl-4 col-md-6">
        <simplebar class="simplebar">
          <div class="card">
            <div class="card-body p-4">
              <h4>Active Promotions</h4>
              <div class="table-responsive issues-table taskReport">
                <div
                  v-for="active_promo in active"
                  :key="active_promo.id"
                  class="row border-bottom"
                >
                  <div class="col-md-6 pt-2 mt-1">
                    <div>
                      <h6>{{ active_promo.title.en }}</h6>
                      <p>{{ active_promo.promotion_type }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-right">
                      <div>
                        <b-avatar
                          v-for="brand in active_promo.brands"
                          :key="brand.id"
                          variant="primary"
                          :src="brand.media"
                        ></b-avatar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </simplebar>
      </div>
      <!-- Upcoming Promotions -->
      <div class="col-xl-4 col-md-6">
        <simplebar class="simplebar">
          <div class="card">
            <div class="card-body p-4">
              <h4>Upcoming Promotions</h4>
              <div class="table-responsive issues-table taskReport">
                <div
                  v-for="upcoming_promo in upcoming"
                  :key="upcoming_promo.id"
                  class="row border-bottom"
                >
                  <div class="col-md-6 pt-2 mt-1">
                    <div>
                      <h6>{{ upcoming_promo.title.en }}</h6>
                      <p>{{ upcoming_promo.promotion_type }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-right">
                      <div>
                        <b-avatar
                          v-for="brand in upcoming_promo.brands"
                          :key="brand.id"
                          variant="primary"
                          :src="brand.media"
                        ></b-avatar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </simplebar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SixthSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'common-module-api/dashboard-data',
        {
          params: { six_section: true, ...this.paramsFilter }
        }
      )
      this.data = data.six_section
      this.completed = data.six_section.completed
      this.active = data.six_section.active
      this.upcoming = data.six_section.upcoming
    } catch (e) {
      this.$toast.error('Error in fetching sixth section' + e)
    }
  },
  data() {
    return {
      data: {},
      completed: [],
      active: [],
      upcoming: []
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
