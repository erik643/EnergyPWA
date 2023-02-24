import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CompanyView from '@/views/CompanyView.vue';
import DetailView from '@/views/DetailView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/comp',
      name: 'company',
      component: CompanyView,
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
    },
  ],
});

export default router;
