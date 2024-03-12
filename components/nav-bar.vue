<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <nuxt-link
            exact-active-class="none"
            class="logo logo-light mt-3"
            tag="a"
            to="/"
          >
            <span class="logo-sm">
              <img alt class="logoSm" src="~assets/images/logo.png" />
            </span>
            <span class="logo-lg">
              <img
                alt
                class="img-fluid d-block"
                src="~assets/images/logo.png"
              />
            </span>
          </nuxt-link>
        </div>
        <button
          id="vertical-menu-btn"
          style="height: 90px"
          class="btn btn-sm px-3 font-size-16 header-item"
          type="button"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
        <client-only>
          <lazy-breadcrumb />
        </client-only>
      </div>

      <div class="d-flex">
        <!-- <lazy-notifications-dropdown /> -->
        <lazy-profile-dropdown />
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    toggleMenu() {
      this.$emit('toggle-menu')
    }
  }
}
</script>
