<template>
  <div
    id="layout-wrapper"
    :class="{ 'sidebar-enable vertical-collpsed': isMenuClosed }"
  >
    <NavBar @toggle-menu="toggleMenu" />
    <SideNav />
    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-fluid px-0">
          <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: ['auth', 'permission', 'isUserRoleActive'],
  middleware: ['auth', 'permission'],
  data() {
    return {
      isMenuClosed: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuClosed = !this.isMenuClosed
    }
  }
}
</script>
