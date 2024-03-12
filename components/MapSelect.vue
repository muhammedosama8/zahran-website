<template>
  <div class="info-windows">
    <h6>Select Location</h6>
    <google-map id="map" ref="Map" :center="position" :zoom="zoom">
      <google-map-marker
        :draggable="true"
        :position="position"
        @mouseout="pinLocationChanged"
      ></google-map-marker>
    </google-map>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MapSelect',
  props: {
    pinLocation: {
      type: Object,
      default: () => ({ lat: 30.046789, lng: 31.236592 })
    }
  },
  data() {
    return {
      zoom: 12,
      currentPinLocation: { lat: 30.046789, lng: 31.236592 },
      position: { lat: 30.046789, lng: 31.236592 }
    }
  },
  mounted() {
    if (this.pinLocation.lat && this.pinLocation.lng) {
      this.currentPinLocation.lat = this.pinLocation.lat
      this.currentPinLocation.lng = this.pinLocation.lng
      this.position.lat = this.pinLocation.lat
      this.position.lng = this.pinLocation.lng
    }
  },
  methods: {
    pinLocationChanged(e) {
      if (!e.latLng && e.latLng.lat) {
        throw new Error('Pin change error!')
      }
      this.currentPinLocation.lat = e.latLng.lat()
      this.currentPinLocation.lng = e.latLng.lng()
    },
    getLatLng() {
      return this.currentPinLocation
    },
    setLatLng(latLng) {
      this.currentPinLocation = latLng
    }
  }
}
</script>

<style scoped>
.info-windows {
  height: 400px;
}
</style>
