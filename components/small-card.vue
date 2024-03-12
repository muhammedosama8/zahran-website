<template>
  <nuxt-link
    :to="{ name: routeName }"
    class="card secondary mini-stats-wid shadow flex-fill"
  >
    <div class="card-body">
      <div class="mb-2 align-self-center">
        <slot></slot>
      </div>
      <div class="media-body">
        <h4 class="txtDark font-weight-bold py-2">{{ title }}</h4>
        <p class="mb-0 font-size-16 text-secondary">
          {{ description }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    routeName: {
      type: [String, URL],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 32px;
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    transform: translateY(-1px);
  }
}
</style>
