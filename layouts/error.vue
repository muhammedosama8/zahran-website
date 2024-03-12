<template>
  <div class="nuxt-error">
    <component :is="errorPage" />
  </div>
</template>

<script>
import error404 from '~/components/error/404.vue'
import error403 from '~/components/error/403.vue'
import error500 from '~/components/error/500.vue'

export default {
  name: 'NuxtError',
  layout: 'default',
  computed: {
    errorPage() {
      if (this.$route.query.e == 404) return error404
      else if (this.$route.query.e == 403) return error403
      // catch everything else
      return error500
    }
  }
}
</script>
