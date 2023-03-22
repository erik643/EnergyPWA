<template>
  <div class="imp container d-flex flex-column align-items-center">
    <h2 class="text-center">Impressum</h2>
    <p class="text-center">Erik Sagatelyan</p>
    <p class="text-center">Ohne Gabriel Bericetovic</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js';
import router from '@/router';
const store = useCounterStore();
if (store.profile.username == undefined) {
  router.push('/');
}
</script>
<style>
.imp{
color: rgb(24, 29, 39);
}
</style>
