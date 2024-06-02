import { createRouter, createWebHistory } from 'vue-router';
import HomePageView from '@/views/HomePageView.vue';
import RepoView from '@/views/RepoView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/repos',
      name: 'repo',
      component: RepoView,
      props: true
    }
  ]
})

export default router
