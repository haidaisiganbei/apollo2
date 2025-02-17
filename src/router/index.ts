import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/Login.vue')
  // },
  {
    path: '/',
    component: () => import('@/layout/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'data',
        component: () => import('@/views/Data.vue')
      },
      {
        path: 'ai',
        component: () => import('@/views/AI.vue')
      },
      {
        path: 'setting',
        component: () => import('@/views/Setting.vue')
      },
     
      // 其他子路由...
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router