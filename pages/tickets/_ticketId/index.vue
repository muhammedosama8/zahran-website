<template>
  <div>
    <client-only v-if="!$fetchState.pending">
      <div class="row justify-content-between px-3">
        <div class="col-xl-9 col-lg-8 col-md-7 col-sm-6">
          <div>
            <p class="muted mb-1">
              Reported on:{{ ticket.created_at.general }}
            </p>
            <h4>{{ ticket.title }}</h4>
            <p>
              {{ ticket.ticket_type.name }}
              <span
                :class="{
                  'badge badge-danger': ticket.severity === 'high',
                  'badge badge-success': ticket.severity === 'low',
                  'badge badge-warning': ticket.severity === 'medium'
                }"
                class="px-4 py-2"
                >{{ ticket.severity }}</span
              >
            </p>
          </div>
        </div>
        <div
          v-if="ticket.status == 'Opened'"
          class="col-xl-3 col-lg-4 col-md-5 col-sm-6"
        >
          <div>
            <button
              class="btn btnControlA float-right px-3"
              @click="toggleStatus(ticket)"
            >
              <b-img
                class="img-fluid pr-2"
                src="~/assets/images/yes.svg"
                alt="placeholder"
              ></b-img
              >Mark As Resolved
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center pt-3 mx-0 pb-3">
        <div class="col-lg-9">
          <div class="card py-3 px-4">
            <h4>Ticket Description</h4>
            <p class="pt-2">
              {{ ticket.description }}
            </p>
            <!-- <div class="pt-2 divContent">
              <b-img src="~/assets/images/test.png" class="img-fluid"></b-img>
            </div> -->
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card p-3">
            <h6 class="pb-2">Issued by</h6>
            <b-media>
              <template #aside>
                <b-avatar
                  variant="primary"
                  :src="ticket.demo.media.path"
                  :alt="ticket.demo.name"
                  class="imgCircleFeed"
                ></b-avatar>
              </template>
              <h6 class="pt-1 mb-1">{{ ticket.demo.name }}</h6>
              <p class="mb-0 text-muted">#ticket.Demo</p>
            </b-media>
          </div>
          <div class="card mt-3 p-3">
            <h6 class="pb-2">Products</h6>
            <b-media v-for="product in ticket.products" :key="product.id">
              <template #aside>
                <b-avatar
                  variant="primary"
                  :src="product.media.path"
                  :alt="product.name"
                  class="imgCircleFeed"
                ></b-avatar>
              </template>
              <template>
                <h6 class="pt-1 pr-2">{{ product.name }}</h6>
                <p class="mb-0 pr-2">ticket.brand sub brand</p>
              </template>
            </b-media>
          </div>
          <div class="card mt-3 p-3">
            <h6 class="pb-2">Chain</h6>
            <b-media>
              <template #aside>
                <b-avatar
                  variant="primary"
                  :src="ticket.chain.media.path"
                  :alt="ticket.chain.name"
                  class="imgCircleFeed"
                ></b-avatar>
              </template>
              <h6 class="mb-0 pt-1">{{ ticket.chain.name }}</h6>
              <p class="mb-0 text-muted">{{ ticket.branch.name }}</p>
            </b-media>
          </div>
          <!--        <div class="card mt-3 p-3">-->
          <!--          <h6 class="pb-2">Task Details</h6>-->
          <!--          <div class="row">-->
          <!--            <div class="col-lg-12 pb-2">-->
          <!--              <span class="font-weight-bold">Task Title</span>-->
          <!--              <span>ticket.task.task.title.en </span>-->
          <!--            </div>-->
          <!--            <div class="col-lg-12">-->
          <!--              <span class="font-weight-bold">Assigned to</span>-->
          <!--              <span>ticket.task.task.promotion.title.en </span>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <template>-->
          <!--            <b-media class="pt-3">-->
          <!--              <template v-slot:aside>-->
          <!--                <b-img variant="primary" class="imgCirclePopup"></b-img>-->
          <!--              </template>-->
          <!--              <template>-->
          <!--                <div>-->
          <!--                  <h6 class="pt-1 mb-1">subBrand.name.en</h6>-->
          <!--                  <p class="mb-0 text-muted">product.name.en</p>-->
          <!--                </div>-->
          <!--              </template>-->
          <!--            </b-media>-->
          <!--          </template>-->
          <!--        </div>-->
        </div>
      </div>
      <button class="btn btnCancel ml-2" type="submit" @click="$router.go(-1)">
        Back
      </button>
    </client-only>
  </div>
</template>
<script src="./edit.js"></script>
<style lang="scss" src="./edit.scss"></style>
