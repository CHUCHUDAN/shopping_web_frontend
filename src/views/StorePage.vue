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
import { useMessageStore } from '../stores/message'
import { useStore } from '../stores/store-product'
import { useLoginStore } from '../stores/login'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import StoreProduct from '../components/StoreProduct.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import router from '../router'

const storeMessage = useMessageStore()
const storeStore = useStore()
const storeLogin = useLoginStore()

{
  AlertComponent
  HeaderComponent
  FooterComponent
  StoreProduct
  ButtonComponent
}

// message初始化
const message = ['商品上架成功', '商品編輯成功']
storeMessage.messageInitialization(message)

// 檢查是否為seller
onMounted(() => {
  if (storeLogin.user.role !== 'seller') return router.push('/')
})

// 取得本帳號商家所有商品api
onMounted(async () => {
  await storeStore.getSelfProducts()
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