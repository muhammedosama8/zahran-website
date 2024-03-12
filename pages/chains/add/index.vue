<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only>
              <FormulateForm
                v-model="chainFormValue"
                class="newFormulate newTask"
                @validation="validation = $event"
              >
                <b-row class="mb-4">
                  <b-col class="col-lg-3 col-md-6 col-12 newFormulate">
                    <FormulateInput
                      label="Chain Photo (Logo)"
                      name="selectedFile"
                      class="pb-4"
                      type="image"
                      validation="bail|mime:image/jpeg,image/png,image/gif"
                    />
                  </b-col>
                </b-row>
                <b-row class="pt-2">
                  <b-col class="col-md-6 col-sm-12 col-12">
                    <FormulateInput
                      name="chain_en"
                      type="text"
                      label="Chain Name (EN) *"
                      validation="bail|required|notNumeric"
                      validation-name="Chain Name (EN)"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-sm-12 col-12">
                    <FormulateInput
                      name="chain_ar"
                      type="text"
                      label="Chain Name (AR)"
                      validation="bail|notNumeric"
                      validation-name="Chain Name (AR)"
                    />
                  </b-col>
                </b-row>
                <FormulateInput
                  custom-help="Decide to activate or deactivete this chain"
                  custom-label="Status"
                  name="status"
                  type="switchInput"
                  value="true"
                />
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 row justify-content-center">
      <div class="col-12">
        <div class="card mb-4">
          <lazy-brands-select ref="brandsSelect" class="row newRow p-3" />
        </div>
      </div>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <button
        class="btn btnCancel"
        type="submit"
        @click="$refs.CancelModal.show()"
      >
        Cancel
      </button>
      <div class="d-flex align-items-center">
        <button
          class="btn btn-outline-primary px-3 mx-2"
          type="submit"
          @click="saveAndAdd"
        >
          Save and add branch
        </button>
        <button class="btn btnSave px-4" type="submit" @click="addChain">
          Add
        </button>
      </div>
    </div>
    <!--    Start Delete modal-->
    <b-modal
      id="CancelModal"
      ref="CancelModal"
      centered
      title="Cancel adding"
      title-class="h4 txtDark"
      hide-footer
    >
      <p class="py-3 text-center">
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
          Cancel Adding
        </button>
      </div>
    </b-modal>
  </div>
  <!-- end row -->
</template>
<script src="./add.js"></script>
<style lang="scss" src="./add.scss"></style>
