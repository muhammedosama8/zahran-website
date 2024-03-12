<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title py-2">Basic Details</h5>
            <client-only>
              <FormulateForm
                v-model="addNewPromotionFormValue"
                class="newTask"
                @validation="validation = $event"
              >
                <b-row class="mb-4">
                  <b-col class="col-lg-3 col-md-6 col-12 newFormulate">
                    <FormulateInput
                      label="Promotion Cover"
                      name="selectedFile"
                      class="pb-4"
                      type="image"
                      validation="bail|mime:image/jpeg,image/png,image/gif"
                    />
                  </b-col>
                </b-row>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_en"
                      type="text"
                      label="Promotion Title (EN) *"
                      required
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_ar"
                      type="text"
                      label="Promotion Title (AR) "
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="description_en"
                      type="textarea"
                      label="Promotion Description (EN)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="description_ar"
                      type="textarea"
                      dir="rtl"
                      label="Promotion Description (AR)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="from_date"
                      type="date"
                      label="From *"
                      required
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="to_date"
                      type="date"
                      required
                      label="To *"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 py-2">
                    <FormulateInput
                      type="dataDropdown"
                      class="typeL"
                      name="promotion_type"
                      label="Promotion type"
                      :options="promotionTypesOptions"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="value"
                      type="number"
                      label="Promotion Value"
                      min="1"
                      validation="matches:/^[0-9]*$/"
                      error-behavior="live"
                      :validation-messages="{ matches: 'Value must be a positive number.' }"
                    />
                  </div>
                </div>
                <!-- eslint-disable -->
                <FormulateInput
                  :customplaceholder="'Select territory'"
                  customHelp="Decide to activate or deactivete this Promotion"
                  customLabel="Status"
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
    <div class="row pb-4">
      <div class="col-12 pt-4">
        <div class="card p-4">
          <h5>Assigned Chain/s</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <FormulateInput
                  type="dataDropdown"
                  name="chains"
                  v-model="chainsValue"
                  validation="bail|required"
                  label="Chain/s *"
                  :customplaceholder="'Select chains'"
                  :isMultiple="true"
                  :options="chainsOptions"
                  @input="fetchBranches"
                />
              </client-only>
              <FormulateInput
                v-model="isAllChainsSelected"
                class="remember-box labelC"
                type="checkbox"
                @change="fetchChains"
                label="select all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col-12">
        <div class="card p-4">
          <h5>Assigned Branch/es *</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <FormulateInput
                  type="dataDropdown"
                  name="branches"
                  v-model="branchesValue"
                  validation="bail|required"
                  label="Branch/es *"
                  :customplaceholder="'Select branch'"
                  :isMultiple="true"
                  :options="branchesOptions"
                  @input="changeSelectedBranches"
                />
              </client-only>
              <FormulateInput
                v-model="isAllBranchesSelected"
                class="remember-box labelC"
                type="checkbox"
                @change="fetchBranches"
                label="select all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 px-4">
        <div class="card mb-4">
          <lazy-brands-select
            v-if="selectedBranches"
            :branch-id="selectedBranches"
            :key="selectedBranches"
            ref="brandsBranchSelect"
            :force-select="forceSelectBrands"
            required
            class="row newRow"
          />
        </div>
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex w-100 justify-content-between">
          <button
            class="btn btnCancel"
            type="submit"
            @click="$refs.CancelModal.show()"
          >
            Cancel
          </button>

          <button class="btn btnSave px-4" type="submit" @click="addTask">
            Save
          </button>
        </div>
      </div>
      <!--    Start Delete modal-->
      <b-modal
        centered
        hide-footer
        id="CancelModal"
        ref="CancelModal"
        title="Cancel Adding"
        title-class="h4 txtDark"
      >
        <p class="text-center py-3">Careful you've entered new data in this page, if you navigate away without saving
          first, all changes will be lost</p>
        <div class="d-flex justify-content-between">
          <button @click.prevent="$refs.CancelModal.hide()" class="btn btnCancel">
            Keep Changes
          </button>
          <button
            @click="
            $refs.CancelModal.hide()
            $router.go(-1)
          "
            class="btn cancelAdd"
            type="submit"
          >
            Cancel Adding
          </button>
        </div>
      </b-modal>
      <!--    End Delete modal-->
    </div>
  </div>
  <!-- end row -->
</template>
<script src="./add.js"></script>
<style lang="scss" src="./add.scss"></style>
