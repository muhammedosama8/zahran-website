<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <FormulateForm
              v-model="demoFormValue"
              autocomplete="false"
              class="newFormulate newTask"
              @validation="validation = $event"
            >
              <b-row class="mb-4">
                <b-col class="col-lg-3 col-md-6 col-12 newFormulate">
                  <FormulateInput
                    label="Demo Photo (Logo)"
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
                    name="demo_en"
                    type="text"
                    required
                    validation="bail|required|notNumeric"
                    label="Demo Name (EN) *"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="demo_ar"
                    type="text"
                    validation="bail|notNumeric"
                    label="Demo Name (AR)"
                  />
                </b-col>
              </b-row>
              <b-row class="pt-2">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="phone"
                    validation="bail|required"
                    type="text"
                    autocomplete="false"
                    label="Phone Number *"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                    name="password"
                    type="password"
                    validation="bail|required"
                    label="Password *"
                    autocomplete="false"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                      name="sab_number"
                      type="text"
                      placeholder="Number between 3 and 7 digits"
                      validation="bail|required"
                      label="Sab Number *"
                  />
                </b-col>
              </b-row>
              <!--     eslint-disable     -->
              <b-row class="pt-1">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                      :isMultiple="true"
                      :customplaceholder="`Select a Region...`"
                      :options="regionOptions"
                      label="Region *"
                      validation="bail|required"
                      name="region"
                      type="dataDropdown"
                      class="typeL"
                      @input="fetchCities"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                      :isMultiple="true"
                      :customplaceholder="`Select a City...`"
                      :options="cityOptions"
                      label="City *"
                      validation="bail|required"
                      name="city"
                      type="dataDropdown"
                      class="typeL"
                      @input="fetchAreas"
                  />
                </b-col>
              </b-row>
              <b-row class="pt-1">
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                      :isMultiple="true"
                      :customplaceholder="`Select a Area...`"
                      :options="areaOptions"
                      label="Area *"
                      validation="bail|required"
                      name="area"
                      type="dataDropdown"
                      class="typeL"
                      @input="fetchBranches"
                  />
                </b-col>
                <b-col class="col-md-6 col-12">
                   <FormulateInput
                      type="dataDropdown"
                      class="typeL"
                      name="chains"
                      v-model="chainsValue"
                      validation="bail|required"
                      label="Chain/s *"
                      required
                      :customplaceholder="'Select chains'"
                      :isMultiple="true"
                      :options="chainsOptions"
                      @input="fetchBranches"
                    />
                </b-col>
                <b-col class="col-md-6 col-12">
                  <FormulateInput
                      :isMultiple="true"
                      :customplaceholder="`Select a Branch...`"
                      :options="branchOptions"
                      label="Branch *"
                      validation="bail|required"
                      name="branch"
                      type="dataDropdown"
                      class="typeL"
                  />
                </b-col>
              </b-row>
              <FormulateInput
                  custom-help="Decide to activate or deactivete this demo"
                  custom-label="Status"
                  name="status"
                  type="switchInput"
                  value="true"
              />
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
        <button class="btn btnSave px-4" type="submit" @click="addNewDemo">
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
