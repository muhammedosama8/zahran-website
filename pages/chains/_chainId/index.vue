<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only v-if="!$fetchState.pending">
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
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      name="chain_en"
                      type="text"
                      label="Chain Name (EN) *"
                    />
                  </b-col>
                  <b-col class="col-md-6 col-12">
                    <FormulateInput
                      name="chain_ar"
                      type="text"
                      label="Chain Name (AR)"
                    />
                  </b-col>
                </b-row>
                <FormulateInput
                  custom-help="Decide to activate or deactivete this chain"
                  custom-label="Status"
                  name="status"
                  type="switchInput"
                  :value="chain.status"
                />
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 row justify-content-center">
      <div class="col-12">
        <div class="card p-3 mb-4">
          <client-only>
            <brands-select
              v-if="chain && chain.brand_ids"
              ref="brandsSelect"
              class="row newRow"
              validation="bail|required"
              :busy="$fetchState.pending"
              :force-select="chain"
            />
          </client-only>
        </div>
      </div>
    </div>
    <div class="p-1 row justify-conbrandSubBrandstent-center">
      <div class="col-12">
        <div class="card mb-4">
          <h3 class="pt-4 pl-4">Branches</h3>
          <div class="card-body justify-content-between">
            <b-table :fields="branchesTable" :items="branches" responsive="lg">
              <template v-slot:cell(status)="data">
                <b-avatar
                  :text="data.item.status ? 'Active' : 'Deactive'"
                  :variant="data.item.status ? 'success' : 'danger'"
                  class="mr-3 align-baseline borderRadius w-100"
                ></b-avatar>
              </template>
              <template
                v-if="
                  hasPermission('branches.edit') ||
                  hasPermission('branches.delete')
                "
                v-slot:cell(actions)="data"
              >
                <b-dropdown
                  class="card-drop w-100"
                  right
                  toggle-class="p-0"
                  variant="white"
                >
                  <template v-slot:button-content>
                    <i class="mdi mdi-dots-horizontal font-size-18"></i>
                  </template>

                  <b-dropdown-item
                    v-if="hasPermission('branches.edit')"
                    @click="toggleStatus(data.item)"
                  >
                    <i class="fas fa-edit-alt mr-1"></i>
                    Activate/De-activate
                  </b-dropdown-item>

                  <b-dropdown-item
                    v-if="hasPermission('branches.edit')"
                    tag="nuxt-link"
                    :to="{
                      name: 'branches-branchId',
                      params: { branchId: data.item.id }
                    }"
                  >
                    <i class="fas fa-pencil-alt text-success mr-1"></i>
                    Edit
                  </b-dropdown-item>

                  <b-dropdown-item
                    v-if="hasPermission('branches.delete')"
                    @click="showDeleteBranchModal(data.item)"
                  >
                    <i class="fas fa-trash-alt text-danger mr-1"></i>
                    Delete
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </b-table>
            <nuxt-link
              class="mb-2 btn btn-primary text-d-block primary btn-dashed w-100"
              :to="{
                name: 'branches-add',
                query: {
                  chainId: chain.id,
                  chainName: chain_name_en
                }
              }"
              variant="outline-primary"
              >+ Add New Branch
            </nuxt-link>
          </div>
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

      <button class="btn btnSave px-4" type="submit" @click="updateChain">
        Save
      </button>
    </div>

    <b-modal
      id="deletebranchModal"
      ref="deletebranchModal"
      centered
      title="Delete branch"
      title-class="h2 txtDark"
      hide-footer
    >
      <p class="text-center p-3">
        Kindly note that this action can't be undone and the branch details will
        get deleted.
      </p>
      <div class="d-flex justify-content-between">
        <button
          class="btn btnCancel newBtn"
          @click.prevent="$refs.deletebranchModal.hide()"
        >
          Cancel
        </button>
        <button
          class="btn btn-danger newBtn"
          type="submit"
          @click="deleteBranch"
        >
          Delete branch
        </button>
      </div>
    </b-modal>

    <!--    Start Delete modal-->
    <b-modal
      id="CancelModal"
      ref="CancelModal"
      centered
      title="Cancel Updating"
      title-class="h4 txtDark"
      hide-footer
    >
      <p class="text-center p-3">
        Kindly note that this action can't be undone and the chain's details
        with all its linked data; like the branches and their visits will get
        deleted.
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
          Cancel Updating
        </button>
      </div>
    </b-modal>
    <!--    End Delete modal-->
  </div>
  <!-- end row -->
</template>
<script src="./edit.js"></script>
<style lang="scss" src="./edit.scss"></style>
