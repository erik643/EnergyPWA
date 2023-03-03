import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CompanyView from '@/views/CompanyView.vue';
import DetailView from '@/views/DetailView.vue';
import LogInView from '@/views/LogInView.vue';

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
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props: true,
      component: DetailView,
    },
  ],
});

export default router;
