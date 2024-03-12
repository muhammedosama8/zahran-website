<template>
  <div>
    <h6
      v-if="breadcrumb.title && !breadcrumb.parent"
      class="pl-1 txtHead mt-2 pt-4"
    >
      {{ breadcrumb.title }}
    </h6>
    <div v-else-if="breadcrumb.title && breadcrumb.parent" class="d-flex">
      <h6 v-if="breadcrumb.parent.title" class="pl-1 txtHead mt-2 pt-4">
        {{ breadcrumb.parent.title }} /
      </h6>
      <h6 class="pl-1 txtHead mt-2 pt-4">{{ breadcrumb.title }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    breadcrumb() {
      return this.$store.getters['breadcrumb/breadcrumb']
    }
  }
}
</script>
