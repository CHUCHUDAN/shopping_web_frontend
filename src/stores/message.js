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
    }
  }
})