<template>
  <HeaderComponent></HeaderComponent>
  <div class="users-wrapper">
    <AlertComponent></AlertComponent>
    <div class="user-wrapper">
      <div class="user-head">
        <div class="user-img" :style="`background-image: url('${storeUser.user.avatar}')`">
        </div>
        <div class="user-text">
          <div class="user-name">名稱: <span class="text-span">{{ storeUser.user.name }}</span></div>
          <div class="user-account">帳號: <span class="text-span">{{ storeUser.user.account }}</span></div>
          <div class="user-role">帳號類型: <span class="text-span">{{ storeUser.user.role }}</span></div>
          <div class="user-email" v-if="storeUser.user.email"> email: <span class="text-span"> {{ storeUser.user.email
          }}</span></div>
          <div class="user-phone" v-if="storeUser.user.phone"> phone: <span class="text-span"> {{ storeUser.user.phone
          }}</span></div>
          <div class="user-created-time"> 加入時間: <span class="text-span"> {{ storeUser.user.createdTimeFromNow }}</span>
          </div>
          <div class="user-product-count" v-if="storeUser.user.productsCount"> 商品數量: <span class="text-span"> {{
            storeUser.user.productsCount }}</span></div>
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
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import StoreProduct from '../components/StoreProduct.vue'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'
import { userStore } from '../stores/user'
import { useLoginStore } from '../stores/login'
import { useMessageStore } from '../stores/message'
import { productStore } from '../stores/product'
import router from '../router'
const storeMessage = useMessageStore()
const storeUser = userStore()
const storeLogin = useLoginStore()
const storeProduct = productStore()
const route = useRoute()

{
  AlertComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
  StoreProduct
}

// message初始化
storeMessage.clearErrorMessages()
storeMessage.clearSuccessMessages()

// 顯示商家資訊
onMounted(async () => {

  // 將token放進header中發送驗證
  const sellerId = route.params.seller_id
  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET(`/api/v1/users/${sellerId}`, undefined, token)
  const { success, data } = res.data

  // api失敗
  if (!success) {
    router.push('/')
  }

  // api成功
  return storeUser.user = data.seller
})

// 取得商家所有商品api
onMounted(async () => {

  const sellerId = Number(route.params.seller_id)
  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET(`/api/v1/stores/${sellerId}`, undefined, token)
  const { success, message, data } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功

  storeProduct.setProduct(data.products)

  // 判斷是否是本帳號seller
  if (sellerId !== storeLogin.user.id) {
    return storeLogin.isSelfUser = false
  }
  return storeLogin.isSelfUser = true
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
  padding-left: 20px;
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