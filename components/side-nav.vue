<script>
/* eslint-disable */
  import simplebar from 'simplebar-vue'
  import MetisMenu from 'metismenujs/dist/metismenujs'
  import { menuItems } from '~/data/menu'

  export default {
    components: {
      simplebar
    },
    data() {
      return {
        menuItems
      }
    },
    mounted() {
      // eslint-disable-next-line no-unused-vars
      const menuRef = new MetisMenu('#side-menu')
    },
    methods: {
      /**
       * Returns true or false if given menu item has child or not
       * @param item menuItem
       */
      hasItems(item) {
        return item.subItems !== undefined ? item.subItems.length > 0 : false
      },
      hasPermission(route) {
        let userPermission = this.$store.getters['permission/permissions']
        if (Array.isArray(route)){
          return route.some(single_route => userPermission.includes(single_route))
        }else{
          return userPermission.includes(route)
        }
      }

    }
  }
</script>

<template>
  <div class="vertical-menu">
    <simplebar class="h-100">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul id="side-menu" class="metismenu list-unstyled pt-4">
          <template v-for="item in menuItems">
            <li :key="item.id" v-if="hasPermission(item.routeName)">
              <a
                v-if="hasItems(item)"
                href="javascript:void(0);"
                class="is-parent"
                :class="{
                  'has-arrow': !item.badge,
                  'has-dropdown': item.badge
                }"
              >
                <i v-if="item.icon" :class="`bx ${item.icon}`"></i>
                <span>{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                >{{ item.badge.text }}</span
                >
              </a>

              <nuxt-link
                v-if="!hasItems(item)"
                :to="{ name: item.route }"
                class="side-nav-link-ref"
              >
                <i v-if="item.icon" :class="`bx ${item.icon}`"></i>
                <span>{{ item.label }}</span>
              </nuxt-link>

              <ul v-if="hasItems(item)" class="sub-menu" aria-expanded="false">
                <li v-for="(subitem, index) of item.subItems" :key="index">
                  <nuxt-link
                    v-if="!hasItems(subitem) && hasPermission(subitem.routeName)"
                    :to="{ name: subitem.route }"
                    class="side-nav-link-ref"
                  >{{ subitem.label }}
                  </nuxt-link
                  >
                  <a
                    v-if="hasItems(subitem)"
                    class="side-nav-link-a-ref has-arrow"
                    href="javascript:void(0);"
                  >{{ subitem.label }}</a
                  >
                  <ul
                    v-if="hasItems(subitem)"
                    class="sub-menu mm-collapse"
                    aria-expanded="false"
                  >
                    <template v-for="(subSubitem, i) of subitem.subItems">
                      <li :key="i"  v-if="hasPermission(subitem.routeName)">
                        <router-link
                          :to="subSubitem.route"
                          class="side-nav-link-ref"
                        >{{ subSubitem.label }}
                        </router-link
                        >
                      </li>
                    </template>
                  </ul>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
      <!-- Sidebar -->
    </simplebar>
  </div>
</template>
