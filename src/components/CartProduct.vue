<template>
  <div class="product-wrapper"  v-for="(item) in storeCart.products" v-bind:key="item.id">
    <div class="data-wrapper">
      <div class="product-pic" :style="`background-image: url('${item.Product.avatar}')`" @click="toDetailProduct(item.Product.id)"></div>
      <div class="product-data">
        <div class="product-price">售價: $ {{ item.Product.price }}</div>
        <div class="product-num">存貨量: {{ item.Product.stock }}</div>
      </div>
    </div>
    <div class="userData-wrapper">
      <div class="product-name">商品名稱: {{ item.Product.name }}</div>
      <div class="product-name">商品分類: {{ item.Product.Category.name }}</div>
      <div class="shopcar-num">購買數量: <span>{{ item.quantity }}</span></div>
      <div class="shopcar-price" >累加金額: <span>$ {{ item.quantity * item.Product.price }}</span></div>
    </div>
    <div class="use-wrapper">
      <div class="control-button">
        <i class="fa-solid fa-circle-plus plus" @click="storeCart.setProductQuantity('plus', item.Product.id)"></i>
        <i class="fa-solid fa-circle-minus minus" @click="storeCart.setProductQuantity('minus', item.Product.id)"></i>
      </div>
      <div class="delete-button">
        <i class="fa-solid fa-trash delete"  product-id="item.product_id" @click="storeCart.deleteCart(item.Product.id)"></i>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted } from 'vue'
import { useCartStore } from '../stores/cart-product'
import router from '../router'

const storeCart = useCartStore()

// 取得購物車所有商品api
onMounted(async () => {
  await storeCart.getCart()
})

// 跳轉至商品詳細頁
const toDetailProduct = (product_id) => {
  router.push(`/product/${product_id}`)
}

</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  height: 300px;
  width: 800px;
  padding: 10px;
  border-radius: 10px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.data-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 1fr;
  grid-gap: 5px;
}

.product-pic {
  width: 100%;
  background-size: 100%;
  cursor: pointer;
}

.product-data {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.userData-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  padding: 40px;
  font-size: 18px;
}

.shopcar-price>span {
  font-weight: 1000;
  color: red;
}

.shopcar-num>span {
  font-weight: 1000;
  color: #3C3C3C;
}

.use-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  padding: 20px;
}

.control-button {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  font-size: 40px;
  place-items: center;
  color: #ACD6FF;
}

.plus,
.minus,
.delete {
  cursor: pointer;
}

.plus {
  color: #6C6C6C;
}

.plus:hover {
  color: #272727;
}

.minus {
  color: #6C6C6C;
}

.minus:hover {
  color: #272727;
}

.delete-button {
  display: flex;
  justify-content: center;
  font-size: 30px;
}

.delete {
  color: #FF8F59;
}

.delete:hover {
  color: red;
}
</style>