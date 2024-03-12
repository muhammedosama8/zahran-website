<template>
  <div>
    <h4>{{ customPlaceholder }}</h4>
    <b-badge
      v-for="day in days"
      :key="day.name"
      :variant="day.selected ? 'primary' : 'light'"
      class="cursor-pointer px-4 py-2 m-2"
      @click="toggleDay(day)"
    >
      {{ day.name }}
    </b-badge>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'RecurringDaysSelect',
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      days: [
        { selected: false, name: 'Saturday' },
        { selected: false, name: 'Sunday' },
        { selected: false, name: 'Monday' },
        { selected: false, name: 'Tuesday' },
        { selected: false, name: 'Wednesday' },
        { selected: false, name: 'Thursday' },
        { selected: false, name: 'Friday' }
      ]
    }
  },
  computed: {
    selectedDays() {
      return this.days.filter(({ selected }) => selected)
    },
    customPlaceholder() {
      return this.context.attributes.customplaceholder
    }
  },
  watch: {
    selectedDays(newDays) {
      this.context.model = newDays
    }
  },
  mounted() {
    const items = this.context.attributes['force-select']
    if (items) {
      this.days.forEach((day) => {
        day.selected = items.includes(day.name)
      })
    }
  },
  methods: {
    toggleDay(day) {
      day.selected = !day.selected
    }
  }
}
</script>

<style scoped></style>
