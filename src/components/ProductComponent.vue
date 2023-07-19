<template>
  <div class="product-wrapper" v-for="(item) in products" v-bind:key="item.id">
    <div class="product-img" :style="`background-image: url('${item.avatar}')`"></div>
    <div class="product-text">
      <div class="product-name">{{ item.name }}</div>
      <div class="product-text">{{ item.description }}</div>
    </div>
    <div class="product-price">
      <div class="product-price"> $ {{ item.price }}</div>
      <ButtonComponent msg="加入購物車" backgroundColor="background-color:#FF9797" @click="addToShopcar(item.id)">
      </ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'
import ButtonComponent from './ButtonComponent.vue'

{
  ButtonComponent
}

const emit = defineEmits(['add-to-shopcar'])
defineProps({
  products: {}
})

// 加入購物車api

const addToShopcar = async (productId) => {

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.POST(`/api/v1/shopcars/${productId}`, undefined, token)
  const { success, message } = res.data
  return emit('add-to-shopcar', success, message)

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
  background-size: 100%;
}

.product-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
}

.product-price {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>