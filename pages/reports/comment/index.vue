<template>
  <div class="row">
    <div class="col-12">
      <div class="row widthFilter py-2">
        <div class="col-lg-4 col-sm-12 col-md-4">
          <!-- <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Search by demo name , ID , Sab Number"
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="filtering.searchTerm"
                type="search"
                placeholder="Search by demo name , ID , Sab Number"
                class="inputSearch"
              ></b-form-input>
          </b-input-group> -->
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-dropdown
            id="export"
            text="Export Reports"
            variant="secondary"
            class="mb-2 btnAdd"
          >
            <b-dropdown-item @click="exportFile('pdf')">PDF</b-dropdown-item>
            <b-dropdown-item @click="exportFile('excel')"
              >Excel</b-dropdown-item
            >
          </b-dropdown>
        </div>
        <div class="col-md-6 col-xl-2 col-lg-3 pt-2">
          <!--     eslint-disable     -->
          <FormulateInput
            v-model="filtering.demos"
            type="dataDropdown"
            :isMultiple="true"
            :customplaceholder="'Demo'"
            :options="demoOptions"
          />
        </div>
        <div class="col-md-6 col-xl-2 col-lg-3 pt-2">
          <FormulateInput
            v-model="filtering.products"
            type="dataDropdown"
            :isMultiple="true"
            :customplaceholder="'Product'"
            :options="productsOptions"
          />
        </div>
        <!-- <div class="col-xl-2 col-lg-3 col-md-6 pt-2 pb-2">
          <div class="newDropDown">
            <b-dropdown
                id="dropdown-form"
                ref="dropdown"
                v-model="filtering.dateFrom"
                text="Date"
                class="btn-block"
            >
              <b-dropdown-form class="mt-2">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                      id="dropdown-form-date"
                      v-model="filtering.dateTo"
                      type="date"
                      size="sm"
                      placeholder="Date From"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                      id="dropdown-form-date"
                      type="date"
                      size="sm"
                      placeholder="Date To"
                  ></b-form-input>
                </b-form-group>
                <b-button variant="primary" class="p-2" size="sm"
                >Search
                </b-button>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div> -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div class="newDropDown">
            <b-dropdown
              id="dropdown-form"
              text="Filter By Date"
              ref="dropdown"
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
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div>
        <div class="col-md-6 col-xl-2 col-lg-3 pt-2">
          <FormulateInput
            v-model="filtering.branches"
            type="dataDropdown"
            :isMultiple="true"
            :customplaceholder="'Branch'"
            :options="branchOptions"
          />
        </div>
        <div class="col-md-6 col-xl-2 col-lg-3 pt-2">
          <FormulateInput
            v-model="filtering.chains"
            type="dataDropdown"
            :isMultiple="true"
            :customplaceholder="'Chain'"
            :options="chainOptions"
          />
        </div>
        <div class="col-xl-2 col-lg-3 col-md-12 pt-2">
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
      <div class="table-responsive bg-white mb-3">
        <b-table
          :items="reports"
          :fields="fields"
          :busy="$fetchState.pending"
          responsive="lg"
          :per-page="0"
          empty-text="No matching reports created"
          :show-empty="true"
        >
          <template
            v-if="hasPermission('reports.show')"
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
                tag="nuxt-link"
                :to="{
                  name: 'reports-reportId',
                  params: { reportId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Show
              </b-dropdown-item>

              <!-- <b-dropdown-item
                  @click="showDeleteModal(data.item)"
              >
                <i class="fas fa-trash-alt text-danger mr-1"></i> Delete
              </b-dropdown-item> -->
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
            >
            </b-form-select> </label
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
  </div>
</template>
<script src="./index.js"></script>
<style scoped src="./index.css"></style>
