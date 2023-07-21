<template>
  <div class="product-wrapper" v-for="(item) in storeProduct.products" v-bind:key="item.id">
    <div class="data-wrapper">
      <div class="product-pic" :style="`background-image: url('${item.avatar}')`"></div>
      <div class="product-data">
        <div class="product-price">售價: $ {{ item.price }}</div>
        <div class="product-num">存貨量: {{ item.inventory_quantity }}</div>
      </div>
    </div>
    <div class="userData-wrapper">
      <div class="product-name">商品名稱: {{ item.name }}</div>
      <div class="product-description">商品描述: {{ item.description }}</div>
      <div class="delete-button">
        <i class="fa-solid fa-trash delete" product-id="item.product_id" @click="deleteShop(item.id)"></i>
        <span class="add-time">上架時間: {{ item.addShopTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import tokenHelpers from '../../helpers/token-helpers'
import { productStore } from '../stores/product'
import { useMessageStore } from '../stores/message'
import axiosHelper from '../../helpers/axios-helper'
import ButtonComponent from './ButtonComponent.vue'
const storeProduct = productStore()
const storeMessage = useMessageStore()

{
  ButtonComponent
}


// 刪除商店商品api
const deleteShop = async (productId) => {

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.DELETE(`/api/v1/stores/${productId}`, undefined, token)
  const { success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功
  storeProduct.deleteStoreShop(productId)
  return storeMessage.setSuccess(message)
}


</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 100%;
  grid-gap: 5px;
  height: 150px;
  width: 800px;
  padding: 15px;
  border-radius: 10px;
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
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px;
  align-items: center;
  justify-items: flex-start;
  font-size: 15px;
}


.delete {
  cursor: pointer;
}

.delete-button {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 100%
}

.add-time {
  font-size: 10px;
  margin-right: 20px;
}

.delete {
  color: #FF8F59;
}

.delete:hover {
  color: red;
}
</style>