<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn class="desktop-hide" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="/images/icons/android-chrome-256x256.png" />
          </q-avatar>
          riks Energy Hütte
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs class="mobile-hide" align="left">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/comp" label="Companys" />

        <q-route-tab to="/about" label="Impressum" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <q-tabs vertical>
        <q-toolbar-title style="margin: 10px">Menu</q-toolbar-title>
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/comp" label="Companys" />
        <q-route-tab to="/about" label="Impressum" />
      </q-tabs>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style>
.app-bar {
  background-color: white;
}

.tablescroll {
  overflow-y: scroll;
  height: 600px;
  width: 70%;
  margin-right: 8px;
}

.home {
  display: flex;
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
