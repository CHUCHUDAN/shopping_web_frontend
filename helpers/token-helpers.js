import axios from 'axios'
import axiosHelper from './axios-helper'

// 將token放進header

const putTokenToHeader = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  return token
}

// 檢查token權限
const tokenCheck = async () => {
  try {
    const token = putTokenToHeader()
    const res = await axiosHelper.POST('/api/v1/users/tokenCheck', undefined, token)
    return res
  } catch (err) {
    return err
  }
}

export default {
  putTokenToHeader,
  tokenCheck
}
