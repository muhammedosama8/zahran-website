<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title txtDark py-2">Basic Details</h5>
            <client-only>
              <FormulateForm
                v-model="addNewRoleValue"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="name_en"
                      type="text"
                      label="Role Name (EN) "
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="name_ar"
                      type="text"
                      label="Role Name (AR)"
                    />
                  </div>
                </div>
                <!-- eslint-disable -->
                <FormulateInput
                  customHelp="Decide to activate or deactivate this User Role"
                  customLabel="Status"
                  name="status"
                  type="switchInput"
                  value="true"
                />
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title txtDark py-2">Select Permissions</h5>
            <div class="row">
              <div class="col-xl-3 col-lg-4 col-md-6" v-for="permission in permissions" :key="permission.id">
                <p class="text-muted mb-2 pt-2">{{permission.label}}</p>
                <div class="row">
                  <div class="col-6" v-for="(item,index) in permission.subItems" :key="index">
                    <FormulateInput
                      v-model="chosenPermissions"
                      :value="item.value"
                      class="remember-box labelC"
                      :label="item.label"
                      type="checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pt-3">
      <div class="col-12">
        <div class="d-flex w-100 justify-content-between">
          <button
            class="btn btnCancel"
            type="submit"
            @click="$refs.CancelModal.show()"
          >
            Cancel
          </button>

          <button class="btn btnSave px-4" type="submit" @click="addRole">
            Add
          </button>
        </div>
      </div>
      <!--    Start Delete modal-->
      <b-modal
        centered
        hide-footer
        id="CancelModal"
        ref="CancelModal"
        title="Cancel Adding"
        title-class="h4 txtDark"
      >
        <p class="text-center py-3">Careful you've entered new data in this page, if you navigate away without saving
          first, all changes will be lost</p>
        <div class="d-flex justify-content-between">
          <button @click.prevent="$refs.CancelModal.hide()" class="btn btnCancel">
            Keep Changes
          </button>
          <button
            @click="
            $refs.CancelModal.hide()
            $router.go(-1)
          "
            class="btn cancelAdd"
            type="submit"
          >
            Cancel Adding
          </button>
        </div>
      </b-modal>
      <!--    End Delete modal-->
    </div>
  </div>
  <!-- end row -->
</template>

<script src="./add.js"></script>
<style scoped src="./add.css"></style>
