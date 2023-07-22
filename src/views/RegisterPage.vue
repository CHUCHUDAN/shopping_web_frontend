<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>Register</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="register" :class="formClass" novalidate>
        <FormComponent label-for="name" label-text="使用者名稱" span-text="※填寫20內使用者名稱" input-placeholder="請輸入名稱"
          input-type="text" min-length="1" max-length="20" inputRequired="true" invalid-text="此項目為必填，字數限制1-20">
        </FormComponent>

        <FormComponent label-for="account" label-text="帳號" span-text="※注意請填寫50字內的帳號" input-placeholder="請輸入帳號"
          input-type="text" min-length="1" max-length="50" inputRequired="true" invalid-text="此項目為必填，字數限制1-50">
        </FormComponent>

        <div class="form-radio-item">
          <label class="form-item-label" for="role">帳號類型:</label>
          <span class="form-text">※請選擇帳號類型</span>
          <div class="form-radio-wrapper">
            <div class="form-radio">
              <label class="form-radio-label" for="buyer">買家</label>
              <input class="form-radio-input" type="radio" id="buyer" name="role" value="buyer" v-model="storeForm.role" checked>
            </div>
            <div class="form-radio">
              <label class="form-radio-label" for="seller">賣家</label>
              <input class="form-radio-input" type="radio" id="seller" name="role" value="seller" v-model="storeForm.role">
            </div>
          </div>
        </div>

        <FormComponent label-for="password" label-text="密碼" span-text="※注意請填寫4-50字密碼" input-placeholder="請輸入有效密碼"
          input-type="password" min-length="4" max-length="50" inputRequired="true" invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>

        <FormComponent label-for="passwordCheck" label-text="確認密碼" span-text="※注意請填寫與密碼相符之確認密碼"
          input-placeholder="請輸入確認密碼" input-type="password" min-length="4" max-length="50" inputRequired="true"
          invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>

        <div>
          <ButtonComponent msg="register" backgroundColor="background-color:#FFBD9D" type="submit" @click="addFormClass">
          </ButtonComponent>
        </div>
        <div class="register-text">
          已經有帳號 ?
          <router-link to="/user/login" class="register-text-link">登入</router-link>
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

// 註冊功能

const register = async (e) => {

  const form = e.target

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()


  const res = await axiosHelper.POST('/api/v1/user', {
    name: storeForm.name,
    account: storeForm.account,
    role: storeForm.role,
    password: storeForm.password,
    passwordCheck: storeForm.passwordCheck
  })
  const { success, message } = res.data

  // 註冊失敗
  if (!success) {
    return storeMessage.setError(message)
  }

  storeMessage.setSuccess('註冊成功')

  router.push('/user/login')
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
  grid-template-rows: repeat(5, 100px) 1fr 1fr;
  grid-gap: 20px;
}

.form-radio-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
}

.form-item-label {
  color: #BEBEBE;
}

.form-radio-wrapper {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 1fr;
  justify-content: flex-start;
  grid-gap: 7px;
}

.form-radio {
  display: flex;
  align-items: center;
  height: 100%;
}

.form-radio-label {
  font-size: 15px;
  color: #6C6C6C;
  display: table-cell;
  vertical-align: middle;
  padding-right: 2px;
  margin-right: 5px;
}

.form-radio-input {
  width: 15px;
  height: 15px;
  display: table-cell;
  vertical-align: middle;
}
</style>