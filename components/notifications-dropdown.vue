<template>
  <b-dropdown
    menu-class="dropdown-menu-lg p-0"
    right
    toggle-class="header-item noti-icon"
    variant="black"
  >
    <template v-slot:button-content>
      <i class="bx bx-bell bx-tada"></i>
      <span class="badge badge-danger badge-pill"></span>
    </template>

    <div class="p-3">
      <div class="row align-items-center">
        <div class="col">
          <h6 class="m-0">{{ 'Notifications' }}</h6>
        </div>
        <div class="col-auto">
          <a class="small" href="#">{{ 'Mark all as read' }}</a>
        </div>
      </div>
    </div>
    <simplebar style="max-height: 230px">
      <a
        v-for="i in 4"
        :key="i"
        class="text-reset notification-item"
        href="javascript: void(0);"
      >
        <div class="media">
          <div class="avatar-xs mr-3">
            <span class="avatar-title bg-primary rounded-circle font-size-16">
              <i class="bx bx-cart"></i>
            </span>
          </div>
          <div class="media-body">
            <h6 class="mt-0 mb-1">
              {{ 'Someone did something' }}
            </h6>
            <div class="font-size-12 text-muted">
              <p class="mb-1">
                {{ 'The description of what this someone did' }}
              </p>
              <p class="mb-0">
                <i class="mdi mdi-clock-outline"></i>
                {{ '05:00' }}
              </p>
            </div>
          </div>
        </div>
      </a>
      <a
        v-for="i in 4"
        :key="i + 8"
        class="text-reset notification-item"
        href="javascript: void(0);"
      >
        <div class="media">
          <img
            alt="user-pic"
            class="mr-3 rounded-circle avatar-xs"
            src="@/assets/images/users/avatar-3.jpg"
          />
          <div class="media-body">
            <h6 class="mt-0 mb-1">
              {{ 'Someone did something' }}
            </h6>
            <div class="font-size-12 text-muted">
              <p class="mb-1">
                {{ 'The description of what this someone did' }}
              </p>
              <p class="mb-0">
                <i class="mdi mdi-clock-outline"></i>
                {{ '09:00' }}
              </p>
            </div>
          </div>
        </div>
      </a>
    </simplebar>
    <div class="p-2 border-top">
      <a
        class="btn btn-sm btn-light btn-block text-center"
        href="javascript:void(0)"
      >
        <i class="mdi mdi-arrow-down-circle mr-1"></i>
        {{ 'View all notifications' }}
      </a>
    </div>
  </b-dropdown>
</template>

<script>
/* eslint-disable */
export default {
  name: 'NotificationsDropdown',
  components: { simplebar: () => import('simplebar-vue') }
}
</script>
