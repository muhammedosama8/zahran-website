<template>
  <div class="container">
    <client-only v-if="!$fetchState.pending">
      <p class="text-muted">Upload Date : {{ document.date }}</p>
      <a class="btn btn-primary px-4 mb-3" download :href="document.path">
        <i class="fa fa-download fa-lg text-white pr-2"></i>
        Download Document
      </a>
      <h4 class="txtDark">{{ document.title.en }}</h4>
      <div class="row">
        <div class="col-md-12">
          <div class="card mt-3 p-4 sdemo">
            <h5 class="txtDark">
              Selected demos ({{ document.receivers.length }})
            </h5>
            <b-media
              v-for="receiver in document.receivers"
              :key="receiver.id"
              class="py-3 border-bottom"
            >
              <template v-slot:aside>
                <b-avatar
                  variant="primary"
                  :src="receiver.media_path"
                  :alt="receiver.name.en"
                  class="imgCircleFeed"
                ></b-avatar>
              </template>
              <h6 class="pt-2 font-weight-bold">{{ receiver.name.en }}</h6>
              <p class="mb-0 text-muted"># {{ receiver.id }}</p>
            </b-media>
          </div>
        </div>
      </div>
    </client-only>
    <div class="pt-3">
      <!-- <button
        class="btn btnCancel newBtn"
        type="submit"
        @click="$refs.CancelModal.show()"
      >
        Cancel
      </button> -->
      <button
        class="btn btnCancel newBtn"
        type="submit"
        @click="$router.go(-1)"
      >
        Cancel
      </button>
      <button
        class="btn btnSave float-right"
        @click="showDeleteModal(document)"
      >
        Delete Document
      </button>
    </div>
    <!--  Start Delete modal  -->
    <b-modal
      id="deleteDocumentModal"
      ref="deleteDocumentModal"
      centered
      title="Delete Document"
      title-class="h2 txtDark"
      hide-footer
    >
      <p class="text-center py-2">
        Kindly note that this action can't be undone.
      </p>
      <div class="d-flex justify-content-between">
        <button
          class="btn btnCancel newBtn"
          @click.prevent="$refs.deleteDocumentModal.hide()"
        >
          Cancel
        </button>
        <button
          class="btn btn-danger newBtn"
          type="submit"
          @click="deleteDocument"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <!--  End Delete modal  -->
    <!--    Start Delete modal-->
    <b-modal
      id="CancelModal"
      ref="CancelModal"
      centered
      hide-footer
      title="Cancel Viewing"
      title-class="h4 txtDark"
    >
      <p class="text-center py-3">
        Careful you've entered new data in this page, if you navigate away
        without saving first, all changes will be lost
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
          Cancel Viewing
        </button>
      </div>
    </b-modal>
    <!--    End Delete modal-->
  </div>
</template>
<script src="./documentId.js"></script>
