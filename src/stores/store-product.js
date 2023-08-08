import { defineStore } from 'pinia'
import tokenHelpers from '../../helpers/token-helpers'
import axiosHelper from '../../helpers/axios-helper'
import { useMessageStore } from './message'
import { useLoginStore } from '../stores/login'
import { useFormStore } from '../stores/form-store'
import { useProductStore } from '../stores/product'


const storeMessage = useMessageStore()
const storeLogin = useLoginStore()
const storeForm = useFormStore()
const storeProduct = useProductStore()

export const useStore = defineStore('store', {
  state: () => ({
    products: [],
    categories: [],
    seller: {}
  }),
  getters: {
  },
  actions: {

    // 取得商家資訊api
    async getSeller(sellerId) {
      const res = await axiosHelper.GET(`/api/v1/users/${sellerId}`, undefined)
      const { success, message, data } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      this.seller = data.seller

      // 判斷是否是本帳號seller
      if (Number(sellerId) !== storeLogin.user.id) {
        return storeLogin.isSelfUser = false
      }
      return storeLogin.isSelfUser = true
    },

    // 取得該商家所有商品api
    async getSellerProducts(sellerId) {
      const res = await axiosHelper.GET(`/api/v1/stores/${sellerId}`, undefined)
      const { success, message, data } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      return this.products = data.products
    },

    // 取得本帳號商家所有商品api
    async getSelfProducts() {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.GET('/api/v1/stores', undefined, token)
      const { success, message, data } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      storeLogin.isSelfUser = true
      return this.products = data.products
    },

    // 取得分類資料api
    async getCategories() {
      const res = await axiosHelper.GET('/api/v1/products/categories')
      const { data, success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }

      // api成功
      this.categories = data.categories
    },

    // 上架商品api
    async postStore() {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.formDataPOST('/api/v1/stores', {
        name: storeForm.name,
        price: storeForm.price,
        inventory: storeForm.inventory,
        avatar: storeForm.avatar,
        description: storeForm.description,
        category: storeForm.category
      }, token)
      const { success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }

      // ap成功
      storeMessage.setSuccess(message)
    },

    // 取得所有商品分類 && 顯示單一商品api
    async getCategoriesProduct(productId) {
      const [categories, product] = await Promise.all([
        this.getCategories(),
        storeProduct.getProduct(productId)
      ])

      // api失敗
      if (categories || product) return 'err'

      // api 成功
      storeForm.name = storeProduct.product.name
      storeForm.price = storeProduct.product.price
      storeForm.inventory = storeProduct.product.stock
      storeForm.avatar = storeProduct.product.avatar
      storeForm.description = storeProduct.product.description
      storeForm.category = storeProduct.product.Category.id

    },

    // 編輯商品api
    async putStore(productId) {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.formDataPUT(`/api/v1/stores/${productId}`, {
        name: storeForm.name,
        price: storeForm.price,
        inventory: storeForm.inventory,
        avatar: storeForm.avatar,
        description: storeForm.description,
        category: storeForm.category
      }, token)
      const { success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }
      // api成功
      storeMessage.setSuccess(message)
    },

    // 刪除商店商品api
    async deleteStore(productId) {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.DELETE(`/api/v1/stores/${productId}`, undefined, token)
      const { success, message } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      this.deleteStoreShop(productId)
      return storeMessage.setSuccess(message)
    },

    // 刪除pinia 商品資料
    deleteStoreShop(productId) {
      const newProduct = this.products.filter(product => product.id !== productId)
      this.products = newProduct
    }
  }
})