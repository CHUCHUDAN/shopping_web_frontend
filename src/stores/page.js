import { defineStore } from 'pinia'
import axiosHelper from '../../helpers/axios-helper'
import { useMessageStore } from '../stores/message'
import { productStore } from '../stores/product'
const storeProduct = productStore()
const storeMessage = useMessageStore()

export const usePageStore = defineStore('page', {
  state: () => ({
    pages: [],
    totalPage: 0,
    currentPage: 0,
    prev: 0,
    next: 0,
    keyword: '',
    min: '',
    max: '',
    minQuantity: '',
    maxQuantity: ''
  }),
  getters: {
  },
  actions: {
    async getProducts(page) {

      // 取得所有商品api
      const res = await axiosHelper.GET('api/v1/products', {
        params: {
          keyword: this.keyword,
          min: this.min,
          max: this.max,
          minQuantity: this.minQuantity,
          maxQuantity: this.maxQuantity,
          page: page
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
      return storeProduct.setProduct(data.products)
    },
    setChangeInput(property, value) {
      this[property] = value
    },
    clearSearch() {
      this.keyword = ''
      this.min = ''
      this.max = ''
      this.minQuantity = ''
      this.maxQuantity = ''
      this.getProducts(1)
    }
  }
})