<template>
  <HeaderComponent></HeaderComponent>
  <div class="users-wrapper">
    <AlertComponent></AlertComponent>
    <div class="user-wrapper">
      <div class="user-head">
        <div class="user-img" :style="`background-image: url('${storeStore.seller.avatar}')`">
        </div>
        <div class="user-text">
          <div class="user-name">名稱: <span class="text-span">{{ storeStore.seller.name }}</span></div>
          <div class="user-account">帳號: <span class="text-span">{{ storeStore.seller.account }}</span></div>
          <div class="user-role">帳號類型: <span class="text-span">{{ storeStore.seller.role }}</span></div>
          <div class="user-email" v-if="storeStore.seller.email"> email: <span class="text-span"> {{ storeStore.seller.email
          }}</span></div>
          <div class="user-phone" v-if="storeStore.seller.phone"> phone: <span class="text-span"> {{ storeStore.seller.phone
          }}</span></div>
          <div class="user-created-time"> 加入時間: <span class="text-span"> {{ storeStore.seller.createdTimeFromNow }}</span>
          </div>
          <div class="user-product-count" v-if="storeStore.seller.productsCount"> 商品數量: <span class="text-span"> {{
            storeStore.seller.productsCount }}</span></div>
        </div>
      </div>
      <div class="user-button">
        <i class="fa-solid fa-circle-arrow-left back" @click="goBack()"></i>
        <router-link to="/user/profile/edit">
          <i v-if="storeLogin.isSelfUser" class="fa-solid fa-pen edit"></i>
        </router-link>
        <router-link to="/user/password/edit">
          <i v-if="storeLogin.isSelfUser" class="fa-solid fa-lock password"></i>
        </router-link>
      </div>
    </div>
    <div class="products-wrapper">
      <StoreProduct></StoreProduct>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import StoreProduct from '../components/StoreProduct.vue'
import { useLoginStore } from '../stores/login'
import { useMessageStore } from '../stores/message'
import { useStore } from '../stores/store-product'

const storeMessage = useMessageStore()
const storeLogin = useLoginStore()
const storeStore = useStore()
const route = useRoute()

{
  AlertComponent
  HeaderComponent
  FooterComponent
  StoreProduct
}

// message初始化
storeMessage.messageInitialization()

// 取得商家資訊api
onMounted(async () => {
  const sellerId = route.params.seller_id
  await storeStore.getSeller(sellerId)
})

// 取得該商家所有商品api
onMounted(async () => {
  const sellerId = Number(route.params.seller_id)
  await storeStore.getSellerProducts(sellerId)
})

// 上一頁按鈕
const goBack = () => {
  window.history.back()
}

</script>

<style scoped>
.user-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 1.2fr;
  grid-gap: 5px;
  height: auto;
  max-height: 800px;
  width: 700px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.user-head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
}

.user-img {
  width: 200px;
  height: 200px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
}

.user-text {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  height: 100%;
  align-items: center;
  font-size: 15px;
  color: #5B5B5B;
}

.text-span {
  font-size: 15px;
  padding-left: 10px;
}


.user-button {
  display: flex;
  align-items: center;
  padding: 10px;
}

.back {
  font-size: 25px;
  color: #ADADAD;
  cursor: pointer;
  margin-left: 10px;
}

.back:hover {
  color: black;
}

.edit {
  cursor: pointer;
  font-size: 25px;
  margin-left: 30px;
  color: #84C1FF;
}

.edit:hover {
  color: #004B97;
}

.password {
  cursor: pointer;
  font-size: 25px;
  margin-left: 30px;
  color: #84C1FF;
}

.password:hover {
  color: #004B97;
}

.products-wrapper {
  width: 700px;
  margin: 50px auto 0 auto;
}

</style>