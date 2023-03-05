<template>
  <div class="container row justify-center">
    <q-card v-if="login" class="my-card">
      <q-card-section class="row justify-center">
        <div class="text-h5 text-weight-bolder ">Login</div>
      </q-card-section>

      <!-- ------------------------------------------------------------------------------------------------
                                LOG IN -->

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-12 col-md-6">
        <q-card-section>
          <q-input
            rounded
            outlined
            v-model="username"
            label="Username *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            rounded
            outlined
            type="password"
            v-model="pwd"
            label="Password *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-toggle v-model="accept" label="Remember Me" />
        </q-card-section>

        <q-card-actions vertical>
          <q-btn label="Login" type="submit" color="warning" />
          <q-btn label="Reset" type="reset" color="warning" flat class="q-ml-sm" />
          <q-btn
            label="Don't got an account? Sign in here!"
            color="warning"
            flat
            class="q-ml-sm text-caption"
            @click="login = false"
          />
        </q-card-actions>
      </q-form>
    </q-card>

    <!-- ------------------------------------------------------------------------------------------------ -->
    <!-- SIGN IN -->
    <q-card v-if="!login" class="my-card">
      <q-card-section class="row justify-center">
        <div class="text-h5 text-weight-bolder">Sign In</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md col-12 col-md-6">
        <q-card-section>
          <q-input
            rounded
            outlined
            v-model="signname"
            label="First Name *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            rounded
            outlined
            v-model="username"
            label="Username *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              (val) => !check(val) || 'Taken',
            ]"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            rounded
            outlined
            type="password"
            v-model="pwd"
            label="Password *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />
        </q-card-section>
        <q-card-section>
          <q-toggle v-model="accept" label="Remember Me" />
        </q-card-section>

        <q-card-actions vertical>
          <q-btn label="Sign In" type="submit" color="warning" />
          <q-btn label="Reset" type="reset" color="warning" flat class="q-ml-sm" />
          <q-btn
            label="Got an account? Login in here!"
            color="warning"
            flat
            class="q-ml-sm text-caption"
            @click="login = true"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { Notify } from 'quasar';
import { useCounterStore } from '@/stores/counter.js';
const store = useCounterStore();
const name = ref(null);
const signname = ref(null);
const username = ref(null);
const login = ref(true);
const pwd = ref(null);
const accept = ref(false);
store.getAllUsers();
store.profile = {};

function check(user) {
  for (const name of store.check) {
    if (name == user) {
      return true;
    }
  }
}

async function onSubmit() {
  if (login.value) {
    const user = {
      username: username.value,
      pwd: pwd.value,
    };

    await store.loginUser(user);

    if (store.profile != 'Haram') {
      router.push('/home');
    } else {
      Notify.create({
        message: 'No User with that information, try something else and try to be lucky (ged gud)',
        position: 'top',
        color: 'info',
      });
    }
  } else {
    const user = {
      firstname: signname.value,
      username: username.value,
      pwd: pwd.value,
    };
    await store.addUser(user);
    router.push('/home');
  }
}

function onReset() {
  name.value = null;
  pwd.value = null;
  signname.value = null;
  username.value = null;
  accept.value = false;
}
</script>

<style lang="scss">
.my-card {
  margin-top: 3%;
}
</style>
