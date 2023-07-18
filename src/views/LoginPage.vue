<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>login</h3>
        <AlertComponent :errMessage="errMessage" :successMessage="successMessage"></AlertComponent>
      </div>
      <form @submit.prevent="login" :class="formClass" novalidate>
        <FormComponent v-model="account" label-for="account" label-text="帳號" span-text="※注意請填寫3-50字的帳號"
          input-placeholder="請輸入帳號" input-type="text" min-length="3" max-length="50" inputRequired="true"
          invalid-text="此項目為必填，字數限制3-50"></FormComponent>
        <FormComponent v-model="password" label-for="password" label-text="密碼" span-text="※注意請填寫4-50長度的密碼"
          input-placeholder="請輸入有效密碼" input-type="password" min-length="4" max-length="50" inputRequired="true"
          invalid-text='此項目為必填，字數限制4-50'></FormComponent>
        <div>
          <ButtonComponent msg="login" backgroundColor="background-color:#FFBD9D" type="submit" @click="addFormClass">
          </ButtonComponent>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosHelper from '../../helpers/axios-helper'
import { useRouter } from 'vue-router'
import ButtonComponent from '../components/ButtonComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'
const router = useRouter()

{
  ButtonComponent
  FormComponent
  AlertComponent
}


// 表單樣式
const formClass = ref('')

const addFormClass = () => {
  formClass.value = 'was-validated'
}

// 登入功能
const account = ref('')
const password = ref('')
const errMessage = ref('')
const successMessage = ref('')

const login = async (e) => {
  const form = e.target

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()

  const res = await axiosHelper.POST('/api/v1/users/signin', {
    account: account.value,
    password: password.value
  })
  const { data, success, message } = res.data

  // 登入失敗
  if (!success) return errMessage.value = message

  // 將token跟到期日放進cookie
  document.cookie = `hexToken=${data.token};expires=${new Date(data.expired)};`
  successMessage.value = '登入成功'
  router.push('/')
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
  margin-bottom: 10px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 100px) 1fr;
  grid-gap: 20px;
}
</style>