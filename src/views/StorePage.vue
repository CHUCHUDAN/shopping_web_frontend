<template>
  <HeaderComponent></HeaderComponent>
  <div class="store-wrapper">
    <AlertComponent>
    </AlertComponent>
    <div class="add-wrapper">
      <div class="add-button">
        <router-link  to="/addStore">
          <ButtonComponent msg="上架商品" backgroundColor="background-color:#FFBD9D" ></ButtonComponent>
        </router-link>
      </div>
    </div>
    <div class="products-wrapper" >
      <StoreProduct></StoreProduct>
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
import StoreProduct from '../components/StoreProduct.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
const router = useRouter()
const storeMessage = useMessageStore()
const storeProduct = productStore()

{
  AlertComponent
  HeaderComponent
  FooterComponent
  StoreProduct
  ButtonComponent
}

// message初始化
storeMessage.clearErrorMessages()

onMounted(async () => {
  // 將token放進header中發送驗證

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/users', undefined, token)
  const { success, user } = res.data

  // api失敗
  if (!success || user.role !== 'seller') {
    return router.push('/')
  }
})

// 取得商家所有商品api
onMounted(async () => {

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/stores', undefined, token)
  const { success, message, data } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功
  return storeProduct.setProduct(data.products)
})


</script>

<style scoped>

.add-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 800px;
  margin: 0 auto;
  align-items: center;
  padding: 20px;
}

.add-button {
  padding-right: 20px;
}


.products-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
}
</style>