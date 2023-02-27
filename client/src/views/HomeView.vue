<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-table
          title="Energys"
          :rows="store.data"
          :columns="columns"
          row-key="name"
          dark
          color="amber"
        >
          <template v-slot:body-cell-bild="props">
            <q-td :props="props">
              <div>
                <img :src="props.value[0]" alt="bild" />
              </div>
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-Photo="props">
            <q-td :props="props">
              <div>
                <q-tabs align="left">
                  <q-route-tab :to="'/detail/' + props.row.id" label="Reviews" />
                </q-tabs>
              </div>
              <div class="my-table-details">
                {{ props.row.details }}
              </div>
            </q-td>
          </template></q-table
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter.js';
const store = useCounterStore();
store.getData();

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

// const rows = [
//   {
//     id: 1,
//     name: 'Red Bull Original',
//     image: 'energy.png',
//     cal: 500,
//     price: 2.5,
//     trating: 4,
//     arating: 4.5,
//   },
//   {
//     id: 2,
//     name: 'Monster Ultra Sunrise',
//     image: 'energy.png',

//     cal: 100,
//     price: 3.5,
//     trating: 3.5,
//     arating: 3.7,
//   },

//   {
//     id: 3,
//     name: 'Rockstar Punched',
//     image: 'energy.png',

//     cal: 250,
//     price: 2.75,
//     trating: 4.1,
//     arating: 4.2,
//   },

//   {
//     id: 4,
//     name: 'Amp Energy Original',
//     image: 'energy.png',

//     cal: 300,
//     price: 2.25,
//     trating: 3.9,
//     arating: 4.1,
//   },

//   {
//     id: 5,
//     name: 'Full Throttle Original',
//     image: 'energy.png',

//     cal: 160,
//     price: 2.75,
//     trating: 3.5,
//     arating: 3.7,
//   },

//   {
//     id: 6,
//     name: 'Reign Total Body Fuel',
//     image: 'energy.png',

//     cal: 200,
//     price: 3.25,
//     trating: 4.2,
//     arating: 4.3,
//   },
//   {
//     id: 7,
//     name: 'Xyience Xenergy',
//     image: 'energy.png',

//     cal: 120,
//     price: 2.5,
//     trating: 4.0,
//     arating: 4.2,
//   },
//   {
//     id: 8,
//     name: 'Gatorade G2',
//     image: 'energy.png',

//     cal: 20,
//     price: 1.75,
//     trating: 3.5,
//     arating: 3.7,
//   },
//   {
//     id: 9,
//     name: 'NOS High Performance Energy',
//     image: 'energy.png',

//     cal: 340,
//     price: 2.25,
//     trating: 4.1,
//     arating: 4.3,
//   },

//   {
//     id: 10,
//     name: 'Bang Energy',
//     image: 'energy.png',

//     cal: 160,
//     price: 3.0,
//     trating: 4.0,
//     arating: 4.2,
//   },

//   {
//     id: 11,
//     name: 'Rip It Energy Fuel',
//     image: 'energy.png',

//     cal: 500,
//     price: 3.5,
//     trating: 3.9,
//     arating: 4.1,
//   },
// ];
</script>
<style>
video {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
}
</style>
