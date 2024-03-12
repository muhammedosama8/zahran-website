<template>
  <b-modal
    id="CancelModal"
    ref="CancelModal"
    centered
    title="Cancel editing"
    title-class="h4 txtDark"
    hide-footer
  >
    <p class="py-3 text-center">
      Careful you've entered new data in this page, if you navigate away without
      saving first, all changes will be lost
    </p>
    <div class="d-flex justify-content-between">
      <button class="btn btnCancel" @click.prevent="$refs.CancelModal.hide()">
        Keep Changes
      </button>
      <button
        class="btn cancelAdd"
        type="submit"
        @click="
          $refs.CancelModal.hide()
          $router.go(-1)
        "
      >
        Cancel Editing
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'CancelEditModal'
}
</script>

<style scoped></style>
