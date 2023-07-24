import { defineStore } from 'pinia'

export const useFormStore = defineStore('form-store', {
  state: () => ({
    name: '',
    price: 0,
    inventory: 0,
    avatar: '',
    description: '',
    account: '',
    password: '',
    passwordCheck: '',
    passwordOld: '',
    role: 'buyer',
    email: '',
    phone: '',
  }),
  getters: {
  },
  actions: {
    setChangeInput(property, value) {
      this[property] = value
    }
  }
})