<template>
  <HeaderComponent></HeaderComponent>
  <div class="detail-wrapper">
    <AlertComponent></AlertComponent>
    <div class="product-wrapper">
      <div class="product-head">
        <div class="product-img" :style="`background-image: url('${storeProduct.product?.avatar}')`">
        </div>
        <div class="product-text">
          <div class="product-name">商品名稱: <span class="text-span">{{ storeProduct.product?.name }}</span></div>
          <div class="seller">商家資訊: <span class="text-span">{{ storeProduct.product?.User?.name }}</span></div>
          <div class="product-name">商品存貨量: <span class="text-span">{{ storeProduct.product?.inventory_quantity }}</span>
          </div>
          <div class="price"> 商品售價: <span class="text-price">$ {{ storeProduct.product?.price }}</span></div>
        </div>
      </div>
      <div class="product-description">
        商品描述: <span class="description-span">{{ storeProduct.product?.description }}</span>
      </div>
      <div class="product-button">
        <ButtonComponent msg="上一頁" backgroundColor="background-color:#BEBEBE" @click="goBack()">
        </ButtonComponent>
        <ButtonComponent v-if="storeLogin.buttonOn" msg="加入購物車" backgroundColor="background-color:#FF9797"
          @click="addToShopcar(storeProduct.product?.id)">
        </ButtonComponent>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AlertComponent from '../components/AlertComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'
import { useLoginStore } from '../stores/login'
import { productStore } from '../stores/product'
import { useMessageStore } from '../stores/message'
const storeLogin = useLoginStore()
const storeProduct = productStore()
const storeMessage = useMessageStore()
const router = useRoute()

{
  AlertComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
}

// message初始化
storeMessage.clearErrorMessages()
storeMessage.clearSuccessMessages()

// 加入購物車api

const addToShopcar = async (productId) => {

  window.scrollTo({ top: 0, behavior: 'smooth' })
  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.POST(`/api/v1/shopcars/${productId}`, undefined, token)
  const { success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功
  return storeMessage.setSuccess(message)

}

// 顯示單一商品api
onMounted(async () => {

  const productId = router.params.product_id
  const res = await axiosHelper.GET(`/api/v1/products/${productId}`)
  const { data, success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)
  // api成功
  return storeProduct.product = data.product
})

// 上一頁按鈕
const goBack = () => {
  window.history.back()
}


</script>

<style scoped>
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1.2fr 0.5fr;
  grid-gap: 5px;
  height: auto;
  max-height: 800px;
  width: 800px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.product-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
}

.product-img {
  width: 300px;
  height: 300px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.product-text {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
  padding: 100px 50px 100px 0px;
  font-size: 15px;
  color: #5B5B5B;
}

.text-span {
  font-size: 18px;
  padding-left: 20px;
}

.text-price {
  font-size: 25px;
  padding-left: 20px;
  color: red;
}

.product-description {
  line-height: 40px;
  font-size: 15px;
  font-weight: 500;
  padding: 5px;
  color: #5B5B5B;
}

.description-span {
  padding-left: 10px;
}

.product-button {
  display: grid;
  grid-template-columns: 0.14fr 0.2fr;
  grid-template-rows: 1fr;
  grid-gap: 40px;
  align-items: center;
  padding: 10px;
}
</style>