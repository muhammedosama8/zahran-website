<template>
  <div class="row">
    <div class="col-12">
      <div class="col-lg-12 col-sm-12 col-md-12 text-md-right">
        <b-dropdown
          id="export"
          text="Export Reports"
          variant="secondary"
          class="mb-2 btnAdd"
        >
          <b-dropdown-item @click="exportFile('pdf')">PDF</b-dropdown-item>
          <b-dropdown-item @click="exportFile('excel')">Excel</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="row py-2">
        <!--     eslint-disable     -->
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
        <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6 pt-2">
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
          :items="products"
          :fields="fields"
          :busy="$fetchState.pending"
          responsive="lg"
          :per-page="0"
          :current-page="0"
          empty-text="No matching products created"
          :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-slot:cell(name.en)="data">
            <div class="d-flex">
              <b-avatar
                variant="primary"
                :src="data.item.media ? data.item.media.path : ''"
                class="mr-3 align-baseline"
              ></b-avatar>
              <p>{{ data.item.name.en }}</p>
            </div>
          </template>
          <template v-slot:cell(branches)="data">
            <b-badge
              v-for="branch in data.item.branches"
              variant="primary"
              class="p-2 mr-2"
              >{{ branch }}</b-badge
            >
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
