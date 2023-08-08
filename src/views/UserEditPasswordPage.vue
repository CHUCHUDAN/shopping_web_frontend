<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>修改密碼</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="putUserPassword" :class="storeForm.formClass" novalidate>

        <FormComponent label-for="passwordOld" label-text="舊密碼" span-text="※注意請填寫4-50字密碼" input-placeholder="請輸入舊密碼"
          input-type="password" min-length="4" max-length="50" inputRequired="true" invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>

        <FormComponent label-for="password" label-text="新密碼" span-text="※注意請填寫4-50字密碼" input-placeholder="請輸入新密碼"
          input-type="password" min-length="4" max-length="50" inputRequired="true" invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>

        <FormComponent label-for="passwordCheck" label-text="確認密碼" span-text="※注意請填寫與新密碼相符之確認密碼"
          input-placeholder="請輸入確認密碼" input-type="password" min-length="4" max-length="50" inputRequired="true"
          invalid-text='此項目為必填，字數限制4-50'>
        </FormComponent>
        <div>
          <ButtonComponent msg="更新" backgroundColor="background-color:#FFBD9D" type="submit" @click="storeForm.addFormClass()">
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

// 檢查是否登入過，未登入會被導向首頁
onMounted(() => {
  if (!storeLogin.isUser) return router.push('/')

  // 表單樣式重置
  storeForm.formClass = ''
})

// 修改使用者密碼api
const putUserPassword = async (e) => {
  const form = e.target

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()

  const putUserPassword = await storeLogin.putUserPassword()
  if (putUserPassword) return

  router.push('/user/profile')
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