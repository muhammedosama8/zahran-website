<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4">
            <div class="media">
              <div class="mr-3">
                <b-avatar
                  style="width: 3em; height: 3em"
                  class="avatar-sm rounded-circle img-thumbnail"
                  variant="primary"
                ></b-avatar>
              </div>
              <div class="media-body align-self-center">
                <div class="text-muted">
                  <p class="mb-2">welcome back</p>
                  <h5 class="mb-1">{{ $auth.user.data.name }}</h5>
                  <p class="mb-0">{{ $auth.user.data.role_name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 align-self-center">
            <div class="text-lg-center mt-4 mt-lg-0">
              <div class="row justify-content-around">
                <div class="col-xl-2 col-md-4 col-6">
                  <div>
                    <h2 class="mb-0 font-weight-bold">
                      {{ data.chain_count }}
                    </h2>
                    <p class="text-muted text-truncate mb-2">Chains</p>
                  </div>
                </div>
                <div class="col-xl-2 col-md-4 col-6">
                  <div>
                    <h2 class="mb-0 font-weight-bold">
                      {{ data.branch_count }}
                    </h2>
                    <p class="text-muted text-truncate mb-2">Branches</p>
                  </div>
                </div>
                <div class="col-xl-2 col-md-4 col-6">
                  <div>
                    <h2 class="mb-0 font-weight-bold">
                      {{ data.demo_count }}
                    </h2>
                    <p class="text-muted text-truncate mb-2">Demos</p>
                  </div>
                </div>
                <div class="col-xl-2 col-md-4 col-6">
                  <div>
                    <h2 class="mb-0 font-weight-bold">
                      {{ data.city_count }}
                    </h2>
                    <p class="text-muted text-truncate mb-2">Cites</p>
                  </div>
                </div>
                <div class="col-xl-2 col-md-4 col-6">
                  <div>
                    <h2 class="mb-0 font-weight-bold">
                      {{ data.product_count }}
                    </h2>
                    <p class="text-muted text-truncate mb-2">Products</p>
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
</template>

<script>
export default {
  name: 'FirstSection',
  async fetch() {
    try {
      const { data } = await this.$axios.$get('common-module-api/dashboard-data', {
        params: { first_section: 1, ...this.paramsFilter }
      })
      this.data = data.first_section
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
