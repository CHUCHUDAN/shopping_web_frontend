<template>
  <HeaderComponent></HeaderComponent>
  <div class="shopcar-wrapper">
    <AlertComponent>
    </AlertComponent>
    <div class="checkout-wrapper">
      <div class="total-amount">總金額:  {{ storeProduct.totalAmount }}</div>
      <div class="checkout-button">
        <ButtonComponent msg="結帳" backgroundColor="background-color:#FFBD9D" @click="checkoutShopcars"></ButtonComponent>
      </div>
      <div class="updated-button">
        <ButtonComponent msg="更新" backgroundColor="background-color:#FFBD9D" @click="updateShopcars"></ButtonComponent>
      </div>
    </div>
    <div class="products-wrapper" >
      <ShopcarProduct></ShopcarProduct>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import tokenHelpers from '../../helpers/token-helpers'
import axiosHelper from '../../helpers/axios-helper'
import { useMessageStore } from '../stores/message'
import { productStore } from '../stores/product'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ShopcarProduct from '../components/ShopcarProduct.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
const router = useRouter()
const storeMessage = useMessageStore()
const storeProduct = productStore()
{
  AlertComponent
  HeaderComponent
  FooterComponent
  ShopcarProduct
  ButtonComponent
}

// message初始化
storeMessage.clearErrorMessages()
storeMessage.clearSuccessMessages()

onMounted(async () => {
  // 將token放進header中發送驗證

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/users', undefined, token)
  const { success, user } = res.data

  // api失敗
  if (!success || user.role !== 'buyer') {
    return router.push('/')
  }
})

// 取得購物車所有商品api
onMounted(async () => {

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/shopcars', undefined, token)
  const { success, message, data } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功
  storeProduct.totalAmount = data.totalAmount
  return storeProduct.setProduct(data.shopcars)
})


// 更新商品數量api
const updateShopcars = async () => {

  const shopcarsData = storeProduct.products
  const fixData = Object.fromEntries(
    shopcarsData.map(shop => [shop.product_id, shop.quantity])
  )

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.PATCH('/api/v1/shopcars', fixData, token)
  const { success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)
  // api成功
  return storeMessage.setSuccess(message)
}


// 商品結帳api
const checkoutShopcars = async () => {
  const shopcarsData = storeProduct.products
  const fixData = Object.fromEntries(
    shopcarsData.map(shop => [shop.product_id, shop.quantity])
  )

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.POST('/api/v1/shopcars/checkout', fixData, token)
  const { success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)
  // api成功
  storeProduct.productCheckout()
  storeProduct.totalAmount = 0
  return storeMessage.setSuccess(message)
}


</script>

<style scoped>
.checkout-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 800px;
  margin: 0 auto;
  align-items: center;
  padding: 20px;
}

.total-amount {
  padding-right: 20px;
  font-size: 25px;
}

.checkout-button {
  padding-right: 20px;
}

.updated-button {
  font-weight: 700;
  color: white;
}

.products-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
}
</style>