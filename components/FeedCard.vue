<template>
  <div class="card cardFeed my-3">
    <div class="row">
      <div class="col-12">
        <div>
          <!-- <b-card> -->
          <p class="pt-3 pl-3">
             20 Dec 2020 - 10:32 pm
          </p>
          <b-media class="pl-3 py-3">
            <template v-slot:aside>
              <b-avatar
                variant="primary"
                class="imgCircleFeed"
              ></b-avatar>
            </template>
            <h5 class="mt-2 mb-1"> comment.merchandiser.name.en </h5>
            <p class="text-muted"># comment.merchandiser.id </p>
          </b-media>
          <!-- </b-card> -->
        </div>
      </div>
    </div>
    <p class="pt-3 pl-4">
       comment.comment 
    </p>
    <div class="row p-3">
      <div class="col-lg-3 col-md-4 col-6">
        <b-img class="listImages mx-auto d-block"
        src="~/assets/images/test.PNG"
        ></b-img>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <div class="py-4 audioN">
          <audio controls>
            <source type="audio/ogg" />
          </audio>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <div class="viedoH">
          <div class="embed-responsive">
            <iframe
              class="embed-responsive-item"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      <div class="row">
        <div
          class="col-md-6"
        >
          <b-media>
            <template v-slot:aside>
              <b-avatar
                variant="primary"
                class="imgCirclePopup"
              ></b-avatar>
            </template>
            <h6 class="mt-1 mb-1"> comment.sub_brand.name.en </h6>
            <p class="text-muted txtSm">
               comment.products.type.en 
            </p>
          </b-media>
        </div>
        <div class="col-md-6">
          <b-media>
            <template v-slot:aside>
              <b-avatar
                variant="primary"
                class="imgCirclePopup"
              ></b-avatar>
            </template>

            <h6 class="mt-1 mb-1"> comment.branch.name.en </h6>
            <p class="text-muted txtSm">
               comment.territory.name.en 
            </p>
          </b-media>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'FeedCard',
  props: {
    comment: {
      type: Object,
      required: true
    },
    commentType : {
      type:String,
      required: true
    }
  },
  data(){
    return{
      clickedItem: null
    }
  },
  deactivated() {
    this.$destroy()
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>

<style scoped>
.imgCircleFeed {
  width: 56px !important;
  height: 56px !important;
}

.imgCirclePopup {
  width: 40px !important;
  height: 40px !important;
}

.embed-responsive .embed-responsive-item, .embed-responsive iframe, .embed-responsive embed, .embed-responsive object, .embed-responsive video {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
}

.list-regular-images{
  height: 140px;
  border-radius: 0px;
  -o-object-fit: cover;
  object-fit: cover;
  border: solid 1px #fafafa;
  width: 100%;
}

</style>
