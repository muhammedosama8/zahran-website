<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <div class="col-lg-5 col-sm-12 col-md-6">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Name , ID , Sab Number , Achievement , Target"
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by Name, ID, Sab Number, Target"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-7 col-sm-12 col-md-6 text-md-right">
          <b-dropdown id="export" text="Export Reports" class="btnAdd mb-2">
            <b-dropdown-item @click="exportFile('pdf')">PDF</b-dropdown-item>
            <b-dropdown-item @click="exportFile('excel')">Excel</b-dropdown-item>
          </b-dropdown>
          <input
            id="fileUpload"
            ref="file"
            type="file"
            hidden
            @change="handleFileUpload()"
          />
          <b-button
            v-if="hasPermission('demos.add')"
            variant="primary"
            class="mb-2 btnAdd"
            @click="chooseFiles()"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Import
          </b-button>
          <b-button
              v-if="hasPermission('demos.add')"
              tag="nuxt-link"
              :to="{ name: 'demos-add' }"
              variant="primary"
              class="mb-2 btnAdd"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            demo
          </b-button>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :options="statusOptions"
            />
          </div>
        </div>
        <!--     eslint-disable     -->
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.chains"
                type="dataDropdown"
                :customplaceholder="'Chain'"
                :options="chainOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.branches"
                type="dataDropdown"
                :customplaceholder="'Branch'"
                :options="branchOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.areas"
                type="dataDropdown"
                :customplaceholder="'Area'"
                :options="areaOptions"
            />
          </div>
        </div>
        <div class="col-sm-12 col-lg-12 col-xl-4 col-md-6 pt-2">
          <div
              id="tickets-table_length"
              class="dataTables_length text-md-right"
          >
            <p class="d-inline-flex pt-2 mt-1 align-items-center">
              Showing
              <strong class="px-2">{{ totalRows }}</strong> from
              <strong class="px-2">{{ totalCount }}</strong>
            </p>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="table-responsive tableNewBranch tableE bg-white mb-3">
        <b-table
            :items="demos"
            :fields="fields"
            :busy="$fetchState.pending"
            responsive="lg"
            class="minWidthCol"
            :per-page="0"
            :current-page="0"
            empty-text="No matching demos created"
            :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-slot:cell(branches)="data">
           <div>
             <b-badge v-for="(branch,index) in data.item.branches" :key="index" variant="primary" class="p-2 mr-2">{{ branch }}</b-badge>
           </div>
          </template>
          <template v-slot:cell(areas)="data">
            <b-badge v-for="(area,index) in data.item.areas" :key="index" variant="primary" class="p-2 mr-2">{{area}}</b-badge>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
                :variant="data.item.status ? 'success' : 'danger'"
                :text="data.item.status ? 'Active' : 'Deactive'"
                class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template v-if="hasPermission('demos.edit') || hasPermission('demos.delete') || hasPermission('demos.addtarget')" v-slot:cell(actions)="data">
            <b-dropdown
                class="card-drop w-100"
                variant="white"
                right
                toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>


              <!-- <b-dropdown-item
                v-if="hasPermission('demos.addtarget')"
                @click="showTargetModal(data.item)"
              >
                <i class="fas fa-edit text-success mr-1"></i> Add Target
              </b-dropdown-item> -->

              <b-dropdown-item  v-if="hasPermission('demos.edit')" @click="toggleStatus(data.item)">
                <i class="fas fa-toggle-off mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('demos.edit')"
                  tag="nuxt-link"
                  :to="{
                  name: 'demos-demoId',
                  params: { demoId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('demos.delete')"
                  @click="showDeleteModal(data.item)"
              >
                <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
              </b-dropdown-item>
            </b-dropdown>
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
            />
          </label
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
      <!--  Start Delete modal  -->
      <b-modal
          id="deleteDemoModal"
          ref="deleteDemoModal"
          centered
          title="Delete demo"
          title-class="h2 txtDark"
          hide-footer
      >
        <p class="text-center py-3">
          Kindly note that this action can't be undone and the demo’s details
          will get deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
              class="btn btnCancel newBtn"
              @click.prevent="$refs.deleteDemoModal.hide()"
          >
            Cancel
          </button>
          <button class="btn btn-danger" type="submit" @click="deleteDemo">
            Delete
          </button>
        </div>
      </b-modal>
      <!--  End Delete modal  -->


      <!--  Start Demo Target modal  -->
      <b-modal
        id="targetModal"
        ref="targetModal"
        centered
        title="Add Target for demo"
        title-class="h2 txtDark"
        hide-footer
      >
        <FormulateForm
          v-model="demoTarget"
          @submit="addTarget"
          class="newFormulate newTask"
        >
            <FormulateInput
              name="demoTarget.date"
              v-model="demoTarget.date"
              type="date"
              label="Month"
              validation="bail"
              @change="checkTarget()"
            />
            <FormulateInput
              name="demoTarget.target"
              type="number"
              v-model="demoTarget.target"
              label="Target"
              min="0"
              validation="bail|required"
            />
          <div class="d-flex justify-content-between mt-4 pt-2">
            <span
              class="btn btnCancel newBtn"
              @click.prevent="$refs.targetModal.hide()"
              >Cancel</span
            >
            <button class="btn btnSave px-3 newBtn" type="submit">
              Add Target
            </button>
          </div>
        </FormulateForm>
      </b-modal>
      <!--  End Demo Target modal  -->

    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>
