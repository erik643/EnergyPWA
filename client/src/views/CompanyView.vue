<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-table
          title="Companys"
          :rows="rows"
          :columns="columns"
          row-key="name"
          dark
          color="amber"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js';
import router from '@/router';
const store = useCounterStore();
if (store.profile.username == undefined) {
  router.push('/');
}

const columns = [
  {
    name: 'name',
    align: 'center',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  { name: 'cal', label: 'Kalorien', align: 'center', field: 'cal', sortable: true },
  { name: 'price', label: 'Preis', align: 'center', field: 'price', sortable: true },
  { name: 'Trating', label: 'Taste Rating', align: 'center', field: 'trating', sortable: true },
  { name: 'Arating', label: 'Overall Rating', align: 'center', field: 'arating', sortable: true },
];

const rows = [
  {
    name: 'Red Bull Original',
    cal: 500,
    price: 2.5,
    trating: 4,
    arating: 4.5,
  },
  {
    name: 'Monster Ultra Sunrise',
    cal: 100,
    price: 3.5,
    trating: 3.5,
    arating: 3.7,
  },

  {
    name: 'Rockstar Punched',
    cal: 250,
    price: 2.75,
    trating: 4.1,
    arating: 4.2,
  },

  {
    name: 'Amp Energy Original',
    cal: 300,
    price: 2.25,
    trating: 3.9,
    arating: 4.1,
  },

  {
    name: 'Full Throttle Original',
    cal: 160,
    price: 2.75,
    trating: 3.5,
    arating: 3.7,
  },

  {
    name: 'Reign Total Body Fuel',
    cal: 200,
    price: 3.25,
    trating: 4.2,
    arating: 4.3,
  },
  {
    name: 'Xyience Xenergy',
    cal: 120,
    price: 2.5,
    trating: 4.0,
    arating: 4.2,
  },
  {
    name: 'Gatorade G2',
    cal: 20,
    price: 1.75,
    trating: 3.5,
    arating: 3.7,
  },
  {
    name: 'NOS High Performance Energy',
    cal: 340,
    price: 2.25,
    trating: 4.1,
    arating: 4.3,
  },

  {
    name: 'Bang Energy',
    cal: 160,
    price: 3.0,
    trating: 4.0,
    arating: 4.2,
  },

  {
    name: 'Rip It Energy Fuel',
    cal: 500,
    price: 3.5,
    trating: 3.9,
    arating: 4.1,
  },
];
</script>
