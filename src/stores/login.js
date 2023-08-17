import { defineStore } from 'pinia'
import { useMessageStore } from '../stores/message'
import { useFormStore } from '../stores/form-store'
import axiosHelper from '../../helpers/axios-helper'
import tokenHelpers from '../../helpers/token-helpers'

const storeMessage = useMessageStore()
const storeForm = useFormStore()

export const useLoginStore = defineStore('login', {
  state: () => ({
    isBuyer: false,
    isSeller: false,
    isUser: false,
    cartButtonOn: false,
    buttonText: 'login',
    user: {},
    isSelfUser: ''
  }),
  getters: {
  },
  actions: {

    // 登入功能api
    async login() {
      const res = await axiosHelper.POST('/api/v1/users/signin', {
        account: storeForm.account,
        password: storeForm.password
      })
      const { data, success, message } = res.data

      // 登入失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }

      // 登入成功
      localStorage.setItem("token", data.token)
      storeMessage.setSuccess('登入成功')
    },

    // 狀態檢查權限api
    async authority() {
      // 將token放進header中發送驗證
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.GET('/api/v1/users', undefined, token)
      const { success, data } = res.data

      // api失敗 沒有會員權限
      if (!success) {
        this.setLoginData(false, false, false, false, '', 'login')
      }

      // api成功
      if (success && data.user.role === 'buyer') {
        // 買家
        this.setLoginData(true, false, true, true, data.user, 'logout')

      } else if (success && data.user.role === 'seller') {
        // 賣家
        this.setLoginData(false, true, true, false, data.user, 'logout')
      }
    },

    // 登出功能
    logout() {
      if (this.buttonText === 'logout') {
        storeMessage.setSuccess('登出成功')
        localStorage.removeItem("token")
        this.setLoginData(false, false, false, false, '', 'login')
      }
    },

    // 註冊功能api
    async register() {
      const res = await axiosHelper.POST('/api/v1/user', {
        name: storeForm.name,
        account: storeForm.account,
        role: storeForm.role,
        password: storeForm.password,
        passwordCheck: storeForm.passwordCheck
      })
      const { success, message } = res.data

      // 註冊失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }

      // 註冊成功
      storeMessage.setSuccess('註冊成功')
    },

    // 編輯使用者api
    async putUser() {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.formDataPUT('/api/v1/users', {
        name: storeForm.name,
        account: storeForm.account,
        email: storeForm.email,
        phone: storeForm.phone,
        avatar: storeForm.avatar
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

    // 修改使用者密碼api
    async putUserPassword() {
      const token = tokenHelpers.putTokenToHeader()
      const res = await axiosHelper.PUT('/api/v1/users/password', {
        passwordOld: storeForm.passwordOld,
        password: storeForm.password,
        passwordCheck: storeForm.passwordCheck
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

    // 忘記密碼 && 寄送驗證信功能api
    async mailToReset() {
      const res = await axiosHelper.POST('/api/v1/users/forgetPassword', {
        email: storeForm.email
      })
      const { success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }
      // api成功
      storeMessage.setSuccess(message)
    },

    // 忘記密碼 && 重置密碼功能api
    async resetPassword(resetToken) {
      const res = await axiosHelper.POST('/api/v1/users/resetPassword', {
        email: storeForm.email,
        resetToken: resetToken,
        password: storeForm.password
      })
      const { success, message } = res.data

      // api失敗
      if (!success) {
        storeMessage.setError(message)
        return 'err'
      }
      // api成功
      storeMessage.setSuccess(message)
    },

    // loginStore資料設定
    setLoginData(isBuyer, isSeller, isUser, cartButtonOn, user, buttonText) {
      this.isBuyer = isBuyer
      this.isSeller = isSeller
      this.isUser = isUser
      this.cartButtonOn = cartButtonOn
      this.user = user
      this.buttonText = buttonText
    }
  }
})