<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>編輯使用者資料</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="editUser" :class="formClass" novalidate>

        <FormComponent label-for="name" label-text="名稱" span-text="※注意請填寫1-20字名稱" input-placeholder="請輸入使用者名稱"
          input-type="text" min-length="1" max-length="20" inputRequired="true" invalid-text="此項目為必填，字數限制1-20字"
          :value="storeForm.name">
        </FormComponent>

        <FormComponent label-for="account" label-text="帳號" span-text="※注意請填寫1-50字帳號" input-placeholder="請輸入使用者帳號"
          input-type="text" min-length="1" max-length="50" inputRequired="true" invalid-text='此項目為必填，字數限制1-50字' :value="storeForm.account">
        </FormComponent>

        <FormComponent label-for="email" label-text="信箱" span-text="※注意信箱非必填，請輸入3-50字信箱" input-placeholder="請輸入有效信箱"
          input-type="email"  min-length="3" max-length="50" inputRequired="false" invalid-text='此項目非必填，請輸入正確信箱格式' :value="storeForm.email">
        </FormComponent>

        <FormComponent label-for="phone" label-text="手機" span-text="※注意手機為非必填，請輸入10碼手機號碼" input-placeholder="請輸入手機號碼"
          input-type="text" min-length="10" max-length="10" inputRequired="false" invalid-text='此項目非必填，請輸入正確手機格式'
          :value="storeForm.phone">
        </FormComponent>

        <FormComponent label-for="avatar" label-text="使用者大頭貼" span-text="※注意使用者大頭貼非必填" input-placeholder=""
          @change="onFileChange" input-type="file" inputRequired="false" invalid-text='此項目非必填'>
        </FormComponent>

        <div>
          <ButtonComponent msg="更新" backgroundColor="background-color:#FFBD9D" type="submit" @click="addFormClass">
          </ButtonComponent>
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
storeMessage.clearErrorMessages()
storeMessage.clearSuccessMessages()

// 表單樣式
const formClass = ref('')

const addFormClass = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  formClass.value = 'was-validated'
}

// 檢查是否登入過，未登入會被導向首頁
onMounted(() => {
  if (storeLogin.user.role !== 'seller' && storeLogin.user.role !== 'buyer') {
    router.push('/')
  }
})

// 顯示單一使用者api
onMounted(async () => {

  const token = tokenHelpers.putTokenToHeader()
  const res = await axiosHelper.GET('/api/v1/users', undefined, token)
  const { data, success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)

  // api成功
  storeForm.name = data.user.name
  storeForm.account = data.user.account
  storeForm.email = data.user.email
  storeForm.phone = data.user.phone
  storeForm.avatar = data.user.avatar


})


const onFileChange = (event) => {
  // 获取选择的文件
  const selectedFile = event.target.files[0]
  storeForm.avatar = selectedFile
}

// 編輯使用者api

const editUser = async (e) => {

  const form = e.target

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()

  const token = tokenHelpers.putTokenToHeader()

  const res = await axiosHelper.formDataPUT('/api/v1/users', {
    name: storeForm.name,
    account: storeForm.account,
    email: storeForm.email,
    phone: storeForm.phone,
    avatar: storeForm.avatar
  }, token)
  const { success, message } = res.data

  // api失敗
  if (!success) {
    return storeMessage.setError(message)
  }
  // api成功
  storeMessage.setSuccess(message)

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