import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to) => {
    if (to.fullPath.match('home')) {
      return {
        top: 0
      }
    }
  },
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
    // 使用者頁面
    {
      path: '/user/profile',
      name: 'profile',
      component: () => import('../views/UserProfilePage.vue')
    },
    // 使用者資料編輯頁面
    {
      path: '/user/profile/edit',
      name: 'profileEdit',
      component: () => import('../views/UserEditPage.vue')
    },
    // 使用者修改密碼
    {
      path: '/user/password/edit',
      name: 'passwordEdit',
      component: () => import('../views/UserEditPasswordPage.vue')
    },
    // 商家個人資訊頁面
    {
      path: '/seller/:seller_id',
      name: 'sellerProfile',
      component: () => import('../views/SellerProfilePage.vue')
    },
    // 購物車頁面
    {
      path: '/carts',
      name: 'cart',
      component: () => import('../views/CartPage.vue')
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
    // 首頁篩選
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    // 首頁分類
    {
      path: '/',
      name: 'category',
      component: () => import('../views/HomeCategoryPage.vue')
    },
    // 如果沒有配對的路由
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'category'
      }
    }
  ]
})

export default router
