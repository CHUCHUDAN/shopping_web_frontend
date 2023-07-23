import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => ({
    loginSwitch: 'login',
    isBuyer: false,
    isSeller: false,
    isUser: false,
    buttonOn: false,
    user: {},
    isSelfUser: ''
  }),
  getters: {
  },
  actions: {
    setLoginSwitch(message) {
      this.loginSwitch = message
    },
    setisBuyer(statement) {
      this.isBuyer = statement
    },
    setisSeller(statement) {
      this.isSeller = statement
    },
    setButtonOn(statement) {
      this.buttonOn = statement
    },
    setIsUser(statement) {
      this.isUser = statement
    }
  }
})