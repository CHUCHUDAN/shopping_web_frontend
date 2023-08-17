<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>Reset Password</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="mailToReset" :class="storeForm.formClass" novalidate>
        <FormComponent label-for="email" label-text="信箱" span-text="※注意信箱為必填，請輸入3-50字信箱" input-placeholder="請輸入有效信箱"
          input-type="email" min-length="3" max-length="50" inputRequired="true" invalid-text='此項目為必填，請輸入正確信箱格式'
          :value="storeForm.email">
        </FormComponent>
        <div class="button-wrapper">
          <i class="fa-solid fa-circle-arrow-left back" @click="goBack()"></i>
          <ButtonComponent msg="next" backgroundColor="background-color:#FFBD9D" type="submit"
            @click="storeForm.addFormClass()">
          </ButtonComponent>
        </div>
      </form>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '../stores/message'
import { useFormStore } from '../stores/form-store'
import { useLoginStore } from '../stores/login'
import ButtonComponent from '../components/ButtonComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const router = useRouter()
const storeMessage = useMessageStore()
const storeForm = useFormStore()
const storeLogin = useLoginStore()

{
  ButtonComponent
  FormComponent
  AlertComponent
  HeaderComponent
  FooterComponent
}

// message初始化
storeMessage.messageInitialization()

// 登入狀態下會被導回首頁

onMounted(() => {
  if (storeLogin.isUser) return router.push('/')

  // 表單樣式重置
  storeForm.formClass = ''

  // email 重置
  storeForm.email = ''
})

// 忘記密碼 && 寄送驗證信
const mailToReset = async (e) => {
  const form = e.target
  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()

  // 寄送驗證信函式
  const mailResult = await storeLogin.mailToReset()
  if (mailResult) return
  router.push('/user/login')
}

// 上一頁按鈕
const goBack = () => {
  window.history.back()
}

</script>

<style scoped>
.form-wrapper {
  width: 40%;
  max-width: 600px;
  height: auto;
  border-radius: 40px;
  padding: 50px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: brown;
  margin-bottom: 30px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
}

.button-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 50px;
  grid-gap: 10px;
  justify-content: flex-start;
  align-items: center;
}

.back {
  font-size: 35px;
  color: #ADADAD;
  cursor: pointer;
  margin-left: 10px;
}

.back:hover {
  color: black;
}
</style>