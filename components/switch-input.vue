<template>
  <div
    class="form-group row"
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <div class="col-10">
      <h6 aria-roledescription="label">{{ customLabel }}</h6>
      <p>{{ customHelp }}</p>
    </div>
    <div class="col-2">
      <b-form-checkbox
        v-model="context.model"
        :name="context.name"
        size="lg"
        variant="success"
        class="float-right"
        switch
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { BFormCheckbox } from 'bootstrap-vue'
export default {
  name: 'SwitchInput',
  components: { BFormCheckbox },
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    customHelp() {
      return this.context.attributes.customHelp
    },
    customLabel() {
      return this.context.attributes.customLabel
    }
  }
}
</script>

<style scoped></style>
