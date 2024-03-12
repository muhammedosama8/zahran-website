<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2 justify-content-between">
        <div class="col-lg-4 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span class="input-group-text">
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="filtering.searchTerm"
                debounce="500"
                type="search"
                placeholder=" Search for Region"
                class="inputSearch"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-button
            v-if="hasPermission('system.add')"
            v-b-modal.createRegionModal
            variant="primary"
            class="mb-2 btnAdd"
          >
            <i class="fa fa-plus pr-2"></i> Add New Region
          </b-button>
        </div>
        <!-- End search -->
      </div>
      <!-- Table -->
      <div class="table-responsive bg-white mb-3">
        <b-table
          :fields="fields"
          :busy="$fetchState.pending"
          :items="regions"
          responsive="lg"
          :per-page="0"
          empty-text="No matching regions created yet"
          :show-empty="true"
          class="px-4 pb-2"
        >
          <template
            v-if="
              hasPermission('system.edit') || hasPermission('system.delete')
            "
            v-slot:cell(actions)="data"
          >
            <b-dropdown
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item
                v-if="hasPermission('system.edit')"
                @click="showUpdateModal(data.item)"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('system.delete')"
                @click="showDeleteModal(data.item)"
              >
                <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          Rows
          <label class="d-inline-flex align-items-center">
            <b-form-select
              v-model="filtering.perPage"
              size="md"
              :options="pageOptions"
            ></b-form-select> </label
          >&nbsp;Per page
        </div>
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination
                v-model="filtering.currentPage"
                :total-rows="totalCount"
                :per-page="filtering.perPage"
                hide-goto-end-buttons
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--  Start Create new modal  -->
    <b-modal
      id="createRegionModal"
      ref="createRegionModal"
      centered
      title="Add New Region"
      title-class="h2 txtDark"
      hide-footer
    >
      <FormulateForm
        v-model="addRegionFormValues"
        :schema="regionFormSchema"
        @submit="addRegion"
      >
        <div class="d-flex justify-content-between">
          <span
            class="btn btnCancel newBtn"
            @click.prevent="$refs.createRegionModal.hide()"
            >Cancel</span
          >
          <button class="btn btnSave px-3 newBtn" type="submit">
            Add Region
          </button>
        </div>
      </FormulateForm>
    </b-modal>
    <!--  End Create new modal  -->

    <!--  Start Update modal  -->
    <b-modal
      id="updateRegionModal"
      ref="updateRegionModal"
      centered
      title="Update Region"
      title-class="h2 txtDark"
      hide-footer
    >
      <FormulateForm
        v-model="updateRegionFormValues"
        :schema="regionFormSchema"
        @submit="updateRegion"
      >
        <div class="d-flex justify-content-between">
          <span
            class="btn btnCancel newBtn"
            @click.prevent="$refs.updateRegionModal.hide()"
            >Cancel</span
          >
          <button class="btn btnSave px-3 newBtn" type="submit">
            Update Region
          </button>
        </div>
      </FormulateForm>
    </b-modal>
    <!--  End Update modal  -->

    <!--  Start Delete modal  -->
    <b-modal
      id="deleteRegionModal"
      ref="deleteRegionModal"
      centered
      title="Delete Region"
      title-class="h2 txtDark"
      hide-footer
    >
      <p class="p-2 text-center">
        Kindly note that this action can't be undone, and deleting this region
        will delete its territories too.
      </p>
      <div class="d-flex justify-content-between">
        <button
          class="btn btnCancel newBtn"
          @click.prevent="$refs.deleteRegionModal.hide()"
        >
          Cancel
        </button>
        <button class="btn btn-danger newBtn" type="submit" @click="deleteRegion">
          Delete Region
        </button>
      </div>
    </b-modal>
    <!--  End Delete modal  -->
  </div>
</template>
<script src="./regions.js"></script>
