import { defineStore } from 'pinia'

export const productStore = defineStore('product', {
  state: () => ({
    products: [],
    product: {},
    categories: {},
    totalAmount: 0
  }),
  getters: {
  },
  actions: {
    setProduct(products) {
      this.products = products
    },
    setTotalAmount(num) {
      this.totalAmount = num
    },
    setProductQuantity(state, id) {
      const product = this.products.find(product => product.id === id)
      const inventoryQuantity = product.Product.inventory_quantity
      if (state === 'plus' && product.quantity < inventoryQuantity) product.quantity += 1
      if (state === 'minus' && product.quantity > 1) product.quantity -= 1
      this.totalAmountCount()
    },
    totalAmountCount() {
      let total = 0
      this.products.forEach(product => {
        total += product.quantity * product.Product.price
      })
      this.totalAmount = total
    },
    deleteProducts(productId) {
      const newProduct = this.products.filter(product => product.product_id !== productId)
      this.products = newProduct
    },
    deleteStoreShop(productId) {
      const newProduct = this.products.filter(product => product.id !== productId)
      this.products = newProduct
    },
    productCheckout() {
      this.products = []
    },
    filterCategories(category) {
      const filterCategories = this.categories.filter(cate => cate.id !== category.id)
      this.categories = filterCategories
    }
  }
})