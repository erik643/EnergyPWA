<template>
  <!-- <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98"> -->
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-warning">
      <q-toolbar>
        <q-btn class="absolute" flat @click="drawer = !drawer" round dense icon="menu" />

        <q-toolbar-title class="text-center header text-info text-h4">Energy</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" :width="300" :breakpoint="500" overlay bordered class="bg-grey-3">
      <!-- <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area> -->
      <div>
        <q-img :src="'/images/bg2.jpg'" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="'/images/pfp.jpg'" />
            </q-avatar>
            <div class="text-weight-bold">{{ store.profile.firstname }}</div>
            <div>@{{ store.profile.username }}</div>
          </div>
        </q-img>

        <q-tabs vertical>
          <q-route-tab to="/home" label="Home" />
          <q-route-tab to="/comp" label="Companys" />
          <q-route-tab to="/about" label="Impressum" />
        </q-tabs>
        <q-btn
          color="warning"
          @click="logOut()"
          class="full-width absolute-bottom"
          text-color="white"
          label="Log out"
        />
      </div>
    </q-drawer>

    <!-- <q-toolbar>
        <q-btn class="desktop-hide" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/images/icons/android-chrome-256x256.png" />
          </q-avatar>
          riks Energy Hütte
        </q-toolbar-title>
        <q-avatar class="user">
          <img src="/images/pfp.jpg" />
        </q-avatar>
      </q-toolbar>

      <q-tabs class="mobile-hide" align="left">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/comp" label="Companys" />

        <q-route-tab to="/about" label="Impressum" />
        <q-route-tab to="/login" label="loginTest" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <q-tabs vertical>
        <q-toolbar-title style="margin: 10px">Menu</q-toolbar-title>
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/comp" label="Companys" />
        <q-route-tab to="/about" label="Impressum" />
      </q-tabs>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { useCounterStore } from '@/stores/counter.js';
import router from '@/router';
const store = useCounterStore();
// const leftDrawerOpen = ref(false);

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// };

const drawer = ref(false);

function logOut() {
  localStorage.removeItem('user');
  store.profile = {};

  router.push('/');
}
if (JSON.parse(localStorage.getItem('user')) != null) {
  store.profile = JSON.parse(localStorage.getItem('user'));
}
</script>

<style>
.app-bar {
  background-color: white;
}
body {
  background-color: rgb(24, 21, 21);
}
.tablescroll {
  overflow-y: scroll;
  height: 600px;
  width: 70%;
  margin-right: 8px;
}

@font-face {
  font-family: 'alynx';
  src: local('alynx'), url(/webfonts/ARVAQ.ttf) format('truetype');
}
div {
  font-family: Arial, Helvetica, sans-serif;
}
.header {
  font-family: 'alynx';
}
.home {
  display: flex;
}
.user {
  margin-top: 5px;
}
.sidebar {
  width: 25%;
}
img {
  width: 100%;
  max-width: 550px;
}
.nav-link.router-link-active {
  color: whitesmoke important;
  background-color: red;
}
</style>
