<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2 widthFilter">
        <!-- Search -->
        <div class="col-lg-4 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <!-- <label class="d-inline-flex align-items-center btnSearch"> -->
            <!-- Search: -->
            <!-- </label> -->
            <b-input-group class="mb-2">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by message title"
                class="inputSearch"
                @input="getZahranData"
              >
              </b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-button
            v-if="hasPermission('messages.add')"
            tag="nuxt-link"
            :to="{ name: 'messages-add' }"
            variant="primary"
            class="mb-2 btnAdd"
          >
            <i class="fa fa-envelope"></i> Send New Message
          </b-button>
        </div>
        <!-- End search -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div class="newDropDown">
            <b-dropdown
              id="dropdown-form"
              ref="dropdown"
              text="Filter By Date"
              class="btn-block"
            >
              <b-dropdown-form class="mt-2">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                    id="dropdown-form-date"
                    v-model="filtering.from"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                    id="dropdown-form-date"
                    v-model="filtering.to"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div>
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <!--     eslint-disable     -->
            <FormulateInput
              v-model="filtering.demoIds"
              type="dataDropdown"
              :customplaceholder="'Demo'"
              :isMultiple="true"
              :options="demoOptions"
            />
          </div>
        </div>
        <div class="col-xl-8 col-lg-7 col-md-6 pt-2">
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
      <div class="table-responsive-lg bg-white mb-3">
        <b-table
          :items="messages"
          :fields="fields"
          :busy="$fetchState.pending"
          responsive="lg"
          :per-page="0"
          empty-text="No Matching Message created"
          :show-empty="true"
        >
          <template v-if="hasPermission('messages.show') || hasPermission('messages.delete')" v-slot:cell(actions)="data">
            <b-dropdown
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <!-- <b-dropdown-item @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item> -->

              <b-dropdown-item
                v-if="hasPermission('messages.view')"
                tag="nuxt-link"
                :to="{
                  name: 'messages-messageId',
                  params: { messageId: data.item.id }
                }"
              >
                <i class="fas fa-eye text-success mr-1"></i> View
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('messages.delete')"
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
            /> </label
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
              />
            </ul>
          </div>
        </div>
      </div>
      <!--  Start Delete modal  -->
      <b-modal
        id="deleteMessageModal"
        ref="deleteMessageModal"
        centered
        title="Delete Message"
        title-class="h2 txtDark"
        hide-footer
      >
        <p class="text-center py-2">
          Kindly note that this action can't be undone and this direct message
          information will be deleted
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel newBtn"
            @click.prevent="$refs.deleteMessageModal.hide()"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger newBtn"
            type="submit"
            @click="deleteMessage"
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
