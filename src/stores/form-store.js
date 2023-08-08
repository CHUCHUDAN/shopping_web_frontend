import { defineStore } from 'pinia'

export const useFormStore = defineStore('form-store', {
  state: () => ({
    name: '',
    price: '',
    inventory: '',
    avatar: '',
    description: '',
    account: '',
    password: '',
    passwordCheck: '',
    passwordOld: '',
    role: 'buyer',
    email: '',
    phone: '',
    category: '',
    defautCategory: '',
    // 表單樣式
    formClass: '',
  }),
  getters: {
  },
  actions: {

    // 更新input資料
    setChangeInput(property, value) {
      this[property] = value
    },

    // 插入表單樣式
    addFormClass(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.formClass = 'was-validated'
    }
  }
})