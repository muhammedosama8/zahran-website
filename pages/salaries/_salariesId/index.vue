<template>
  <div class="row">
    <div class="col-12">
      <div class="card p-4">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card mb-2">
              <div class="card-body py-3">
                <h5 class="card-title mb-1">{{ salary.sab_number }}</h5>
                <p class="text-muted mb-0">SAP Num</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card mb-2">
              <div class="card-body py-3">
                <h5 class="card-title mb-1">{{ salary.department }}</h5>
                <p class="text-muted mb-0">Department</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card mb-2">
              <div class="card-body py-3">
                <h5 class="card-title mb-1">{{ salary.payment_type }}</h5>
                <p class="text-muted mb-0">Payment Type</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card mb-2">
              <div class="card-body py-3">
                <h5 class="card-title mb-1">{{ salary.bank ? salary.bank: '---' }}</h5>
                <p class="text-muted mb-0">Bank</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-2">
          <div class="col-md-6">
            <h4 class="font-weight-bold py-3">Earnings</h4>
            <div v-for="erean in earnings" v-bind:key="erean.id" class="card border mt-3" >
              <div class="card-body pb-1 pt-2"> 
                <div class="row">
                  <div class="col-4">
                    <p class="pt-2">{{ erean.name }}</p>
                  </div>
                  <div  class="col-4" >
                    <p v-if="erean.rate" class="mb-0 text-muted">Rate</p>
                    <p v-if="erean.rate" class="mb-0 text-danger">{{ erean.rate }}</p>
                  </div>
                  <div class="col-4">
                    <p v-if="erean.rate" class="mb-0 text-muted">Amount</p>
                    <p class="mb-0 text-danger">{{ erean.amount }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card border mt-3 bg-dark">
              <div class="card-body py-3"> 
                <p class="mb-0 text-white">
                  <span>Total</span>
                  <span class="float-right">{{ salary.eraning }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h4 class="text-danger font-weight-bold py-3">Desiccation</h4>
            <div v-for="desiccation in desiccations" v-bind:key="desiccation.id" class="card border mt-3" >
              <div class="card-body pb-1 pt-2"> 
                <div class="row">
                  <div class="col-4">
                    <p class="pt-2">{{ desiccation.name }}</p>
                  </div>
                  <div  class="col-4" >
                    <p v-if="desiccation.rate" class="mb-0 text-muted" >Rate</p>
                    <p v-if="desiccation.rate" class="mb-0 text-danger">{{ desiccation.rate }}</p>
                  </div>
                  <div class="col-4">
                    <p v-if="desiccation.rate" class="mb-0 text-muted">Amount</p>
                    <p class="mb-0 text-danger">{{ desiccation.amount }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="card border bgRedColor mt-3">
              <div class="card-body text-white pb-3"> 
                <p class="mb-0">
                  <span>Total</span>
                  <span class="float-right">{{ salary.desiccation }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card border mt-3">
          <div class="card-body py-3"> 
            <p class="mb-0">
              <span>Net Salary</span>
              <span class="float-right text-danger">{{ salary.net_salary }}</span>
            </p>
          </div>
        </div>
      </div>
      <button
        class="btn btnCancel ml-2 mt-2"
        type="submit"
        @click="$router.go(-1)"
      >
        Back
      </button>
    </div>
  </div>
</template>
<script src="./show.js"></script>
<style lang="scss" src="./show.scss"></style>
