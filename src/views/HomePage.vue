<template>
  <HeaderComponent></HeaderComponent>
  <div class="home-wrapper">
    <AlertComponent></AlertComponent>
    <div class="search-wrapper">
      <form action="" class="form-wrapper">
        <div class="form-item">
          <input class="form-input" type="text" maxlength="50" id="keyword" name="keyword" :value="storePage.keyword"
            @input="inputSend" @keyup="storePage.getProducts(1)" placeholder="輸入關鍵字">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="minQuantity" name="minQuantity"
            :value="storePage.minQuantity" @input="inputSend" @keyup="storePage.getProducts(1)" placeholder="輸入最小存貨量">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="maxQuantity" name="maxQuantity"
            :value="storePage.maxQuantity" @input="inputSend" @keyup="storePage.getProducts(1)" placeholder="輸入最大存貨量">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="min" name="min" :value="storePage.min"
            @input="inputSend" @keyup="storePage.getProducts(1)" placeholder="輸入最小金額">
        </div>
        <div class="form-item">
          <input class="form-input" type="number" maxlength="50" id="max" name="max" :value="storePage.max"
            @input="inputSend" @keyup="storePage.getProducts(1)" placeholder="輸入最大金額">
        </div>
        <div class="button-wrapper">
          <ButtonComponent class="search-button" msg="搜尋" backgroundColor="background-color:#D0D0D0" type="button"
            @click="storePage.getProducts(1)">
          </ButtonComponent>
          <ButtonComponent class="clear-button" msg="清除" backgroundColor="background-color:	#FFAD86" type="button"
            @click="storePage.clearSearch()">
          </ButtonComponent>
        </div>
      </form>
    </div>
    <div class="products-wrapper">
      <ProductComponent></ProductComponent>
    </div>
    <PaginationComponent :currentPage="storePage.currentPage"></PaginationComponent>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>
import { useMessageStore } from '../stores/message'
import { usePageStore } from '../stores/page'
import AlertComponent from '../components/AlertComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
const storeMessage = useMessageStore()
const storePage = usePageStore()

{
  AlertComponent
  ProductComponent
  FormComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
  PaginationComponent
}


// message初始化
storeMessage.clearErrorMessages()

// 取出所有商品 api
storePage.getProducts(1)

const inputSend = (e) => {
  const value = e.target.value
  const propName = e.target.id
  storePage.setChangeInput(propName, value)
}


</script>

<style scoped>
.home-wrapper {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
  justify-items: center;
  align-items: center;
}

.search-wrapper {
  display: flex;
  justify-content: flex-end;
}

.button-wrapper {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.form-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
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

.search-button {
  width: 100px
}



.products-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: row;
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
}
</style>