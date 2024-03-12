<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2 widthFilter">
        <!-- Search -->
        <div class="col-lg-8 col-sm-12 col-md-8">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <!-- <label class="d-inline-flex align-items-center btnSearch"> -->
            <!-- Search: -->
            <!-- </label> -->
            <b-input-group class="pb-2">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by promotion Title, ID, Branch Name"
                class="inputSearch"
                @input="getZahranData"
              >
              </b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12 col-md-4 text-md-right">
          <b-button
            v-if="hasPermission('promotions.add')"
            tag="nuxt-link"
            :to="{ name: 'promotions-add' }"
            variant="primary"
            class="mb-2 btnAdd"
            ><img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            Promotion</b-button
          >
        </div>
        <!-- End search -->
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :customplaceholder="'Status'"
              :options="statusOptions"
            />
          </div>
        </div>
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <!--     eslint-disable     -->
            <FormulateInput
              :isMultiple="true"
              v-model="filtering.brandId"
              type="dataDropdown"
              :customplaceholder="'Brands'"
              :options="brandOptions"
              @input="fetchProducts"
            />
          </div>
        </div>
        <div class="col-xl-2 col-md-6 pt-2">
          <div>
            <FormulateInput
              v-model="filtering.products"
              type="dataDropdown"
              :customplaceholder="'Products'"
              :options="productOptions"
              :isMultiple="true"
            />
          </div>
        </div>
        <div class="col-xl-2 col-md-6 pt-2">
          <div class="newDropDown">
            <b-dropdown id="dropdown-form" text="Filter By Date" ref="dropdown" class="btn-block">
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
        <div class="col-xl-4 col-md-6 pt-2 text-right">
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
      <div class="table-responsive table-responsive-lg tableNewBranch bg-white mb-3">
        <b-table
          :items="promotions"
          :fields="fields"
          responsive="lg"
          :per-page="0"
          empty-text="No matching Promotions created"
          :show-empty="true"
        >
          <template v-slot:cell(title)="data">
            <!--            <b-avatar
              variant="primary"
              :src="data.item.media_path"
              class="mr-3 align-baseline"
            ></b-avatar>-->
            <p>{{ data.item.title }}</p>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
              :variant="data.item.status ? 'success' : 'danger'"
              :text="data.item.status ? 'Active' : 'Deactive'"
              class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template v-if="hasPermission('promotions.edit') || hasPermission('promotions.delete')" v-slot:cell(actions)="data">
            <b-dropdown
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item v-if="hasPermission('promotions.edit')" @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('promotions.edit')"
                tag="nuxt-link"
                :to="{
                  name: 'promotions-promotionId',
                  params: { promotionId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('promotions.delete')"
                @click="showDeleteModal(data.item)">
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
            <b-form-select size="md" :options="pageOptions" v-model="filtering.perPage" /></label
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
        id="deletePromotionModal"
        ref="deletePromotionModal"
        centered
        title="Delete Promotion"
        title-class="h2 txtDark"
        hide-footer
      >
        <p class="text-center py-2">Kindly note that this action can't be undone and the promotion’s details with all its linked tasks will get deleted.</p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel newBtn"
            @click.prevent="$refs.deletePromotionModal.hide()"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger newBtn"
            type="submit"
            @click="deletePromotion"
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


