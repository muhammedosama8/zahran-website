<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body pb-5">
            <h5 class="card-title">Basic Details</h5>
            <FormulateForm
              v-model="branchFormValue"
              class="newFormulate newTask"
              @validation="validation = $event"
            >
              <b-row class="pt-2">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="branch_en"
                    type="text"
                    validation="bail|required|notNumeric"
                    label="Branch Name (EN) *"
                    validation-name="Branch Name (EN)"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="branch_ar"
                    type="text"
                    validation="bail|notNumeric"
                    label="Branch Name (AR)"
                  />
                </b-col>
              </b-row>
              <b-row class="pt-2">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="address_en"
                    type="text"
                    validation="bail|required|notNumeric"
                    label="Branch Address (EN) *"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="address_ar"
                    type="text"
                    validation="bail|notNumeric"
                    label="Branch Address (AR) "
                  />
                </b-col>
              </b-row>
              <!--     eslint-disable     -->
              <b-row class="pt-1">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :customplaceholder="`Select a Region...`"
                    :options="regionOptions"
                    label="Region"
                    name="region"
                    type="dataDropdown"
                    class="typeL"
                    @input="fetchCities"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :customplaceholder="`Select a City...`"
                    :options="cityOptions"
                    label="City *"
                    name="city"
                    type="dataDropdown"
                    class="typeL"
                    validation="bail|required"
                    @input="fetchAreas"
                  />
                </b-col>
              </b-row>

              <!--     eslint-disable     -->
              <b-row class="pt-1">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :customplaceholder="`Select a Area...`"
                    :options="areaOptions"
                    label="Area *"
                    name="area"
                    type="dataDropdown"
                    class="typeL"
                    validation="bail|required"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :customplaceholder="`Select a Chain...`"
                    :options="chainOptions"
                    label="Chain *"
                    name="chain"
                    type="dataDropdown"
                    class="typeL"
                    validation="bail|required"
                    @input="fetchBrands"
                  />
                </b-col>
              </b-row>
              <b-row>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :isMultiple="true"
                    :customplaceholder="`Select Brands...`"
                    :options="brandOptions"
                    label="Brand *"
                    name="brand"
                    type="dataDropdown"
                    class="typeL"
                    validation="bail|required"
                    @input="fetchProducts"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    :isMultiple="true"
                    :customplaceholder="`Select Products...`"
                    :options="productOptions"
                    label="Products *"
                    name="product"
                    type="dataDropdown"
                    class="typeL styleSelect mb-2"
                    validation="bail|required"
                    v-model="productsValue"
                  />
                  <b-form-checkbox
                    v-model="selectAllProducts"
                    class="ml-3 py-2 newCheck"
                    @change="toggleSelectAllProducts()"
                    >Select All products
                  </b-form-checkbox>
                </b-col>
              </b-row>

              <div class="row">
                <div class="col-md-4 pt-4">
                  <!-- eslint-disable -->
                  <FormulateInput
                    customHelp="Decide to show the map or not"
                    customLabel="Show Map"
                    :customplaceholder="'Show Map'"
                    name="show_map"
                    type="switchInput"
                    value="false"
                    v-model="showMap"
                  />
                </div>
              </div>

              <b-row v-show="!showMap">
                <b-col class="col-md-6 col-12">
                  <FormulateInput name="lat_txt" type="text" label="Latitude" />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="lang_txt"
                    type="text"
                    label="Longitude"
                  />
                </b-col>
              </b-row>

              <lazy-map-select v-show="showMap" ref="mapSelect" />
              <br />
              <div class="row">
                <div class="col-md-4 pt-4">
                  <!-- eslint-disable -->
                  <FormulateInput
                    customHelp="Decide to activate or deactivete this Branch"
                    customLabel="Status"
                    :customplaceholder="'Status'"
                    name="status"
                    type="switchInput"
                    value="true"
                  />
                </div>
              </div>
            </FormulateForm>
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
        <button class="btn btnSave px-4" type="submit" @click="addNewBranch">
          Save
        </button>
      </div>
    </div>
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
