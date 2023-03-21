import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import quasarIconSet from 'quasar/icon-set/material-icons';

import 'quasar/src/css/index.sass';

// Import Quasar css
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from '@/router';

// Create App
const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Notify,
  },
  iconSet: quasarIconSet,
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});
// add router
app.use(router);
// add store
app.use(createPinia());
// add Quasar

// mount frontend
app.mount('#app');
