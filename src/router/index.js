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
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/UserSignup.vue')
    }
  ],
})

export default router
