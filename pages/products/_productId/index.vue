<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only v-if="!$fetchState.pending">
              <FormulateForm
                v-model="productFormValue"
                class="newFormulate newTask"
                @validation="validation = $event"
              >
                <b-row class="mb-4">
                  <b-col class="col-lg-3 col-md-6 col-12 newFormulate">
                    <FormulateInput
                      label="Product Photo (Logo)"
                      name="selectedFile"
                      class="pb-4"
                      type="image"
                      validation="bail|mime:image/jpeg,image/png,image/gif"
                    />
                  </b-col>
                </b-row>
                <b-row class="pt-2">
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      name="product_en"
                      type="text"
                      validation="bail|required|notNumeric"
                      label="Product Name (EN) *"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      name="product_ar"
                      type="text"
                      validation="bail|notNumeric"
                      label="Product Name (AR)"
                    />
                  </b-col>
                </b-row>
                <b-row class="pt-1">
                  <b-col class="col-md-6">
                    <FormulateInput
                      name="module_num"
                      type="text"
                      validation="bail|required"
                      validation-name="Module Number"
                      label="Module Number *"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      name="serial_num"
                      type="text"
                      validation="bail|required"
                      validation-name="CMMF"
                      label="CMMF *"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-12">
                   <FormulateInput
                    name="barcode"
                    type="text"
                    validation="bail|required"
                    validation-name="Barcode"
                    label="Barcode *"
                  />
                  </b-col>
                </b-row>
                <b-row class="pt-1">
                  <b-col class="col-md-6">
                    <FormulateInput
                      name="price"
                      type="text"
                      validation="bail|required"
                      label="Price *"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      :customplaceholder="`Select a Brand...`"
                      :options="brandOptions"
                      label="Brand"
                      name="brand"
                      type="dataDropdown"
                      class="typeL"
                      validation="bail|required"
                    />
                  </b-col>
                </b-row>
                <FormulateInput
                  custom-help="Decide to activate or deactivete this product"
                  custom-label="Status"
                  name="status"
                  type="switchInput"
                />
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex w-100 justify-content-between pt-4">
      <button
        class="btn btnCancel"
        type="submit"
        @click="$refs.CancelModal.show()"
      >
        Cancel
      </button>
      <div class="d-flex align-items-center">
        <button class="btn btnSave px-4" type="submit" @click="updateProduct">
          Save
        </button>
      </div>
    </div>
    <b-modal
      id="CancelModal"
      ref="CancelModal"
      centered
      title="Cancel editing"
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
          Cancel Editing
        </button>
      </div>
    </b-modal>
  </div>
  <!-- end row -->
</template>
<script src="./edit.js"></script>
<style lang="scss" src="./edit.scss"></style>
