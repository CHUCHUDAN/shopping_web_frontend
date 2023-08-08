<template>
  <div class="product-wrapper" v-for="(item) in storeStore.products" v-bind:key="item.id">
    <div class="data-wrapper">
      <div class="product-pic" :style="`background-image: url('${item.avatar}')`" @click="toDetailProduct(item.id)"></div>
      <div class="product-data">
        <div class="product-price">售價: $ {{ item.price }}</div>
        <div class="product-num">存貨量: {{ item.stock }}</div>
      </div>
    </div>
    <div class="userData-wrapper">
      <div class="product-name">商品名稱: {{ item.name }}</div>
      <div class="product-description">商品描述: {{ item.description }}</div>
      <div class="product-description">商品分類: {{ item.Category?.name }}</div>
      <div class="delete-button">
        <i v-if="storeLogin.isSelfUser" class="fa-solid fa-trash delete" product-id="item.product_id"
          @click="storeStore.deleteStore(item.id)"></i>
        <i v-if="storeLogin.isSelfUser" class="fa-solid fa-pen edit" @click="toEditProduct(item.id)"></i>
        <span class="add-time">上架時間: {{ item.addShopTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useLoginStore } from '../stores/login'
import { useStore } from '../stores/store-product'
import router from '../router'

const storeLogin = useLoginStore()
const storeStore = useStore()

// 跳轉至商品詳細頁
const toDetailProduct = (product_id) => {
  router.push(`/product/${product_id}`)
}

// 跳轉至商品編輯頁
const toEditProduct = (product_id) => {
  router.push(`/product/edit/${product_id}`)
}

</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 100%;
  grid-gap: 5px;
  height: 150px;
  width: 700px;
  padding: 15px;
  border-radius: 10px;
  position: relative;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.data-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  grid-gap: 5px;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.product-price {
  margin-right: 10px;
}

.product-pic {
  width: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}

.product-data {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
}



.userData-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  align-items: center;
  justify-items: flex-start;
  font-size: 15px;
}


.delete {
  cursor: pointer;
  color: #FF8F59;
}

.delete:hover {
  color: red;
}

.edit {
  cursor: pointer;
  margin-left: 20px;
  color: #84C1FF;
}

.edit:hover {
  color: #004B97;
}

.delete-button {
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  width: 100%
}

.add-time {
  font-size: 10px;
  margin-right: 20px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>