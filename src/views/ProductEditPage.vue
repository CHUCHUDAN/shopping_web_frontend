<template>
  <HeaderComponent></HeaderComponent>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>編輯商品</h3>
        <AlertComponent></AlertComponent>
      </div>
      <form @submit.prevent="putStore" :class="storeForm.formClass" novalidate>
        <FormComponent label-for="name" label-text="商品名稱" span-text="※填寫1-100字商品名稱" input-placeholder="請輸入商品名稱"
          input-type="text" min-length="1" max-length="100" inputRequired="true" invalid-text="此項目為必填，字數限制1-100"
          :value="storeForm.name">
        </FormComponent>
        <FormComponent label-for="price" label-text="售價" span-text="※注意售價為必填" input-placeholder="請輸入售價"
          input-type="number" inputRequired="true" invalid-text='此項目為必填' :value="storeForm.price">
        </FormComponent>
        <div class="form-item">
          <label for="category" class="form-label">商品分類</label>
          <span class="form-text">※注意商品分類為必填</span>
          <select class="form-input" v-model="storeForm.category" name="category" id="category" required>
            <option class="form-input" :value="item.id" v-for="(item) in storeStore.categories" v-bind:key="item.id">{{
              item.name }}
            </option>
          </select>
          <div class="invalid-text">此項目為必選，請選擇商品分類</div>
          <div class="valid-text">{{ '&#10003;' }}</div>
        </div>
        <FormComponent label-for="inventory" label-text="存貨量" span-text="※注意存貨量為必填" input-placeholder="請輸入存貨量"
          input-type="number" inputRequired="true" invalid-text='此項目為必填' :value="storeForm.inventory">
        </FormComponent>
        <FormComponent label-for="avatar" label-text="商品圖片" span-text="※注意商品圖片為必填" input-placeholder=""
          @change="onFileChange" input-type="file" inputRequired="true" invalid-text='此項目為必填'>
        </FormComponent>
        <FormComponent label-for="description" label-text="商品描述" span-text="※注意商品描述為必填" input-placeholder="請輸入商品描述"
          input-type="textarea" min-length="1" max-length="400" inputRequired="true" invalid-text='此項目為必填'
          :value="storeForm.description">
        </FormComponent>
        <div>
          <ButtonComponent msg="更新" backgroundColor="background-color:#FFBD9D" type="submit"
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
import { useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '../stores/message'
import { useFormStore } from '../stores/form-store'
import { useLoginStore } from '../stores/login'
import { useStore } from '../stores/store-product'
import ButtonComponent from '../components/ButtonComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const route = useRoute()
const router = useRouter()
const storeMessage = useMessageStore()
const storeForm = useFormStore()
const storeLogin = useLoginStore()
const storeStore = useStore()

{
  ButtonComponent
  FormComponent
  AlertComponent
  HeaderComponent
  FooterComponent
}

// message初始化
storeMessage.messageInitialization()

// 檢查是否為seller
onMounted(() => {
  if (storeLogin.user.role !== 'seller') return router.push('/')

  // 表單樣式重置
  storeForm.formClass = ''
})

// 取得所有商品分類 && 顯示單一商品api
onMounted(async () => {
  const productId = route.params.product_id
  await storeStore.getCategoriesProduct(productId)
})

// 編輯商品api
const putStore = async (e) => {
  const form = e.target
  const productId = route.params.product_id

  // 表單驗證不過
  if (!form.checkValidity()) return e.preventDefault()
  const putStore = await storeStore.putStore(productId)
  if (putStore) return 

  router.push('/stores')
}

// 獲取選擇的文件
const onFileChange = (event) => {
  const selectedFile = event.target.files[0]
  storeForm.avatar = selectedFile
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

.form-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 30px 2fr 1fr;
}

.form-label {
  color: #BEBEBE;
}


.form-input,
.form-input:focus {
  font-size: 10px;
  background-color: #F0F0F0;
  border: none;
  border-bottom: 1px solid #6C6C6C;
  outline: none;
}

.form-label,
.form-input,
.form-text {
  margin: 0;
}

.valid-text,
.invalid-text {
  display: none;
  font-size: 10px;
  padding: 5px;
}

/* 驗證樣式 */

.valid-text {
  color: green;
}

.invalid-text {
  color: red;
}

form.was-validated .form-input:invalid {
  border-bottom: 2px solid red;
}

form.was-validated .form-input:valid {
  border-bottom: 2px solid green;
}

form.was-validated .form-input:invalid~.invalid-text,
form.was-validated .form-input:valid~.valid-text {
  display: initial;
}
</style>