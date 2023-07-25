<template>
  <header>
    <div class="title-wrapper">
      <router-link to="/" class="title">
        <img class="logo-img" src="../../public/shark_logo.png" alt="圖片未正確顯示">
        <div class="logo-text">丹尼購物</div>
      </router-link>
    </div>
    <div class="func-wrapper">
      <router-link to="/user/profile" class="userPic" v-if="storeLogin.isUser">
        <div class="user-pic" :style="`background-image: url('${storeLogin.user.avatar}')`">
        </div>
        <div class="user-account">{{ storeLogin.user.account }}</div>
      </router-link>
      <router-link to="/shopcars" v-if="storeLogin.isBuyer" class="shopcarPic">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
      <router-link to="/stores" v-if="storeLogin.isSeller" class="storePic">
        <i class="fa-solid fa-store"></i>
      </router-link>
      <router-link to="/user/login" class="user-login-wrapper" @click="clickHandler()">
        <ButtonComponent :msg="msg" backgroundColor="background-color:#FFBD9D"></ButtonComponent>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLoginStore } from '../stores/login'
import { useMessageStore } from '../stores/message'
import tokenHelpers from '../../helpers/token-helpers'
import axiosHelper from '../../helpers/axios-helper'
import ButtonComponent from './ButtonComponent.vue'
const storeLogin = useLoginStore()
const storeMessage = useMessageStore()


{
  ButtonComponent
}

const msg = ref('')


onMounted(async () => {

  // 將token放進header中發送驗證

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/users', undefined, token)
  const { success, data } = res.data


  // api失敗
  if (!success) {
    storeLogin.setisBuyer(false)
    storeLogin.setisSeller(false)
    storeLogin.setButtonOn(false)
    storeLogin.setIsUser(false)
    storeLogin.user = ''
    msg.value = 'login'
  }

  // api成功
  if (success && data.user.role === 'buyer') {
    // 買家

    storeLogin.setisBuyer(true)
    storeLogin.setisSeller(false)
    storeLogin.setButtonOn(true)
    storeLogin.setIsUser(true)
    storeLogin.user = data.user
    msg.value = 'logout'

  } else if (success && data.user.role === 'seller') {
    // 賣家

    storeLogin.setisSeller(true)
    storeLogin.setisBuyer(false)
    storeLogin.setButtonOn(false)
    storeLogin.setIsUser(true)
    storeLogin.user = data.user
    msg.value = 'logout'
  }
})

const clickHandler = () => {
  if (msg.value === 'logout') {
    storeMessage.setSuccess('登出成功')
    localStorage.removeItem("token")
    storeLogin.setisBuyer(false)
    storeLogin.setisSeller(false)
    storeLogin.setButtonOn(false)
    storeLogin.setIsUser(false)
    storeLogin.user = ''
    msg.value = 'login'
  }
}

</script>

<style scoped>
/* header */
header {
  background-color: #FF5809;
  display: grid;
  height: 80px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
}

.logo-img {
  height: 80px;
  margin-left: 10px;
}

.logo-text {
  color: #F0F0F0;
  font-size: 25px;
  margin-left: 5px;
}

.title-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 40px;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.func-wrapper {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.userPic {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.user-pic {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.user-account {
  margin-left: 10px;
  color: white;
  font-size: 15px;
  text-decoration: none;
}


.user-account:hover {
  color: #5B5B5B;
}

.shopcarPic,
.storePic {
  padding-right: 10px;
  font-size: 25px;
  cursor: pointer;
  color: #F0F0F0;
}

.shopcarPic:hover,
.storePic:hover {
  color: #5B5B5B
}

.user-login-wrapper {
  display: grid;
  grid-template-columns: 100px;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  text-decoration: none;
}

.user-logout-wrapper {
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
}

.user-data-wrapper {
  display: flex;
  justify-content: flex-end;
}

.user-profile-link {
  color: black;
  padding-left: 5px;
}
</style>