<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only v-if="!$fetchState.pending">
              <FormulateForm
                v-model="updateTaskFormValue"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_en"
                      type="text"
                      required
                      label="Task Title (EN) *"
                      validation="bail|required"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_ar"
                      type="text"
                      label="Task Title (AR)"
                    />
                  </div>
                </div>
                <div class="row pt-2">
                  <div class="col-md-6">
                    <client-only>
                      <FormulateInput
                        v-model="taskTypeValue"
                        type="dataDropdown"
                        name="taskType"
                        validation="bail"
                        class="typeL"
                        label="Task Type"
                        :customplaceholder="'Select Task Type'"
                        :options="taskTypeOptions"
                      />
                    </client-only>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_description_en"
                      type="textarea"
                      label="Task Description (EN)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_description_ar"
                      type="textarea"
                      dir="rtl"
                      label="Task Description (AR)"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_instructions_en"
                      type="textarea"
                      label="Task instructions (EN)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="task_instructions_ar"
                      type="textarea"
                      dir="rtl"
                      label="Task instructions (AR)"
                    />
                  </div>
                </div>
                <div class="row pb-4">
                  <div class="col-12 pt-2">
                    <FormulateInput
                      type="group"
                      name="taskImages"
                      :repeatable="true"
                      add-label="+ Picture"
                      minimum="1"
                    >
                      <FormulateInput
                        type="image"
                        name="selectedFile"
                        label="Upload Pictures"
                        validation="mime:image/jpeg,image/png,image/gif"
                        multiple
                      />
                    </FormulateInput>
                  </div>
                </div>
                <!-- <div>
                  <b-alert
                    show
                    dismissible
                    border-variant="black"
                    class="border bg-white alertN"
                  >
                    <img
                      src="~/assets/images/trash.png"
                      width="40px"
                      height="40px"
                      alt=""
                    />
                    Dismissible Alert! Click the close button over there
                    <b>&rArr;</b>
                  </b-alert>
                </div> -->
                
                <div class="row">
                  <div class="col-md-6">
                    <client-only>
                      <FormulateInput
                        type="dataDropdown"
                        name="recurrenceType"
                        validation="bail|required"
                        class="typeL"
                        label="Task recurrence rate *"
                        required
                        :customplaceholder="'Select Task recurrence rate'"
                        :options="recurrenceRateOptions"
                        @input="dateRangeToggle"
                      />
                    </client-only>
                  </div>
                  <div v-if="isDateFrom" class="col-md-3">
                    <FormulateInput
                      name="recurrenceFrom"
                      type="date"
                      label="Visits From"
                    />
                  </div>
                  <div v-if="isDateTo" class="col-md-3">
                    <FormulateInput
                      name="recurrenceTo"
                      type="date"
                      label="Visits To"
                    />
                  </div>
                </div>
                <!-- eslint-disable -->
                <FormulateInput
                  :customplaceholder="'Select territory'"
                  customHelp="Decide to activate or deactivete this Task"
                  customLabel="Status"
                  name="status"
                  type="switchInput"
                  :value="task.status"
                />
              </FormulateForm>
            </client-only>

          </div>
        </div>
      </div>
    </div>

    <template>
      <div class="row py-4">
        <div class="col-12">
          <div class="card p-4">
            <h5>Add Questions <span class="text-muted">(Optional)</span></h5>
            <div v-for="(question,index) in questions" :key="randomKey+index">
              <h6 class="py-3 questionH">Question {{index + 1}}
                <button class="btn bg-white border-0 pt-0 mt-0 text-danger font-weight-bold float-right"
                        @click="removeQuestion(index+1)">Remove
                </button>
              </h6>
              <div class="newTask row">
                <div class="col-md-6 pt-1">
                  <FormulateInput
                    v-model="question.question.en"
                    type="text"
                    required
                    label="Question (EN) *"
                    validation="bail"
                  />
                </div>
                <div class="col-md-6 pt-1">
                  <FormulateInput
                    v-model="question.question.ar"
                    type="text"
                    label="Question (Ar)"
                    validation="bail"
                  />
                </div>
                <div class="col-md-6">
                  <client-only>
                    <FormulateInput
                      type="dataDropdown"
                      v-model="question.answer_type"
                      class="typeL"
                      validation="bail"
                      label="Expected Answer Type"
                      :options="answerTypesOptions"
                      @input="showAnswerValues(index)"
                    />
                  </client-only>
                </div>
              </div>
              <div class="row newTask" v-if="question.showAnswerValues">
                <div class="col-md-3 pb-2" v-for="i in 4" :key="randomKey+i">
                  <div>
                    <FormulateInput
                      v-model="question.answer_values[i-1]"
                      type="text"
                      :label="'Answer '+i "
                      validation="bail"
                    />
                  </div>
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-md-12">
                  <FormulateInput
                    customHelp="This question is required"
                    v-model="question.is_mandatory"
                    label="Mandatory"
                    type="switchInput"
                    value="true"
                  />
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12">
                <b-button
                  class="mb-2 btnAddTask btn-block" @click="addQuestion"
                ><img src="~/assets/images/plus.png" alt class="img-fluid" /> Add Question
                </b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="row pb-4" >
      <div class="col-12">
        <div class="card p-4">
          <h5>Assigned Chain/s</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <FormulateInput
                  type="dataDropdown"
                  name="chains"
                  v-model="chainsValue"
                  validation="bail|required"
                  label="Chain/s"
                  :customplaceholder="'Select chains'"
                  :isMultiple="true"
                  :options="chainsOptions"
                  @input="fetchBranches"
                />
              </client-only>
              <FormulateInput
                v-model="isAllChainsSelected"
                class="remember-box labelC"
                type="checkbox"
                @change="fetchChains"
                label="select all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pb-4">
      <div class="col-12">
        <div class="card p-4">
          <h5>Assigned Branch/es</h5>
          <div class="row pt-3">
            <div class="col-md-6">
              <client-only>
                <FormulateInput
                  type="dataDropdown"
                  name="branches"
                  v-model="branchesValue"
                  validation="bail|required"
                  label="Branch/es *"
                  required
                  :customplaceholder="'Select branchse'"
                  :isMultiple="true"
                  :options="branchesOptions"
                  @input="changeSelectedBranches"
                />
              </client-only>
              <FormulateInput
                v-model="isAllBranchesSelected"
                class="remember-box labelC"
                type="checkbox"
                @change="fetchBranches"
                label="select all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center pt-3">
      <div class="col-12 px-4">
        <div class="card mb-4">
          <client-only>
            <brands-select
              v-if="selectedBranches && task.brand_ids"
              ref="brandsSelect"
              class="row newRow"
              :busy="$fetchState.pending"
              :force-select="task"
            />
          </client-only>
         
        </div>
      </div>
    </div>

   
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="d-flex w-100 justify-content-between">
          <button
            class="btn btnCancel"
            type="submit"
            @click="$refs.CancelModal.show()"
          >
            Cancel
          </button>

          <button class="btn btnSave px-4" type="submit" @click="updateTask">
            Save
          </button>
        </div>
      </div>
      <!--    Start Delete modal-->
      <b-modal
        centered
        hide-footer
        id="CancelModal"
        ref="CancelModal"
        title="Cancel updating"
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
            Cancel Updating
          </button>
        </div>
      </b-modal>
      <!--    End Delete modal-->
    </div>
  </div>
  <!-- end row -->
</template>

<script src="./edit.js"></script>
<style lang="scss" src="./edit.scss"></style>
