<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <div class="col-lg-4 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Search by admin name , ID , Email”"
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by admin name , ID , Email"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <!-- End search -->

        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-button
            v-if="hasPermission('admins.add')"
            tag="nuxt-link"
            :to="{ name: 'admins-add' }"
            variant="primary"
            class="mb-2 btnAdd"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            admin
          </b-button>
        </div>
        <div class="col-xl-2 col-md-6 col-lg-2 pt-2">
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
                v-model="filtering.role"
                type="dataDropdown"
                :customplaceholder="'Role'"
                :options="roleOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.area"
                type="dataDropdown"
                :customplaceholder="'Area'"
                :options="areaOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.branch"
                type="dataDropdown"
                :customplaceholder="'Branch'"
                :options="branchOptions"
            />
          </div>
        </div>
        <div class="col-xl-4 col-lg-12 col-md-6 pt-2">
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
      <div class="table-responsive tableNewBranch tableE bg-white minWidthCol mb-3">
        <b-table
            :items="admins"
            :fields="fields"
            :busy="$fetchState.pending"
            responsive="lg"
            :per-page="0"
            :current-page="0"
            empty-text="No matching admins created"
            :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-slot:cell(branches)="data">
            <b-badge v-for="branch in data.item.branches" variant="primary" class="p-2 mr-2">{{branch}}</b-badge>
          </template>
          <template v-slot:cell(areas)="data">
            <b-badge v-for="area in data.item.areas" variant="primary" class="p-2 mr-2">{{area}}</b-badge>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
                :variant="data.item.status ? 'success' : 'danger'"
                :text="data.item.status ? 'Active' : 'Deactive'"
                class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template 
              v-if="hasPermission('admins.edit') || hasPermission('admins.delete')"
              v-slot:cell(actions)="data">
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
              v-if="hasPermission('admins.edit')" 
              @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('admins.edit')"
                  tag="nuxt-link"
                  :to="{
                  name: 'admins-adminId',
                  params: { adminId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('admins.delete')"
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
          id="deleteAdminModal"
          ref="deleteAdminModal"
          centered
          title="Delete admins"
          title-class="h2 txtDark"
          hide-footer
      >
        <p class="text-center py-3">
          Kindly note that this action can't be undone and the admins’s details
          will get deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
              class="btn btnCancel newBtn"
              @click.prevent="$refs.deleteAdminModal.hide()"
          >
            Cancel
          </button>
          <button class="btn btn-danger" type="submit" @click="deleteAdmin">
            Delete
          </button>
        </div>
      </b-modal>
      <!--  End Delete modal  -->
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped src="./index.css"></style>
