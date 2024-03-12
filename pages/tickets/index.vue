<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <div class="col-xl-5 col-lg-3 col-sm-6 col-md-6 pb-3">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Search by ticket title or ID”"
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by ticket title or ID"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-right">
          <b-dropdown
            id="export"
            text="Export Reports"
            variant="secondary"
            class="btnAdd mb-3"
          >
            <b-dropdown-item @click="exportFile('pdf')">PDF</b-dropdown-item>
            <b-dropdown-item @click="exportFile('excel')"
              >Excel</b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div class="col-xl-4 col-lg-5 col-sm-12 col-md-6 text-md-right">
          <div>
            <b-form-group class="listTicket">
              <b-form-radio-group
                id="btn-radios-1"
                v-model="filtering.selectedStatus"
                :options="statusOptions"
                buttons
                name="radios-btn-default"
              ></b-form-radio-group>
            </b-form-group>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-2 col-sm-12 col-md-6 col-lg-3 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.selectedTicketType"
              :isMultiple="true"
              type="dataDropdown"
              :customplaceholder="'Ticket Type'"
              :options="ticketTypesOptions"
            />
          </div>
        </div>
        <!--     eslint-disable     -->
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.demos"
              :isMultiple="true"
              type="dataDropdown"
              :customplaceholder="'Demos'"
              :options="demosOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-sm-12 col-md-6 col-lg-3 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.severity"
              type="dataDropdown"
              :customplaceholder="'Severity'"
              :options="severityOptions"
            />
            
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2 pb-2">
          <div class="newDropDown">
            <b-dropdown id="dropdown-form" text="Creation Date" ref="dropdown" class="btn-block">
              <b-dropdown-form class="mt-2">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="filtering.from"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="filtering.to"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div>
        <!-- <div class="col-xl-2 col-lg-3 col-md-6 pt-2 pb-2">
          <div class="newDropDown">
            <b-dropdown
              id="dropdown-form"
              ref="dropdown"
              text="Creation Date"
              class="btn-block"
            >
              <b-dropdown-form class="mt-2">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="filtering.from"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                    v-model="filtering.to"
                    id="dropdown-form-date"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
                <b-button variant="primary" class="p-2" size="sm"
                  >Search
                </b-button>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div> -->
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.branches"
                type="dataDropdown"
                :customplaceholder="'Branches'"
                :options="branchesOptions"
            />
          </div>
        </div>
        
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.products"
                type="dataDropdown"
                :customplaceholder="'Products'"
                :options="productOptions"
            />
          </div>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-xl-3 col-sm-12 col-lg-3 col-md-6 pt-2">
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
            :items="tickets"
            :fields="fields"
            :busy="$fetchState.pending"
            responsive="lg"
            class="minWidthCol"
            :per-page="0"
            :current-page="0"
            empty-text="No matching branches created"
            :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-slot:cell(status)="data">
            <b-avatar
                :variant="data.item.status == 'Resolved' ? 'success' : 'danger'"
                :text="data.item.status"
                class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template v-if="hasPermission('tickets.show') || hasPermission('tickets.delete')" v-slot:cell(actions)="data">
            <b-dropdown
                class="card-drop w-100"
                variant="white"
                right
                toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Resolve/Reopen
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('tickets.show')"
                  tag="nuxt-link"
                  :to="{
                  name: 'tickets-ticketId',
                  params: { ticketId: data.item.id }
                }"
              >
                <i class="fas fa-eye text-success mr-1"></i> Show
              </b-dropdown-item>

              <b-dropdown-item
                  v-if="hasPermission('tickets.delete')"
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
          id="
"
          ref="deleteTicketModal"
          centered
          title="Delete Branch"
          title-class="h2 txtDark"
          hide-footer
      >
        <p class="text-center py-3">
          Kindly note that this action can't be undone and the Branch’s details
          will get deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
              class="btn btnCancel newBtn"
              @click.prevent="$refs.deleteTicketModal.hide()"
          >
            Cancel
          </button>
          <button class="btn btn-danger" type="submit" @click="deleteTicket">
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
