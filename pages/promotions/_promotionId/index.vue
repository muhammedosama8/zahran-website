<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only v-if="!$fetchState.pending">
              <FormulateForm
                v-model="updatePromotionFormValue"
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
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="title_ar"
                      type="text"
                      label="Promotion Title (AR)"
                      validation="bail"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="description_en"
                      type="textarea"
                      label="Promotion Description (EN)"
                      validation="bail"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="description_ar"
                      type="textarea"
                      dir="rtl"
                      label="Promotion Description (AR)"
                      validation="bail"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="from_date"
                      type="date"
                      label="From *"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="to_date"
                      type="date"
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
                      min="1"
                      label="Promotion Value"
                      validation="matches:/^[0-9]*$/"
                      error-behavior="live"
                      :validation-messages="{ matches: 'Value must be a positive number.' }"
                    />
                  </div>
                </div>
                <!--     eslint-disable     -->
                <FormulateInput
                  :customplaceholder="'Select territory'"
                  customHelp="Decide to activate or deactivete this Promotion"
                  customLabel="Status"
                  name="status"
                  type="switchInput"
                  :value="promotion.status"
                />
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3 pb-4">
      <div class="col-12">
        <div class="card p-4">
          <h5>Assigned Chain/s</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <!--     eslint-disable     -->
                <FormulateInput
                  v-model="chainsValue"
                  type="dataDropdown"
                  name="chains"
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
                label="select all"
                @change="fetchChains"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col-12">
        <div class="card p-4">
          <h5>Assigned Branch/es</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <!--     eslint-disable     -->
                <FormulateInput
                  v-model="branchesValue"
                  type="dataDropdown"
                  name="branches"
                  validation="bail|required"
                  label="Branch/es *"
                  :customplaceholder="'Select branchse'"
                  :isMultiple="true"
                  :options="branchesOptions"
                  @input="changeSelectedBranches"
                />
              </client-only>
              <FormulateInput
                v-model="isAllBranchesSelected"
                class="remember-box labelC"
                type="checkbox"
                label="select all"
                @change="fetchBranches"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pt-3">
      <div class="col-12 px-4">
        <div class="card mb-4">
          <client-only>
            <!-- <brands-select
              v-if="selectedBranches && promotion.brand_ids"
              ref="brandsSelect"
              class="row newRow"
              :busy="$fetchState.pending"
              :force-select="promotion"
            /> -->
            <lazy-brands-select
              v-if="selectedBranches && promotion.brand_ids"
              :branch-id="selectedBranches"
              :key="selectedBranches"
              ref="brandsSelect"
              :force-select="promotion"
              :busy="$fetchState.pending"
              validation="required"
              class="row newRow"
          />
          </client-only>
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

          <button class="btn btnSave px-4" type="submit" @click="updatePromotion">
            Save
          </button>
        </div>
      </div>
      <!--    Start Cancel modal-->
      <b-modal
        id="CancelModal"
        ref="CancelModal"
        centered
        hide-footer
        title="Cancel updating"
        title-class="h4 txtDark"
      >
        <p class="text-center py-3">Careful you've entered new data in this page, if you navigate away without saving
          first, all changes will be lost</p>
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
            Cancel Updating
          </button>
        </div>
      </b-modal>
      <!--    End Cancel modal-->

      
      <!--  End Delete modal  -->
    </div>
  </div>
  <!-- end row -->
</template>
<script src="./edit.js"></script>
<style lang="scss" src="./edit.scss"></style>
