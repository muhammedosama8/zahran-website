<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <div class="col-lg-4 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <b-input-group class="mb-2">
              <b-input-group-prepend>
                <span
                  v-b-tooltip.hover
                  class="input-group-text"
                  title="Search by month or SAB Num... "
                >
                  <i class="fa fa-search fa-lg"></i>
                </span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by SAB Num"
                class="inputSearch"
                @input="getZahranData"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
        <!-- End search -->

        <div v-if="hasPermission('salaries.import')" class="col-lg-8 col-sm-12 col-md-8 text-md-right" >
          <input
            id="fileUpload"
            ref="file"
            type="file"
            hidden
            @change="handleFileUpload()"
          />
          <b-button
            variant="primary"
            class="mb-3 btnAdd btnExport"
            @click="chooseFiles()"
          >
            <img src="~/assets/images/add.svg" alt class="img-fluid" /> Import
          </b-button>
        </div>
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
                    v-model="filtering.dateFrom"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="To Date" label-for="dropdown-form-date">
                  <b-form-input
                    id="dropdown-to-date"
                    v-model="filtering.dateTo"
                    type="date"
                    size="sm"
                    placeholder="date"
                  ></b-form-input>
                </b-form-group>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </div>
        
        <div class="col-md-6 col-xl-2 pt-2">
          <!--     eslint-disable     -->
            <FormulateInput
                v-model="filtering.departments"
                type="dataDropdown"
                :isMultiple="true"
                :customplaceholder="'Department'"
                :options="departmentOptions"
            />
        </div>
        <div class="col-md-6 col-xl-2 pt-2">
          <!--     eslint-disable     -->
            <FormulateInput
                v-model="filtering.netSalary"
                type="dataDropdown"
                :isMultiple="false"
                :customplaceholder="'Net Salary'"
                :options="salaryOptions"
            />
        </div>
        <!--     eslint-disable     -->
        <div class="col-xl-6 col-md-6 text-right pt-2">
          <div
              id="tickets-table_length"
              class="dataTables_length text-md-right"
          >
            <p class="d-inline-flex pt-2 mt-1 align-items-end">
              Showing
              <strong class="px-2">{{ totalRows }}</strong> from
              <strong class="px-2">{{ totalCount }}</strong>
            </p>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="table-responsive tableNewBranch tableE bg-white mb-3">
            <!-- :busy="$fetchState.pending" -->
            <!-- class="tablePrice"  -->
            <!-- :current-page="0" -->
        <b-table
            :items="salaries"
            :fields="fields"
            responsive="lg"
            :per-page="0"
            empty-text="No matching salaries created"
            :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-if="hasPermission('salaries.show')" v-slot:cell(actions)="data">
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
                v-if="hasPermission('salaries.show')"
                tag="nuxt-link"
                :to="{
                  name: 'salaries-salariesId',
                  params: { salariesId: data.item.id }
                }"
              >
                <i class="fas fa-eye text-success mr-1"></i> Show
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
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>
