<template>
  <div class="container">
    <client-only v-if="!$fetchState.pending">
      <p class="text-muted">Sent on:{{ message.send_date }}</p>
      <h4 class="txtDark">{{ message.title.en }}</h4>
      <div class="row">
        <div class="col-md-8">
          <div class="card mt-3 p-4">
            <h5 class="txtDark">Message Content</h5>
            <p class="pt-2">
              {{ message.body.en }}
            </p>
            <div class="row">
              <div
                v-for="image in message.media"
                :key="image.id"
                class="col-md-4"
              >
                <b-img
                  :src="image.media_path"
                  class="messageImages mx-auto d-block"
                >
                </b-img>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mt-3 p-4 sdemo">
            <h5 class="txtDark">
              Selected demos ({{ message.receivers.length }})
            </h5>
            <b-media
              v-for="receiver in message.receivers"
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
      <button
        class="btn btnCancel newBtn"
        type="submit"
        @click="$refs.CancelModal.show()"
      >
        Cancel
      </button>
      <button
        class="btn btn-danger float-right"
        @click="showDeleteModal(message)"
      >
        Delete Message
      </button>
    </div>
    <!--  Start Delete modal  -->
    <b-modal
      id="deleteMessageModal"
      ref="deleteMessageModal"
      centered
      title="Delete Message"
      title-class="h2 txtDark"
      hide-footer
    >
      <p class="text-center py-2">
        Kindly note that this action can't be undone.
      </p>
      <div class="d-flex justify-content-between">
        <button
          class="btn btnCancel newBtn"
          @click.prevent="$refs.deleteMessageModal.hide()"
        >
          Cancel
        </button>
        <button
          class="btn btn-danger newBtn"
          type="submit"
          @click="deleteMessage"
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
<script src="./messageId.js"></script>
