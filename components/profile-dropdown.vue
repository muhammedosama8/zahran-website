<template>
  <b-dropdown right toggle-class="header-item" variant="black">
    <template v-slot:button-content>
      <img
        alt="Header Avatar"
        class="rounded-circle header-profile-user"
        :src="
          $auth.user.data.media_path
            ? $auth.user.data.media_path
            : '@/assets/images/users/avatar-1.jpg'
        "
      />
      <span class="d-none d-xl-inline-block ml-1">{{
        $auth.user.data.name
      }}</span>
      <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
    </template>
    <!-- item-->
    <b-dropdown-item>
      <router-link tag="span" to="/settings/profile">
        <i class="bx bx-user font-size-16 align-middle mr-1"></i>
        Profile
      </router-link>
    </b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <button class="dropdown-item text-danger" @click.prevent="logout">
      <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
      Logout
    </button>
  </b-dropdown>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ProfileDropdown',
  methods: {
    logout() {
      document.cookie.split(';').forEach(function (c) {
        if (c.includes('auth.')) {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
        }
      })
      location.reload()
    }
  }
}
</script>
