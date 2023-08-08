<template>
  <HeaderComponent></HeaderComponent>
  <div class="home-wrapper">
    <AlertComponent></AlertComponent>
    <div class="category-wrapper">
      <router-link to="/home" class="link-to-home" v-for="(item) in storeProduct.categories" v-bind:key="item.id"
        @click="storeProduct.categorySet(item.id)">
        <div class="category-item">
          <div class="category-img"
            :style="`background-image: url('${item.avatar}')`">
          </div>
          <div class="category-text">{{ item.name }}</div>
        </div>
      </router-link>
    </div>
    <router-link to="/home">
      <ButtonComponent class="all-product-button" msg="逛全部商品" backgroundColor="background-color:	#FFAD86" type="button"
        @click="storeProduct.categorySet('')">
      </ButtonComponent>
    </router-link>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>

import { onMounted } from 'vue'
import { useMessageStore } from '../stores/message'
import { useProductStore } from '../stores/product'
import AlertComponent from '../components/AlertComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const storeMessage = useMessageStore()
const storeProduct = useProductStore()

{
  AlertComponent
  ButtonComponent
  HeaderComponent
  FooterComponent
}

// message初始化
const message = ['登入成功']
storeMessage.messageInitialization(message)

// 取得分類資料
onMounted(async () => {
  await storeProduct.getCategories()
})

</script>

<style scoped>
.home-wrapper {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  justify-items: center;
  align-items: center;
}

.category-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.category-item {
  width: 100px;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 1fr;
  grid-gap: 10px;
  border-radius: 5px;
  border: 1px solid #BEBEBE;
  padding: 10px;
}

.category-item:hover {
  border: 3px solid #BEBEBE;
  cursor: pointer;
  opacity: 0.5;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.category-img {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.category-text {
  text-align: center;
  color: #8E8E8E
}

.link-to-home {
  text-decoration: none;
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