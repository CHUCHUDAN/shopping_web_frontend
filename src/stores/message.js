import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    errMessage: '',
    successMessage: ''
  }),
  getters: {
  },
  actions: {
    setError(message) {
      this.errMessage = message
    },
    setSuccess(message) {
      this.successMessage = message
    },
    clearErrorMessages() {
      this.errMessage = ''
    },
    clearSuccessMessages() {
      this.successMessage = ''
    },

    // 訊息初始化
    messageInitialization(message = []) {
      const result = message.some(m => this.successMessage === m)

      if (result) return this.clearErrorMessages()
      this.clearErrorMessages()
      this.clearSuccessMessages()
    }
  }
})