<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <div class="col-lg-5 col-sm-12 col-md-6">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="mb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Search by Product Name, ID, Price"
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by Name of (Product, Branch, Brand) and Price"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <!-- End search -->

        <div class="col-lg-7 col-sm-12 col-md-6 text-md-right">
          <b-button
            variant="primary"
            class="mb-3 btnAdd btnExport"
            @click="exportExcel"
          >
            Export <i class="fas fa-chevron-down fa-lg ml-2"></i>
          </b-button>
          <input
            id="fileUpload"
            ref="file"
            type="file"
            hidden
            @change="handleFileUpload()"
          />
          <b-button
            v-if="hasPermission('pricing.import')"
            variant="primary"
            class="mb-3 btnAdd btnExport"
            @click="chooseFiles()"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Import
          </b-button>
        </div>

        <!--     eslint-disable     -->
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.brands"
                type="dataDropdown"
                :customplaceholder="'Brands'"
                :options="brandOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <FormulateInput
                :isMultiple="true"
                v-model="filtering.branches"
                type="dataDropdown"
                :customplaceholder="'Branches'"
                :options="branchOptions"
            />
          </div>
        </div>
        <div class="col-xl-8 col-md-6 pt-2">
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
      <div class="table-responsive tableE bg-white mb-3">
        <b-table
            class="tablePrice"
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
          <template v-if="hasPermission('pricing.edit')" v-slot:cell(price)="data">
            <FormulateInput
                :readonly="hasPermission('pricing.edit')"
                @dblclick="(e) => editPrice(e)"
                @blur="(e) => updatePrice(e,data.item)"
                v-model="data.item.price"
                type="text"
                :value="data.item.price"
            />
          </template>
          <template v-else v-slot:cell(price)="data">
            <FormulateInput
                :readonly="hasPermission('pricing.edit')"
                @dblclick="(e) => editPrice(e)"
                @blur="(e) => updatePrice(e,data.item)"
                v-model="data.item.price"
                type="text"
                :value="data.item.price"
            />
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
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>
