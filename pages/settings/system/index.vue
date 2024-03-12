<template>
  <b-row v-if="hasPermission('system.view')">
    <b-col
      v-for="item in items"
      :key="item.title"
      class="d-flex col-lg-4 col-md-6 col-sm-6 col-12"
    >
      <LazySmallCard
        :title="item.title"
        :description="item.description"
        :route-name="item.route"
      >
        <!-- Name of assets -->
        <img
          :src="require(`~/assets/images/${item.icon}.svg`)"
          alt
          class="img-fluid imgBg"
        />
      </LazySmallCard>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Regions',
          icon: 'regions',
          description: 'All regions covered to define branches in each ٌegions.',
          route: 'settings-system-regions'
        },
        {
          title: 'Cities',
          icon: 'cities',
          description: 'All cities covered to define branches in each city.',
          route: 'settings-system-cities'
        },
        {
          title: 'Areas',
          icon: 'teritories',
          description: 'Listing for all areas.',
          route: 'settings-system-areas'
        },
        {
          title: 'Categories',
          icon: 'teritories',
          description: 'Listing for all Categories .',
          route: 'settings-system-groups'
        },
        {
          title: 'Task Types',
          icon: 'tasks',
          description: 'Listing for all task types.',
          route: 'settings-system-task-types'
        },
        {
          title: 'Ticket Types',
          icon: 'tickets',
          description: 'Listing for all ticket types.',
          route: 'settings-system-ticket-types'
        }
      ]
    }
  },
  activated() {
    this.$store.dispatch('breadcrumb/update', { title: 'System settings' })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    hasPermission(route) {
      const userPermission = this.$store.getters['permission/permissions']
      return userPermission.includes(route)
    }
  }
}
</script>
<style scoped>
.imgBg {
  background-color: rgba(73, 80, 87, 0.15);
  border-radius: 50%;
  padding: 0.5rem;
}
</style>
