<template>
  <HeaderComponent></HeaderComponent>
  <div class="home-wrapper">
    <AlertComponent></AlertComponent>
    <div class="search-wrapper">
      <form action="" class="form-wrapper">
        <div class="form-item">
          <input class="form-input" type="text" maxlength="50" id="keyword" name="keyword" v-model="keyword"
            placeholder="輸入關鍵字">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="minQuantity" name="minQuantity" v-model="minQuantity"
            placeholder="輸入最小存貨量">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="maxQuantity" name="maxQuantity" v-model="maxQuantity"
            placeholder="輸入最大存貨量">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="min" name="min" v-model="min" placeholder="輸入最小金額">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="max" name="max" v-model="max" placeholder="輸入最大金額">
        </div>
        <ButtonComponent msg="搜尋" backgroundColor="background-color:#D0D0D0" type="button" @click="searchProduct">
        </ButtonComponent>
      </form>
    </div>
    <div class="products-wrapper">
      <ProductComponent ></ProductComponent>
    </div>
  </div>
 <FooterComponent></FooterComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosHelper from '../../helpers/axios-helper'
import { useMessageStore } from '../stores/message'
import { productStore } from '../stores/product'
import AlertComponent from '../components/AlertComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
const storeMessage = useMessageStore()
const storeProduct = productStore()

{
  AlertComponent
  ProductComponent
  FormComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
}


// message初始化
storeMessage.clearErrorMessages()

onMounted(async () => {

  // 取得所有商品api

  const res = await axiosHelper.GET('/api/v1/products')
  const { success, message } = res.data

  // api失敗
  if (!success) return storeMessage.setError(message)
  // api成功
  return storeProduct.setProduct(res.data.data.products)
})


// 搜尋、篩選商品

const keyword = ref('')
const min = ref('')
const max = ref('')
const minQuantity = ref('')
const maxQuantity = ref('')


const searchProduct = async () => {
  const res = await axiosHelper.GET('api/v1/products', {
    params: {
      keyword: keyword.value,
      min: min.value,
      max: max.value,
      minQuantity: minQuantity.value,
      maxQuantity: maxQuantity.value
    }
  })
  const { success, message } = res.data
  // api失敗
  if (!success) return storeMessage.setError(message)
  // api成功
  return storeProduct.setProduct(res.data.data.products)
}


</script>

<style scoped>
.home-wrapper {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-wrapper {
  display: flex;
  justify-content: flex-end;
}

.form-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 0.7fr);
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
  margin: 20px;
}

.form-wrapper:hover {
  background-color: antiquewhite;
}

.form-input {
  padding: 10px;
  border: none;
  border-radius: 20px;
  background-color: white;
}

.form-input:focus {
  border: 50px;
}



.products-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
}

</style>