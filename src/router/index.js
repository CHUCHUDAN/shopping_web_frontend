import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登入頁面
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    // 購物車頁面
    {
      path: '/shopcars',
      name: 'shopcar',
      component: () => import('../views/ShopcarPage.vue')
    },
    // 首頁
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    }
  ]
})

export default router
