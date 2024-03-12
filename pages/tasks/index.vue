<template>
  <div class="row">
    <div class="col-12">
      <div class="row py-2">
        <!-- Search -->
        <div class="col-lg-4 col-sm-12 col-md-4">
          <div id="tickets-table_filter" class="dataTables_filter text-md-left">
            <!-- <label class="d-inline-flex align-items-center btnSearch"> -->
            <!-- Search: -->
            <!-- </label> -->
            <b-input-group>
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><i class="fa fa-search fa-lg"></i
                ></span>
              </b-input-group-prepend>
              <b-form-input
                v-model="searchKeyword"
                type="search"
                placeholder="Search by Task Title"
                class="inputSearch"
                @input="getZahranData"
              >
              </b-form-input>
            </b-input-group>
          </div>
        </div>
        <div class="col-lg-8 col-sm-12 col-md-8 text-md-right">
          <!-- <b-button
            variant="light"
            class="text-primary font-weight-bold btnBulk mb-2 mr-2"
            ><img src="~/assets/images/upload.svg" alt class="img-fluid" /> Bulk
            Upload</b-button
          > -->
          <b-button
            v-if="hasPermission('tasks.add')"
            tag="nuxt-link"
            :to="{ name: 'tasks-add' }"
            variant="primary"
            class="mb-2 btnAdd"
            ><img src="~/assets/images/add.svg" alt class="img-fluid" /> Add New
            Task</b-button
          >
        </div>
        <!-- End search -->
        <div class="col-sm-12 col-md-6 col-lg-2 pt-2">
          <div>
            <b-form-select
              v-model="filtering.selectedStatus"
              class="mb-3"
              :options="statusOptions"
            />
          </div>
        </div>
        <div class="col-sm-12 col-lg-10 col-md-6 pt-2">
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
      <div class="table-responsive-lg bg-white mb-3" style="overflow: auto">
        <b-table
          :items="tasks"
          :fields="fields"
          :busy="$fetchState.pending"
          responsive="lg"
          class="minWidthCol"
          :per-page="0"
          empty-text="No matching tasks created"
          :show-empty="true"
        >
          <!-- eslint-disable -->
          <template v-slot:cell(name.en)="data">
            <b-avatar
              variant="primary"
              :src="data.item.media_path"
              class="mr-3 align-baseline"
            ></b-avatar>
            <p class="eLine">{{ data.item.name.en }}</p>
          </template>
          <template v-slot:cell(status)="data">
            <b-avatar
              :variant="data.item.status ? 'success' : 'danger'"
              :text="data.item.status ? 'Active' : 'Deactive'"
              class="mr-3 align-baseline borderRadius w-100"
            ></b-avatar>
          </template>
          <template v-if="hasPermission('tasks.edit') || hasPermission('tasks.delete')" v-slot:cell(actions)="data">
            <b-dropdown
              class="card-drop w-100"
              variant="white"
              right
              toggle-class="p-0"
            >
              <template v-slot:button-content>
                <i class="mdi mdi-dots-horizontal font-size-18"></i>
              </template>

              <b-dropdown-item v-if="hasPermission('tasks.edit')" @click="toggleStatus(data.item)">
                <i class="fas fa-edit-alt mr-1"></i> Activate/De-activate
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('tasks.edit')"
                tag="nuxt-link"
                :to="{
                  name: 'tasks-taskId',
                  params: { taskId: data.item.id }
                }"
              >
                <i class="fas fa-pencil-alt text-success mr-1"></i> Edit
              </b-dropdown-item>

              <b-dropdown-item
                v-if="hasPermission('tasks.delete')"
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
        id="deleteTaskModal"
        ref="deleteTaskModal"
        centered
        title="Delete Task"
        title-class="h2 txtDark"
        hide-footer
      >
        <p class="text-center p-3">
          Kindly note that this action can't be undone. All the task’s details
          will get deleted.
        </p>
        <div class="d-flex justify-content-between">
          <button
            class="btn btnCancel newBtn"
            @click.prevent="$refs.deleteTaskModal.hide()"
          >
            Cancel
          </button>
          <button
            class="btn btn-danger newBtn"
            type="submit"
            @click="deleteTask"
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
