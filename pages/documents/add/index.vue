<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <client-only>
              <FormulateForm
                v-model="addNewDocument"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_en"
                      type="text"
                      label="Document Title (EN) *"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_ar"
                      type="text"
                      label="Document Title (AR)"
                      validation="bail"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      label="Document *"
                      name="selectedFile"
                      class="pb-4 uploaded"
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-lg-6"></div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <client-only>
                      <!--     eslint-disable     -->
                      <!-- <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
                        <b-form-checkbox
                          id="checkbox-1"
                          v-model="receiversValue"
                          :aria-describedby="ariaDescribedby"
                          name="receivers"
                          :options="demosOptions"
                        >
                        </b-form-checkbox>
                      </b-form-group> -->
                      <FormulateInput
                        v-model="receiversValue"
                        type="dataDropdown"
                        name="receivers"
                        class="typeL"
                        validation="bail|required"
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
          <button class="btn btnSave px-3" type="submit" :disabled="disabled" @click="addDocument">
            Add 
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

<script src="./add-new-document.js"></script>
<style src="./add-new-document.scss" lang="scss"></style>
