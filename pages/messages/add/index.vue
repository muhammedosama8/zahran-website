<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <client-only>
              <FormulateForm
                v-model="sendNewMessage"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_en"
                      type="text"
                      required
                      label="Message Title (EN) *"
                      validation="bail"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_ar"
                      type="text"
                      label="Message Title (AR)"
                      validation="bail"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="message_body_en"
                      type="textarea"
                      label="Message body (EN) *"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="message_body_ar"
                      type="textarea"
                      label="Message body (AR)"
                      validation="bail"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <client-only>
                      <!--     eslint-disable     -->
                      <FormulateInput
                        v-model="receiversValue"
                        type="dataDropdown"
                        name="receivers"
                        class="typeL"
                        validation="bail"
                        required
                        label="Select Receivers Demos *"
                        :customplaceholder="'Select receivers'"
                        :isMultiple="true"
                        :options="demosOptions"
                      />
                    </client-only>
                    <FormulateInput
                      v-model="isAllReceiversSelected"
                      class="remember-box labelC"
                      type="checkbox"
                      @change="fetchDemos"
                      label="select all"
                    />
                  </div>
                </div>
                <div class="row pb-4 newUpload">
                  <div class="col-md-6 pt-2">
                    <label>Attach images (Max: 5 images)</label>
                    <FormulateInput
                      type="group"
                      name="messageImages"
                      :repeatable="true"
                      add-label="+ Picture"
                      minimum="1"
                      limit="5"
                    >
                      <FormulateInput
                        type="image"
                        name="selectedFile"
                        validation="mime:image/jpeg,image/png,image/gif"
                      />
                    </FormulateInput>
                  </div>
                </div>
              </FormulateForm>
            </client-only>
          </div>
        </div>
        <div class="d-flex pt-3 justify-content-between">
          <button
            class="btn btnCancel newBtn"
            type="submit"
            @click="$refs.CancelModal.show()"
          >
            Cancel
          </button>
          <button class="btn btnSave px-3 newBtn" type="submit" :disabled="disabled" @click="sendDM">
            Send Message
          </button>
        </div>
      </div>
      <!--    Start Delete modal-->
      <b-modal
        id="CancelModal"
        ref="CancelModal"
        centered
        hide-footer
        title="Cancel Sending"
        title-class="h4 txtDark"
      >
        <p class="text-center py-3">
          Careful you've entered new data in this page, if you navigate away
          without saving first, all changes will be lost
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel"
            @click.prevent="$refs.CancelModal.hide()"
          >
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
            Cancel Sending
          </button>
        </div>
      </b-modal>
      <!--    End Delete modal-->
    </div>
  </div>
  <!-- end row -->
</template>

<script src="./send-new-message.js"></script>
<style scoped src="./send-new-message.scss" lang="scss"></style>
