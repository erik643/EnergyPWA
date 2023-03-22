<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="row justify-center">
      <h3>Reviews</h3>
    </div>
<div class="row justify-center">
  <!-- <h4 style="margin-top: 0px;">{{store.detail.name}}</h4> -->

</div>
    <div class="row justify-center">
      <q-card
        v-for="r of store.detail.reviews"

        :key="r"
        style="margin-right: 5px"
        class="my-card col-10 col-md-2 bg-warning text-info"
      >
        <img :src="`../${r.image}`" />

        <q-card-section>
          <div class="text-h6">{{ r.title }}</div>
          <div class="text-subtitle2">{{ r.review }}</div>
        </q-card-section>

        <q-card-section>
          Taste
          <q-rating
            v-model="r.taste"
            size="2em"
            color="info"
            readonly
            icon-selected="star"
            icon-half="star_half"
          />
        </q-card-section>

        <q-card-section>
          Overall
          <q-rating
            v-model="r.overall"
            size="2em"
            color="info"
            readonly
            icon-selected="star"
            icon-half="star_half"
          />
        </q-card-section>

        <q-card-section>
          <div class="row justify-center">
            <q-btn
              v-if="r.userid == store.profile.id"
              unelevated
              @click="store.delrev(r.revid, id)"
              rounded
              label="Delete your review"
              style="width: 100%"
              color="negative"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!--


    <div class="row">
      <div class="col-12 col-md-6">
        <q-carousel animated v-model="slide" swipeable arrows navigation infinite>
          <q-carousel-slide
            v-for="(image, id) of store.detail.image"
            :key="image"
            :name="id + 1"
            :img-src="`../${image}`"
          />
        </q-carousel>
      </div>
      <div class="col-12 col-md-6">
        <div>
          <q-card flat bordered class="my-card">
            <q-card-section>
              <div class="text-h6">{{ store.detail.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">{{ store.detail.cal }} </q-card-section>
            <q-card-section class="q-pt-none">{{ store.detail.price }} </q-card-section>
            <q-card-section class="q-pt-none">{{ store.detail.trating }} </q-card-section>
            <q-card-section class="q-pt-none">{{ store.detail.arating }} </q-card-section>
            <q-separator inset />

            <q-card-section>

            </q-card-section>
          </q-card>
        </div>
      </div>
    </div> -->
    <q-btn round class="fixed-bottom-right" color="warning" @click="prompt = true">
      <i class="fa-solid fa-plus"></i>
    </q-btn>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-bar>
          <q-space />

          <q-btn dense @click="currimg = null" flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="title"
              label="Title"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />

            <q-input
              filled
              v-model="rev"
              label="Your review"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />
            <div class="row justify-center">Taste</div>
            <div class="row justify-center">
              <q-rating
                v-model="taster"
                size="2em"
                color="orange"
                icon-selected="star"
                icon-half="star_half"
              />
            </div>
            <div class="row justify-center">Overall</div>
            <div class="row justify-center">
              <q-rating
                v-model="overall"
                size="2em"
                color="orange"
                icon-selected="star"
                icon-half="star_half"
              />
            </div>
            <div class="row justify-center">
              <q-btn
                :disable="currimg != null"
                label="Take a Photo"
                color="warning"
                @click="initializeCamera(), (dialog = true)"
                style="width: 100%"
              ></q-btn>
            </div>

            <div class="row justify-center">
              <q-btn label="Submit" type="submit" color="warning" />
              <q-btn label="Reset" type="reset" color="warning" flat class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense @click="stopCamera()" flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none row justify-center">
          <video ref="videoPlayer" autoplay></video>
        </q-card-section>
        <q-card-section class="q-pt-none row justify-center">
          <q-btn v-close-popup @click="captureAndUpload()">Capture Photo</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import router from '@/router';
import { useCounterStore } from '@/stores/counter.js';
import { ref } from 'vue';
import { Notify } from 'quasar';
import axios from 'axios';
let dialog = ref(false);
let prompt = ref(false);
let title = ref('');
let taster = ref(0);
let overall = ref(0);
let rev = ref('');

let currimg = ref(null);
const store = useCounterStore();
if (store.profile.username == undefined) {
  router.push('/');
}

const id = window.location.pathname.split('/')[2];
store.getDetail(id);
// const detail = ref(store.data[id - 1]);ubbuzbub

const videoPlayer = ref(null);
let maximizedToggle = ref(true);

// store.getImg(id);
// console.log(store.imgs);
async function captureAndUpload() {
  Notify.create({
    message: 'Photo taken and ready to post!',
    position: 'top',
    color: 'info',
  });
  await capturePhoto(id);
}
async function initializeCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoPlayer.value.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

async function capturePhoto() {
  const canvas = document.createElement('canvas');
  const video = videoPlayer.value;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL('image/png');

  currimg.value = imageDataURL;

  stopCamera();
}

async function onSubmit() {
  let ima = null;
  try {
    if (currimg.value == null) {
      ima = '';
    } else {
      ima = currimg.value;
    }
    const response = await axios.post(`/img/${id}`, {
      image: ima,
      review: rev.value,
      title: title.value,
      userid: store.profile.id,
      trating: taster.value,
      arating: overall.value,
    });
    console.log(response.data);
    prompt.value = false;
    await store.getDetail(id);
  } catch (error) {
    console.error(error);
  }
}

function onReset() {
  title.value = '';
  rev.value = '';
  taster.value = 0;
  overall.value = 0;
  currimg.value = null;
}

// async function uploadImage(imageDataURL, id) {

// }

function stopCamera() {
  const stream = videoPlayer.value.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });

  videoPlayer.value.srcObject = null;
}
</script>
<style>
.my-card {
  margin-right: 5px;
}

h3,h4 {
  color: rgb(24, 29, 39);
  font-family: alynx;
}

.fixed-bottom-right {
  margin-bottom: 30px;
  margin-right: 20px;
  width: 70px;
  height: 70px;
}

/* q-carousel {
  width: 100%;
  max-width: 550px;
} */
</style>
