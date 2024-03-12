<template>
  <div class="col-xl-12">
    <div class="row">
      <div class="col-md-4 col-xl-2">
        <div class="newDropDown">
          <b-dropdown
            id="dropdown-form"
            ref="dropdown"
            class="mb-3 btn-block"
            :text="selectedDate"
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
              <b-button variant="primary" class="px-2" size="md" @click="submit"
              >Search
              </b-button>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
      <div class="col-md-8 col-xl-10 pt-2 text-right" v-if="selectedDate">
        <img src="~/assets/images/clock.svg" /> Date: {{ selectedDate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardFilter',
  data() {
    return {
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
        { label: 'Date Range', value: 'date_range' },
        { label: 'All Time', value: 'all_time' }
      ]
    }
  },
  computed: {
    isDateRangeSelected() {
      return this.selectedDateOption.value === 'date_range'
    },
    getSelectedDate() {
      switch (this.selectedDateOption.value) {
        case 'date_range':
          return `${this.dateFrom} : ${this.dateTo}`
        default:
          return this.selectedDateOption.label
      }
    }
  },
  methods: {
    submit() {
      const filterData = {
        date: this.selectedDateOption.value,
        from: this.dateFrom,
        to: this.dateTo
      }
      if (this.selectedDateOption.value !== 'date_range') {
        delete filterData.from
        delete filterData.to
      }
      this.selectedDate = this.getSelectedDate
      this.$root.$emit('filterDataEvent', filterData)
    }
  }
}
</script>

<style scoped>
.newDropDown .form-control-sm {
  height: 2.46rem;
}

.newDropDown ul {
  transform: translate3d(0px, 41px, 0px) !important;
}
</style>
