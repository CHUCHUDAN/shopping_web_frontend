import { defineStore } from 'pinia'
import { useMessageStore } from '../stores/message'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'

const storeMessage = useMessageStore()

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    product: {},
    categories: {},
    totalAmount: 0
  }),
  getters: {
  },
  actions: {

    // 取得購物車所有商品api
    async getCart() {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.GET('/api/v1/carts', undefined, token)
      const { success, message, data } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      this.totalAmount = data.totalAmount
      return this.products = data.productsOfCart
    },

    // 加入購物車api
    async postCart(productId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.POST(`/api/v1/carts/${productId}`, undefined, token)
      const { success, message } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      return storeMessage.setSuccess(message)
    },

    // 刪除購物車商品api
   async deleteCart(productId) {
     window.scrollTo({ top: 0, behavior: 'smooth' })
     const token = tokenHelpers.putTokenToHeader()
     const res = await axiosHelper.DELETE(`/api/v1/carts/${productId}`, undefined, token)
     const { success, message } = res.data

     // api失敗
     if (!success) return storeMessage.setError(message)

     // api成功
     this.deleteCartProduct(productId)
     this.totalAmountCount()
     return storeMessage.setSuccess(message)
    },

    // 更新商品數量api
    async updatedCarts() {
      const fixData = this.toProductObj()
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.PATCH('/api/v1/carts', fixData, token)
      const { success, message } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)
      // api成功
      return storeMessage.setSuccess(message)
    },

    // 商品結帳api
    async checkoutCarts() {
      const fixData = this.toProductObj()
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.POST('/api/v1/carts/checkout', fixData, token)
      const { success, message } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      this.products = []
      this.totalAmount = 0
      return storeMessage.setSuccess(message)
    },

    // 打包為商品物件
    toProductObj() {
      const cartsData = this.products
      const fixData = Object.fromEntries(
        cartsData.map(cart => [cart.Product.id, cart.quantity])
      )
      return fixData
    },

    // 加減商品數量
    setProductQuantity(state, id) {
      const product = this.products.find(product => product.Product.id === id)
      const inventoryQuantity = product.Product.stock
      if (state === 'plus' && product.quantity < inventoryQuantity) product.quantity += 1
      if (state === 'minus' && product.quantity > 1) product.quantity -= 1
      this.totalAmountCount()
    },

    // 計算總金額
    totalAmountCount() {
      let total = 0
      this.products.forEach(product => {
        total += product.quantity * product.Product.price
      })
      this.totalAmount = total
    },

    // 刪除pinia商品
    deleteCartProduct(productId) {
      const newProduct = this.products.filter(product => product.Product.id !== productId)
      this.products = newProduct
    }
  }
})