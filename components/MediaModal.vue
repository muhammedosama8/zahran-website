<template>
  <div>
    <b-modal :id="String(modalId)" class="newModal" hide-footer>
      <template v-slot:modal-title class="pb-0">
        <b-media>
          <template v-slot:aside>
            <b-avatar
              variant="primary"
              :src="comment.merchandiser.media"
              class="imgCircleFeed"
            ></b-avatar>
          </template>

          <h5 class="mt-2 mb-1">{{ comment.merchandiser.name.en }}</h5>
          <p class="text-muted">
            {{ new Date(comment.task_date).toLocaleString() }}
          </p>
        </b-media>
      </template>
      <div class="d-block p-0">
        <template>
          <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
            >
              <div v-if="comment.media">
                <b-carousel-slide
                  v-for="mediaItem of comment.media"
                  :key="mediaItem.id"
                >
                  <template v-slot:img>
                    <img
                      v-if="mediaItem.media_file_type === 'image'"
                      :src="mediaItem.media_path"
                      class="d-block img-fluid w-100"
                      width="1024"
                      height="480"
                      alt="image slot"
                    />
                    <video
                      v-if="mediaItem.media_file_type === 'video'"
                      :src="mediaItem.media_path"
                      class="d-block img-fluid w-100"
                      width="1024"
                      height="480"
                    />
                    <audio
                      v-if="mediaItem.media_file_type === 'audio'"
                      :src="mediaItem.media_path"
                      class="d-block img-fluid w-100 js-player"
                    />
                  </template>
                </b-carousel-slide>
              </div>
              <div v-if="comment.feeds">
                <b-carousel-slide
                  v-for="(feed, feedIndex) of comment.feeds"
                  :key="feedIndex + comment.id"
                >
                  <template v-slot:img>
                    <img
                      v-if="feed.media.media_file_type === 'image'"
                      :src="feed.media.media_path"
                      class="d-block img-fluid w-100"
                      width="1024"
                      height="480"
                      alt="image slot"
                    />
                  </template>
                </b-carousel-slide>
              </div>
            </b-carousel>
            <p class="pt-3">
              {{ comment.comment }}
            </p>
          </div>
        </template>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable */
import Plyr from 'plyr'

export default {
  name: 'MediaModal',
  props: {
    modalId: {
      type: [Number, String],
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      slide: 1,
      player: Plyr
    }
  },
  mounted() {
    this.player.setup('.js-player')
  }
}
</script>
