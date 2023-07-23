<template>
  <HeaderComponent></HeaderComponent>
  <div class="users-wrapper">
    <AlertComponent></AlertComponent>
    <div class="user-wrapper">
      <div class="user-head">
        <div class="user-img" :style="`background-image: url('${storeLogin.user.avatar}')`">
        </div>
        <div class="user-text">
          <div class="user-name">名稱: <span class="text-span">{{ storeLogin.user.name }}</span></div>
          <div class="user-account">帳號: <span class="text-span">{{ storeLogin.user.account }}</span></div>
          <div class="user-role">帳號類型: <span class="text-span">{{ storeLogin.user.role }}</span></div>
          <div class="user-email" v-if="storeLogin.user.email"> email: <span class="text-span"> {{ storeLogin.user.email
          }}</span></div>
          <div class="user-phone" v-if="storeLogin.user.phone"> phone: <span class="text-span"> {{ storeLogin.user.phone
          }}</span></div>
          <div class="user-created-time"> 加入時間: <span class="text-span"> {{ storeLogin.user.createdTimeFromNow }}</span>
          </div>
          <div class="user-product-count" v-if="storeLogin.user.productsCount"> 商品數量: <span class="text-span"> {{
            storeLogin.user.productsCount }}</span></div>
        </div>
      </div>
      <div class="user-button">
        <i class="fa-solid fa-circle-arrow-left back" @click="goBack()"></i>
        <i class="fa-solid fa-pen edit"></i>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import AlertComponent from '../components/AlertComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useMessageStore } from '../stores/message'
import { useLoginStore } from '../stores/login'
const storeMessage = useMessageStore()
const storeLogin = useLoginStore()

{
  AlertComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
}

// message初始化
storeMessage.clearErrorMessages()
storeMessage.clearSuccessMessages()

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
  width: 800px;
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
  width: 300px;
  height: 300px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
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
</style>