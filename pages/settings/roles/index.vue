<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2 widthFilter">
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
                placeholder="Search by Role’s name, ID…"
                class="inputSearch"
                @input="getZahranData"
              >
              </b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <b-button
            v-if="hasPermission('roles.add')"
            tag="nuxt-link"
            :to="{ name: 'settings-roles-add' }"
            variant="primary"
            class="mb-2 btnAdd"
            ><img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            Role</b-button
          >
        </div>
        <div class="col-xl-2 col-lg-3 col-md-6 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :customplaceholder="'Status'"
              :options="statusOptions"
            />
          </div>
        </div>
        <div class="col-xl-10 col-lg-9 col-md-6 pt-2 text-right">
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
      <div
        class="table-responsive table-responsive-lg tableNewBranch bg-white mb-3"
      >
        <b-table
          :items="roles"
          :fields="fields"
          responsive="lg"
          :per-page="0"
          empty-text="No matching roles created"
          :show-empty="true"
        >
          <template v-slot:cell(title)="data">
            <p>{{ data.item.title }}</p>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
              :variant="data.item.status ? 'success' : 'danger'"
              :text="data.item.status ? 'Active' : 'Deactive'"
              class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template
            v-if="hasPermission('reports.show')"
            v-slot:cell(actions)="data"
          >
            <b-dropdown
              v-if="hasPrivilege(data.item)"
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item
                v-if="hasPermission('roles.edit')"
                @click="toggleStatus(data.item)"
              >
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('roles.edit')"
                tag="nuxt-link"
                :to="{
                  name: 'settings-roles-roleId',
                  params: { roleId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('roles.delete')"
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
              :options="pageOptions" /></label
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
        id="deleteRoleModal"
        ref="deleteRoleModal"
        centered
        title="Delete Role"
        title-class="h2 txtDark"
        hide-footer
      >
        <p class="text-center py-2">
          Kindly note that this action can't be undone and the roles details and
          its users will be deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel newBtn"
            @click.prevent="$refs.deleteRoleModal.hide()"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger newBtn"
            type="submit"
            @click="deleteRole"
          >
            Delete
          </button>
        </div>
      </b-modal>
      <!--  End Delete modal  -->
    </div>
  </div>
</template>
<script src="./roles.js"></script>
<style src="./roles.css"></style>
