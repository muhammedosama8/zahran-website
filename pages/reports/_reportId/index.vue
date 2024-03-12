<template>
    <div class="row">
        <div class="col-12">
            <div class="card p-3">
                <div v-if="report.type == 'competition-sell-out' || report.type == 'competition-stock-count'" class="row">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ report.date }}</h5>
                                <h6 class="textmuted mb-0">Time</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ demo.name.en }}</h5>
                                <h6 class="textmuted mb-0">Demo Name</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ branch.name.en }}</h5>
                                <h6 class="textmuted mb-0">Branch Name</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ report.competition_name }}</h5>
                                <h6 class="textmuted mb-0">Competition Name</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ report.date }}</h5>
                                <h6 class="textmuted mb-0">Time</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ demo.name.en }}</h5>
                                <h6 class="textmuted mb-0">Demo Name</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5>{{ branch.name.en }}</h5>
                                <h6 class="textmuted mb-0">Branch Name</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive bg-white shadow py-3">
                    <b-table v-if="report.type == 'stock-count' || report.type == 'supply-order'"
                        :items="products"
                        :fields="productfields"
                        :busy="$fetchState.pending"
                        responsive="lg"
                        :per-page="0"
                        empty-text="No Products"
                        :show-empty="true"
                        class="QuantityTable"
                    >
                    </b-table>
                    <b-table v-else-if="report.type == 'sell-out'"
                        :items="products"
                        :fields="fullfields"
                        :busy="$fetchState.pending"
                        responsive="lg"
                        :per-page="0"
                        empty-text="No Products"
                        :show-empty="true"
                        class="QuantityTable"
                    >
                    </b-table>
                    <b-table v-else-if="report.type == 'return-report'"
                        :items="products"
                        :fields="returnfields"
                        :busy="$fetchState.pending"
                        responsive="lg"
                        :per-page="0"
                        empty-text="No Products"
                        :show-empty="true"
                        class="QuantityTable"
                    >
                    </b-table>
                    <b-table v-else
                        :items="products"
                        :fields="fields"
                        :busy="$fetchState.pending"
                        responsive="lg"
                        :per-page="0"
                        empty-text="No Products"
                        :show-empty="true"
                        class="editLast"
                    >
                    </b-table>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5>Comment</h5>
                        <p class="mb-0">{{ report.comment }} </p>
                    </div>
                </div>
                <h4 class="py-4 font-weight-bold">Media</h4>
                <div  class="w-100 row" >
                    <div v-for="image in report.media" :key="image.id" class="col-md-4">
                        <div v-if="image.type == 'image'">
                            <b-img
                            class="listImages"
                            :src="image.path"
                            :alt="image.type"
                            ></b-img>
                        </div>
                        <div v-if="image.type == 'audio'" class="py-4 audioN">
                            <audio controls>
                                <source :src="image.path" type="audio/ogg" />
                            </audio>
                        </div>
                        <div v-if="image.type == 'video'" class="viedoH">
                            <div>
                                <video width="320" height="240" controls>
                                    <source :src="image.path" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <!-- <b-embed
                            type="iframe"
                            aspect="16by9"
                            :src="media.media_path"
                            allowfullscreen
                            ></b-embed> -->
                        </div>
                    </div>
                    <!-- <img v-for="image in report.media"
                    :key="image.id" :src="image.path" class="imgMedia" alt="">
                    <audio controls :v-for="audio in report.media">
                        <source :src="audio.path" type="audio/ogg" />
                    </audio> -->
                </div>
            </div>
            <div class="d-flex w-100 justify-content-between pt-4">
                <button
                    class="btn btnCancel"
                    type="submit"
                    @click="
                        $router.go(-1)
                    "
                >
                    Back
                </button>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style src="./index.css"></style>
