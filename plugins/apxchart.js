import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import simplebar from 'simplebar-vue'
Vue.use(VueApexCharts)
Vue.use(simplebar)
Vue.component('apexchart', VueApexCharts)
Vue.component('simplebar', simplebar)
