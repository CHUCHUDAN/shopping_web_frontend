<template>
  <HeaderComponent></HeaderComponent>
  <div class="shopcar-wrapper">
    <AlertComponent>
    </AlertComponent>
    <div class="checkout-wrapper">
      <div class="total-amount">總金額:  {{ storeCart.totalAmount }}</div>
      <div class="checkout-button">
        <ButtonComponent msg="結帳" backgroundColor="background-color:#FFBD9D" @click="storeCart.checkoutCarts()"></ButtonComponent>
      </div>
      <div class="updated-button">
        <ButtonComponent msg="更新" backgroundColor="background-color:#FFBD9D" @click="storeCart.updatedCarts()"></ButtonComponent>
      </div>
    </div>
    <div class="products-wrapper" >
      <CartProduct></CartProduct>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '../stores/message'
import { useCartStore } from '../stores/cart-product'
import { useLoginStore } from '../stores/login'
import AlertComponent from '../components/AlertComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import CartProduct from '../components/CartProduct.vue'

const router = useRouter()
const storeMessage = useMessageStore()
const storeCart = useCartStore()
const storeLogin = useLoginStore()

{
  AlertComponent
  HeaderComponent
  CartProduct
  FooterComponent
  ButtonComponent
}

// message初始化
storeMessage.messageInitialization()

// 檢查是否為buyer
onMounted(() => {
  if (storeLogin.user.role !== 'buyer') return router.push('/')
})

</script>

<style scoped>
.checkout-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 800px;
  margin: 0 auto;
  align-items: center;
  padding: 20px;
}

.total-amount {
  padding-right: 20px;
  font-size: 25px;
}

.checkout-button {
  padding-right: 20px;
}

.updated-button {
  font-weight: 700;
  color: white;
}

.products-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  grid-auto-flow: row;
  justify-items: center;
}
</style>