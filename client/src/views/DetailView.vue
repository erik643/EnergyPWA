<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="row justify-center">
      <h3>Reviews</h3>
    </div>

    <div class="row justify-center">
      <q-card v-for="r of store.detail.reviews" :key="r" class="my-card col-12 col-md-2">
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
            color="orange"
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
            color="orange"
            readonly
            icon-selected="star"
            icon-half="star_half"
          />
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
    <q-btn round class="fixed-bottom-right" color="primary" @click="prompt = true">
      <i class="fa-solid fa-plus"></i>
    </q-btn>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn label="Make Photo" color="primary" @click="(dialog = true), initializeCamera()" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
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
          <q-btn dense flat icon="close" v-close-popup>
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
import axios from 'axios';
let dialog = ref(false);
let prompt = ref(false);
let address = ref('');
let slide = ref(1);
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
  await capturePhoto(id);
  await store.getDetail(id);

  slide.value = 2;
}
async function initializeCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoPlayer.value.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

async function capturePhoto(id) {
  const canvas = document.createElement('canvas');
  const video = videoPlayer.value;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL('image/png');
  console.log(imageDataURL);
  stopCamera();
  await uploadImage(imageDataURL, id);
}

async function uploadImage(imageDataURL, id) {
  try {
    const response = await axios.post(`/img/${id}`, { image: imageDataURL });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

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

h3 {
  color: white;
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
