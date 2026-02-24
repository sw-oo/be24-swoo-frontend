import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Board',
      component: () => import('../views/BoardList.vue'),
    },
    {
      path: '/create',
      name: 'CreatePost',
      component: () => import('../views/CreatePost.vue'),
    },
  ],
})

export default router
