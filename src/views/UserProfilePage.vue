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
        <router-link to="/user/profile/edit">
          <i class="fa-solid fa-pen edit"></i>
        </router-link>
        <router-link to="/user/password/edit">
          <i class="fa-solid fa-lock password"></i>
        </router-link>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>

import { onMounted } from 'vue'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useMessageStore } from '../stores/message'
import { useLoginStore } from '../stores/login'
import router from '../router'
const storeMessage = useMessageStore()
const storeLogin = useLoginStore()

{
  AlertComponent
  HeaderComponent
  FooterComponent
}

// message初始化
const message = ['個人資料修改成功', '密碼修改成功']
storeMessage.messageInitialization(message)

// 檢查是否登入過，未登入會被導向首頁
onMounted(() => {
  if (!storeLogin.isUser) return router.push('/')
})

// 上一頁按鈕
const goBack = () => {
  window.history.back()
}

</script>

<style scoped>
.users-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
</style>