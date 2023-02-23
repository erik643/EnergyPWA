import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from '@/router';

// Create App
const app = createApp(App)
// add router
app.use(router);
// add store
app.use(createPinia());
// add Quasar
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

// mount frontend
app.mount('#app');


