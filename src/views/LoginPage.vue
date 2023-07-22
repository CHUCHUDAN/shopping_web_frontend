<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>Login</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="login" :class="formClass" novalidate>
        <FormComponent  label-for="account" label-text="帳號" span-text="※注意請填寫3-50字的帳號"
          input-placeholder="請輸入帳號" input-type="text" min-length="3" max-length="50" inputRequired="true"
          invalid-text="此項目為必填，字數限制3-50">
        </FormComponent>

        <FormComponent  label-for="password" label-text="密碼" span-text="※注意請填寫4-50長度的密碼"
          input-placeholder="請輸入有效密碼" input-type="password" min-length="4" max-length="50" inputRequired="true"
          invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>
        
        <div>
          <ButtonComponent msg="login" backgroundColor="background-color:#FFBD9D" type="submit" @click="addFormClass">
          </ButtonComponent>
        </div>
        <div class="login-text">
          還沒有帳號 ?
        <router-link to="/user/register" class="login-text-link" >註冊</router-link>
      </div>
      </form>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'
import { useRouter } from 'vue-router'
import { useMessageStore } from '../stores/message'
import { useFormStore } from '../stores/form-store'
import ButtonComponent from '../components/ButtonComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
const router = useRouter()
const storeMessage = useMessageStore()
const storeForm = useFormStore()

{
  ButtonComponent
  FormComponent
  AlertComponent
  HeaderComponent
  FooterComponent
}

// message初始化
storeMessage.clearErrorMessages()



// 表單樣式
const formClass = ref('')

const addFormClass = () => {
  formClass.value = 'was-validated'
}

// 登入功能

const login = async (e) => {

  const form = e.target

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()


  const res = await axiosHelper.POST('/api/v1/users/signin', {
    account: storeForm.account,
    password: storeForm.password
  })
  const { data, success, message } = res.data

  // 登入失敗
  if (!success) {
    return storeMessage.setError(message)
  } 
  localStorage.setItem("token", data.token)
  storeMessage.setSuccess('登入成功')

  router.push('/')
} 

onMounted(async () => {

  // 如果已登入就導回首頁
  // 將token放進header中發送驗證

  const res = await tokenHelpers.tokenCheck()
  const { success } = res.data

    // api成功
  if (success) return router.push('/')


})


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
  margin-bottom: 10px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 100px) 1fr;
  grid-gap: 20px;
}
</style>