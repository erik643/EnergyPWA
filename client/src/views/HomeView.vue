<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-table title="Energys" :rows="rows" :columns="columns" row-key="name" dark color="amber">
          <template v-slot:body-cell-bild="props">
            <q-td :props="props">
              <div>
                <img :src="'images/' + props.value" alt="" />
              </div>
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-Photo="props">
            <q-td :props="props">
              <div>
                <q-btn
                  label="Take a Photo"
                  color="primary"
                  @click="(dialog = true), initializeCamera(), ($event) => (curimg = props.value)"
                />
              </div>
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template></q-table
        >
      </div>
    </div>

    <!-- -----------
Pop Up
---------------- -->

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

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <video ref="videoPlayer" autoplay></video>
          <q-btn v-close-popup @click="capturePhoto">Capture Photo</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
let dialog = ref(false);
let maximizedToggle = ref(true);
const videoPlayer = ref(null);
let curimg = ref(null);
async function initializeCamera() {
  console.log(curimg);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoPlayer.value.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

function capturePhoto() {
  const canvas = document.createElement('canvas');
  const video = videoPlayer.value;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL('image/png');
  console.log(imageDataURL);
  uploadImage(imageDataURL);
}

async function uploadImage(imageDataURL) {
  try {
    const response = await axios.post('/img', { image: imageDataURL });
    // const response = await axios.post('/img', { image: imageDataURL });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// async function getPic(id) {
//   const { data } = await axios.get('/employees');
//   data.value = curimg;
// }

const columns = [
  {
    name: 'name',
    align: 'center',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  { name: 'bild', label: 'Bild', align: 'center', field: 'image', sortable: false },

  { name: 'cal', label: 'Kalorien', align: 'center', field: 'cal', sortable: true },
  { name: 'price', label: 'Preis', align: 'center', field: 'price', sortable: true },
  { name: 'Trating', label: 'Taste Rating', align: 'center', field: 'trating', sortable: true },
  { name: 'Arating', label: 'Overall Rating', align: 'center', field: 'arating', sortable: true },
  { name: 'Photo', label: 'Photo', align: 'center', field: 'aaa', sortable: false },
];

const rows = [
  {
    name: 'Red Bull Original',
    image: 'energy.png',
    cal: 500,
    price: 2.5,
    trating: 4,
    arating: 4.5,
  },
  {
    name: 'Monster Ultra Sunrise',
    image: 'energy.png',

    cal: 100,
    price: 3.5,
    trating: 3.5,
    arating: 3.7,
  },

  {
    name: 'Rockstar Punched',
    image: 'energy.png',

    cal: 250,
    price: 2.75,
    trating: 4.1,
    arating: 4.2,
  },

  {
    name: 'Amp Energy Original',
    image: 'energy.png',

    cal: 300,
    price: 2.25,
    trating: 3.9,
    arating: 4.1,
  },

  {
    name: 'Full Throttle Original',
    image: 'energy.png',

    cal: 160,
    price: 2.75,
    trating: 3.5,
    arating: 3.7,
  },

  {
    name: 'Reign Total Body Fuel',
    image: 'energy.png',

    cal: 200,
    price: 3.25,
    trating: 4.2,
    arating: 4.3,
  },
  {
    name: 'Xyience Xenergy',
    image: 'energy.png',

    cal: 120,
    price: 2.5,
    trating: 4.0,
    arating: 4.2,
  },
  {
    name: 'Gatorade G2',
    image: 'energy.png',

    cal: 20,
    price: 1.75,
    trating: 3.5,
    arating: 3.7,
  },
  {
    name: 'NOS High Performance Energy',
    image: 'energy.png',

    cal: 340,
    price: 2.25,
    trating: 4.1,
    arating: 4.3,
  },

  {
    name: 'Bang Energy',
    image: 'energy.png',

    cal: 160,
    price: 3.0,
    trating: 4.0,
    arating: 4.2,
  },

  {
    name: 'Rip It Energy Fuel',
    image: 'energy.png',

    cal: 500,
    price: 3.5,
    trating: 3.9,
    arating: 4.1,
  },
];
</script>
