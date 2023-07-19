<template>
  <header>
    <div class="title-wrapper">
      <a class="title" href="/">我的電商網站</a>
    </div>
    <div class="func-wrapper">
      <div v-if="isBuyer" class="shopcarPic">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div v-if="isSeller" class="storePic">
        <i class="fa-solid fa-store"></i>
      </div>
      <router-link to="/user/login" class="user-login-wrapper" @click="clickHandler()">
        <ButtonComponent :msg="msg" backgroundColor="background-color:#FFBD9D"></ButtonComponent>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import Cookies from 'js-cookie'
import tokenHelpers from '../../helpers/token-helpers'
import axiosHelper from '../../helpers/axios-helper'
import ButtonComponent from './ButtonComponent.vue'

{
  ButtonComponent
}

const emit = defineEmits(['logout-text'])
const msg = ref('')
const isBuyer = ref('')
const isSeller = ref('')

onMounted(async () => {

  // 將token放進header中發送驗證

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/users', undefined, token)
  const { success, user } = res.data

  // api失敗
  if (!success) {
    isBuyer.value = false
    msg.value = 'login'
  }
  // api成功
  if (success && user.role === 'buyer') {
    // 買家

    isBuyer.value = true
    msg.value = 'logout'
  } else if (success && user.role === 'seller') {
    // 賣家

    isSeller.value = true
    msg.value = 'logout'
  }
})

const clickHandler = () => {
  if (msg.value === 'logout') {
    Cookies.remove('hexToken')
    emit('logout-text', true, '登出成功')
  }
}

</script>

<style scoped>
/* header */
header {
  background-color: #FF5809;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
}

.title-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 40px;
}

.func-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.shopcarPic, .storePic {
  padding-right: 10px;
  font-size: 25px;
  cursor: pointer;
  color: #F0F0F0;
}

.shopcarPic:hover, .storePic:hover {
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