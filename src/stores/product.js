import { defineStore } from 'pinia'
import axiosHelper from '../../helpers/axios-helper'
import { useMessageStore } from './message'

const storeMessage = useMessageStore()

export const useProductStore = defineStore('product', {
  state: () => ({

    // 分頁資料
    pages: [],
    totalPage: 0,
    currentPage: 0,
    prev: 0,
    next: 0,

    // 篩選資料
    keyword: '',
    min: '',
    max: '',
    minQuantity: '',
    maxQuantity: '',
    categoryId: '',

    // 商品資料
    categories: '',
    products: [],
    product: ''
    
  }),
  getters: {
  },
  actions: {

    // 取得所有商品api
    async getProducts(page) {
      const res = await axiosHelper.GET('api/v1/products', {
        params: {
          keyword: this.keyword,
          min: this.min,
          max: this.max,
          minQuantity: this.minQuantity,
          maxQuantity: this.maxQuantity,
          page: page,
          category_id: this.categoryId
        }
      })
      const { success, message, data } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)

      // api成功
      this.pages = data.pagination.pages
      this.totalPage = data.pagination.totalPage
      this.currentPage = data.pagination.currentPage
      this.prev = data.pagination.prev
      this.next = data.pagination.next
      return this.products = data.products
    },

    // 取得單一商品api
    async getProduct(productId) {
      const res = await axiosHelper.GET(`/api/v1/products/${productId}`)
      const { data, success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }

      // api成功
      this.product = data.product
    },

    // 取得分類資料api
    async getCategories() {
      const res = await axiosHelper.GET('/api/v1/products/categories')
      const { data, success, message } = res.data

      // api失敗
      if (!success) return storeMessage.setError(message)
      // api成功
      return this.categories = data.categories
    },

    // 更改pinia資料
    setChangeInput(property, value) {
      this[property] = value
    },

    // 清除搜尋條件
    clearSearch() {
      this.keyword = ''
      this.min = ''
      this.max = ''
      this.minQuantity = ''
      this.maxQuantity = ''
      this.getProducts(1)
    },

    // 設定categoryId
    categorySet(categoryId) {
      this.categoryId = categoryId
    }
  }
})