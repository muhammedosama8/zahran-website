<template>
  <client-only v-if="!$fetchState.pending">
    <div class="container-fluid">
      <b-row class="justify-content-center">
        <b-col class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title pt-2">Personal Information</h5>
              <FormulateForm
                v-model="updateUserProfileFormValue"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="d-flex formFile">
                  <FormulateInput
                    label="Profile Photo"
                    name="selectedFile"
                    class="mr-2 mb-2 pb-2"
                    type="image"
                    :value="[{ url: user.media.path || null }]"
                    validation="bail|mime:image/jpeg,image/png,image/gif"
                  />
                  <b-button
                    variant="primary"
                    class="mt-4"
                    style="height:fit-content"
                    @click="updateProfile"
                  >
                    Upload Photo
                  </b-button>
                </div>
              </FormulateForm>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-3">
        <b-col class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title txtDark pt-2">Change Password</h5>
              <div class="newTask">
                <b-row class="mb-2 pt-2">
                  <b-col class="col-md-6 col-12">
                    <label class="pt-2">Current Password</label>
                    <b-input-group>
                      <b-form-input
                        v-model="currentPassword"
                        :type="showPasswordOld ? 'text' : 'password'"
                        class="border-left"
                        placeholder="Current Password"
                      >
                      </b-form-input>
                      <b-input-group-append class="border-left-0 inputG">
                        <span
                          class="input-group-text"
                          @click="showPasswordOld = !showPasswordOld"
                        >
                          <i
                            class="fa"
                            :class="[
                              showPasswordOld ? 'fa-eye' : 'fa-eye-slash'
                            ]"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                </b-row>
                <b-row class="mb-2 pt-2">
                  <b-col class="col-md-6 col-12">
                    <label class="pt-2">New Password</label>
                    <b-input-group>
                      <b-form-input
                        v-model="newPassword"
                        :type="showPassword ? 'text' : 'password'"
                        class="border-left"
                        placeholder="New Password"
                      >
                      </b-form-input>
                      <b-input-group-append class="border-left-0 inputG">
                        <span
                          class="input-group-text"
                          @click="showPassword = !showPassword"
                        >
                          <i
                            class="fa"
                            :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col class="col-md-6 col-12">
                    <label class="pt-2">Confirm New Password</label>
                    <b-input-group>
                      <b-form-input
                        v-model="confirmedPassword"
                        :type="showCPassword ? 'text' : 'password'"
                        class="border-left"
                        placeholder="Confirm New Password"
                      >
                      </b-form-input>
                      <b-input-group-append class="border-left-0 inputG">
                        <span
                          class="input-group-text"
                          @click="showCPassword = !showCPassword"
                        >
                          <i
                            class="fa"
                            :class="[showCPassword ? 'fa-eye' : 'fa-eye-slash']"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </b-input-group-append>
                    </b-input-group>
                  </b-col>
                  <b-col class="pt-3">
                    <b-button
                      variant="primary"
                      class="d-block ml-auto"
                      @click="changePassword"
                    >
                      Change Password
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- end row -->
  </client-only>
</template>


<script src="./index.js"></script>
<style>
.formFile .formulate-files .formulate-file-image-preview{
  padding-top: 1rem !important;
}
</style>