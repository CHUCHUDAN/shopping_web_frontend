import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 登入頁面
    {
      path: '/user/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    // 註冊頁面
    {
      path: '/user/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    // 購物車頁面
    {
      path: '/shopcars',
      name: 'shopcar',
      component: () => import('../views/ShopcarPage.vue')
    },
    // 商家頁面
    {
      path: '/stores',
      name: 'store',
      component: () => import('../views/StorePage.vue')
    },
    // 商家上架商品頁面
    {
      path: '/addStore',
      name: 'addstore',
      component: () => import('../views/AddStore.vue')
    },
    // 商家編輯商品頁面
    {
      path: '/product/edit/:product_id',
      name: 'productEdit',
      component: () => import('../views/ProductEditPage.vue')
    },
    // 商品詳細頁
    {
      path: '/product/:product_id',
      name: 'product',
      component: () => import('../views/ProductDetailPage.vue')
    },
    // 首頁
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    // 如果沒有配對的路由
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

export default router
