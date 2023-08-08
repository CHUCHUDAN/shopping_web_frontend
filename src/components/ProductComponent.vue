<template>
  <div class="product-wrapper" v-for="(item) in storeProduct.products" v-bind:key="item.id">
    <div class="product-img" :style="`background-image: url('${item.avatar}')`" @click="toDetailProduct(item.id)"></div>
    <div class="product-text">
      <div class="product-name">{{ item.name }}</div>
      <div class="product-text">{{ item.description }}</div>
    </div>
    <div class="product-price">
      <div class="price"> $ {{ item.price }}</div>
      <ButtonComponent v-if="storeLogin.cartButtonOn" msg="加入購物車" backgroundColor="background-color:#FF9797"
        @click="storeCart.postCart(item.id)">
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup>

import { useLoginStore } from '../stores/login'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart-product'
import ButtonComponent from './ButtonComponent.vue'
import router from '../router'

const storeLogin = useLoginStore()
const storeProduct = useProductStore()
const storeCart = useCartStore()

{
  ButtonComponent
}

// 跳轉至商品詳細頁
const toDetailProduct = (product_id) => {
  router.push(`/product/${product_id}`)
}

</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1fr 0.5fr;
  grid-gap: 5px;
  height: 300px;
  width: 230px;
  padding: 10px;
  border-radius: 10px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.product-img {
  width: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}

.product-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
}

.product-price {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-items: center;
  padding: 10px;
}
</style>