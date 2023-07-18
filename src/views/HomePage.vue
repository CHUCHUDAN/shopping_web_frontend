<template>
  <div>
    <AlertComponent :successMessage="successMessage"></AlertComponent>
    home
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AlertComponent from '../components/AlertComponent.vue'

{
  AlertComponent
}

const successMessage = ref('')

onMounted(async () => {
  // 將token放進header中

  try {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    const res = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/users/tokenCheck`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    const { success } = res.data
    if (success) return successMessage.value = '登入成功'
    
  } catch (err) {
    return
  }


})

</script>