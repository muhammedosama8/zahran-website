<template>
  <div
    class="form-group"
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <multiselect
      v-model="context.model"
      :options="options"
      :custom-label="customLabel"
      :placeholder="customPlaceholder"
      :allow-empty="isMultiple"
      :multiple="isMultiple"
      track-by="value"
      @input="emitChange"
    ></multiselect>
  </div>
</template>

<script>
/* eslint-disable */
import Multiselect from 'vue-multiselect'

export default {
  name: 'DataDropdown',
  components: { Multiselect },
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    options() {
      return this.context.options
    },
    customPlaceholder() {
      return this.context.attributes.customplaceholder
    },
    isMultiple() {
      return Boolean(this.context.attributes.isMultiple)
    }
  },
  methods: {
    customLabel({ label }) {
      return `${label}`
    },
    emitChange(e) {
      if (e && e.value) {
        this.context.rootEmit('selected', String(e.value))
      }
    }
  }
}
</script>

<style scoped></style>
