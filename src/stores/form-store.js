import { defineStore } from 'pinia'

export const useFormStore = defineStore('shop', {
  state: () => ({
    name: '',
    price: 0,
    inventory: 0,
    avatar: '',
    description: '',
    account: '',
    password: ''
  }),
  getters: {
  },
  actions: {
    setChangeInput(property, value) {
      this[property] = value
    }
  }
})