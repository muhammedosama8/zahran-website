<template>
  <div class="row">
    <div class="col-12">
      <div class="row widthFilter py-2">
        <div class="col-lg-5 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by chain's name or ID"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-7 col-sm-12 col-md-8 text-md-right">
          <input
            id="fileUpload"
            ref="file"
            type="file"
            hidden
            @change="handleFileUpload()"
          />
          <b-button
            v-if="hasPermission('chains.add')"
            variant="primary"
            class="mb-2 btnAdd"
            @click="chooseFiles()"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Import
          </b-button>
          <b-button
            v-if="hasPermission('chains.add')"
            tag="nuxt-link"
            :to="{ name: 'chains-add' }"
            variant="primary"
            class="mb-2 btnAdd"
            ><img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            Chain</b-button
          >
        </div>
        <!-- End search -->
        <div class="col-6 col-md-6 col-lg-2 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :options="statusOptions"
            />
          </div>
        </div>
        <div class="col-6 col-md-6 col-lg-2 pt-2">
          <div>
            <!--     eslint-disable     -->
            <FormulateInput
              v-model="filtering.brandIds"
              type="dataDropdown"
              :customplaceholder="'Brand'"
              :isMultiple="true"
              :options="brandOptions"
            />
          </div>
        </div>
        <div class="col-sm-12 col-lg-8 col-md-6 pt-2">
          <div
            id="tickets-table_length"
            class="dataTables_length text-md-right"
          >
            <p class="d-inline-flex pt-2 mt-1 align-items-center">
              Showing <strong class="px-2">{{ totalRows }}</strong> from
              <strong class="px-2">{{ totalCount }}</strong>
            </p>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="table-responsive tableNewBranch bg-white mb-3">
        <b-table
          :items="chains"
          :fields="fields"
          :busy="$fetchState.pending"
          responsive="lg"
          :per-page="0"
          empty-text="No matching chains created"
          :show-empty="true"
        >
          <template v-slot:cell(name.en)="data">
            <div class="d-flex">
              <b-avatar
                variant="primary"
                :src="data.item.media.path"
                class="mr-3 align-baseline"
              ></b-avatar>
              <p>{{ data.item.name.en }}</p>
            </div>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
              :variant="data.item.status ? 'success' : 'danger'"
              :text="data.item.status ? 'Active' : 'Deactive'"
              class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template v-if="hasPermission('chains.edit') || hasPermission('chains.delete')" v-slot:cell(actions)="data">
            <b-dropdown
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item v-if="hasPermission('chains.edit')" @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('chains.edit')"
                tag="nuxt-link"
                :to="{
                  name: 'chains-chainId',
                  params: { chainId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('chains.delete')"
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
              :options="pageOptions">
            </b-form-select>
          </label>&nbsp;Per page
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
        id="deleteChainModal"
        ref="deleteChainModal"
        centered
        title="Delete Chain"
        title-class="h2 txtDark"
        hide-footer
      >
        <p>
          Kindly note that this action can't be undone and the chain's details
          with all its linked data; like the branches and their visits will get
          deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel newBtn"
            @click.prevent="$refs.deleteChainModal.hide()"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger newBtn"
            type="submit"
            @click="deleteChain"
          >
            Delete
          </button>
        </div>
      </b-modal>
      <!--  End Delete modal  -->
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css"></style>
