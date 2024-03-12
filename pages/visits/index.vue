<template>
  <div class="row">
    <div class="col-12">
      <div class="row widthFilter py-2">
        <div class="col-lg-4 col-sm-12 col-md-4">
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
                placeholder="Search by visit id"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
              <b-form-input
                v-model="filtering.hours"
                debounce="500"
                type="search"
                placeholder="Filter By Hours"
                class="inputSearch"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-dropdown id="export" text="Export Reports" variant="secondary" class="mb-2 btnAdd">
            <b-dropdown-item @click="exportFile('pdf')">PDF</b-dropdown-item>
            <b-dropdown-item @click="exportFile('excel')">Excel</b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="col-md-6 col-xl-2 col-lg-3 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :options="statusOptions"
            />
          </div>
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
              v-model="filtering.chains"
              type="dataDropdown"
              :isMultiple="true"
              :customplaceholder="'Chain'"
              :options="chainOptions"
          />
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
              v-model="filtering.areas"
              type="dataDropdown"
              :isMultiple="true"
              :customplaceholder="'Area'"
              :options="areaOptions"
          />
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2 pb-2">
          <div class="newDropDown dropdownRight">
            <b-dropdown
                id="dropdown-form"
                ref="dropdown"
                text="Visit Date"
                class="btn-block"
            >
              <b-dropdown-form class="mt-2">
                <b-form-group label="From Date" label-for="dropdown-form-date">
                  <b-form-input
                      v-model="filtering.from"
                      id="dropdown-form-date"
                      type="date"
                      size="sm"
                      placeholder="Date From"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                      v-model="filtering.to"
                      id="dropdown-form-date"
                      type="date"
                      size="sm"
                      placeholder="Date To"
                  ></b-form-input>
                </b-form-group>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div>
        <div class="col-xl-12 col-lg-3 col-md-12 pt-2">
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
      <div class="table-responsive bg-white mb-3 minWidthCol">
        <b-table
            :items="visits"
            :fields="fields"
            :busy="$fetchState.pending"
            responsive="lg"
            :per-page="0"
            empty-text="No matching visits created"
            :show-empty="true"
        >
        <template v-slot:cell(media.check_in.path)="data">
            <b-avatar
              variant="primary"
              :src="data.item.media.check_in.path"
              class="mr-3 align-baseline newImageHover"
            ></b-avatar>
            <!-- <p class="eLine">{{ data.item.name.en }}</p> -->
          </template>
          <template v-slot:cell(media.check_out.path)="data">
            <b-avatar
              variant="primary"
              :src="data.item.media.check_out.path"
              class="mr-3 align-baseline newImageHover"
            ></b-avatar>
            <!-- <p class="eLine">{{ data.item.name.en }}</p> -->
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
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style src="./index.css"></style>
