<template>
  <div v-if="!$fetchState.pending" class="col-xl-12 pt-4 pb-1">
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar-xs mr-3">
                <span
                  class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                >
                  <i class="bx bx-copy-alt"></i>
                </span>
              </div>
              <h5 class="font-size-14 mb-0">
                <label >Reports</label>
              </h5>
            </div>
            <div class="text-muted mt-4">
              <h4>
                {{ data.report_count }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar-xs mr-3">
                <span
                  class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                >
                  <i class="bx bx-archive-in"></i>
                </span>
              </div>
              <h5 class="font-size-14 mb-0">
                <nuxt-link to="demos">Demos</nuxt-link>
              </h5>
            </div>
            <div class="text-muted mt-4">
              <h4>
                {{ data.demo_count }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="avatar-xs mr-3">
                <span
                  class="avatar-title rounded-circle bg-soft-primary text-primary font-size-18"
                >
                  <i class="bx bx-purchase-tag-alt"></i>
                </span>
              </div>
              <h5 class="font-size-14 mb-0">
                <nuxt-link to="tickets">Tickets</nuxt-link>
              </h5>
            </div>
            <div class="text-muted mt-4">
              <h4>
                {{ data.ticket_count }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<script>
export default {
  name: 'SecondSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get('common-module-api/dashboard-data', {
        params: { second_section: 1, ...this.paramsFilter }
      })
      this.data = data.second_section
    } catch (e) {
      this.$toast.error('Error in fetching second section')
    }
  },
  data() {
    return {
      data: {}
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

<style scoped></style>
