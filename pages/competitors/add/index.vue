<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Basic Details</h5>
            <client-only>
              <FormulateForm
                v-model="addNewCompetitorFormValue"
                class="newTask"
                @validation="validation = $event"
              >
                <div class="row">
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="name_en"
                      type="text"
                      label="Competitor Name (EN) *"
                      validation="bail|required"
                      validation-name="Competitor Name(EN)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <FormulateInput
                      name="name_ar"
                      type="text"
                      label="Competitor Name (AR)"
                    />
                  </div>
                  <div class="col-md-6 pt-2">
                    <!-- eslint-disable -->
                    <FormulateInput
                      customHelp="Decide to activate or deactivete this Task"
                      customLabel="Status"
                      :customplaceholder="'Status'"
                      name="status"
                      type="switchInput"
                      value="true"
                    />
                  </div>
                </div>
              </FormulateForm>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <template >
      <div class="row py-4">
        <div class="col-12">
          <div class="card p-4">
            <h5>Add Products <span class="text-muted"></span></h5>
            <div class="newQuestions">
              <div v-for="(product,index) in products" :key="randomKey+index" class="firstQ">
                <h6 class="py-3 questionH">Product {{ index + 1 }}
                  <button class="btn bg-white border-0 pt-0 mt-0 text-danger font-weight-bold float-right"
                          @click="removeProduct(index)">Remove
                  </button>
                </h6>
                <div class="newTask row">
                  <div class="col-md-6 pt-1">
                    <FormulateInput
                      v-model="product.product.en"
                      type="text"
                      label="Product (EN) *"
                      validation="bail|required"
                      validation-name="Product Name(EN)"
                    />
                  </div>
                  <div class="col-md-6 pt-1">
                    <FormulateInput
                      v-model="product.product.ar"
                      type="text"
                      label="Product (Ar)"
                      validation="bail"
                    />
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12">
                <b-button
                  class="mb-2 btnAddTask btn-block" @click="addProduct"
                ><img src="~/assets/images/plus.png" alt class="img-fluid" /> Add Product
                </b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    
    
    

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

          <button class="btn btnSave px-4" type="submit" @click="addCompetitor">
            Save
          </button>
        </div>
      </div>
      <!--    Start Delete modal-->
      <b-modal
        id="CancelModal"
        ref="CancelModal"
        centered
        hide-footer
        title="Cancel Adding"
        title-class="h4 txtDark"
      >
        <p class="text-center py-3">Careful you've entered new data in this page, if you navigate away without saving
          first, all changes will be lost</p>
        <div class="d-flex justify-content-between">
          <button class="btn btnCancel" @click.prevent="$refs.CancelModal.hide()" >
            Keep Changes
          </button>
          <button
            class="btn cancelAdd"
            type="submit"
            @click="
            $refs.CancelModal.hide()
            $router.go(-1)
          "
            
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
<style lang="scss" src="./add.scss"></style>
