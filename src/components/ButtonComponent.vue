<template>
  <button @click="navigate(link)" :style="backgroundColor">{{ msg }}</button>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  msg: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

const navigate = (link) => {
  router.push(link)
}

</script>

<style scoped>
button {
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  transition: background-color ease-in-out 0.3s;
}
button:hover {
  /* 陰影 */
  -webkit-box-shadow: 0px 1px 5px 0px rgba(87, 87, 87, 1);
  -moz-box-shadow: 0px 1px 5px 0px rgba(87, 87, 87, 1);
  box-shadow: 0px 1px 5px 0px rgba(87, 87, 87, 1);
}
</style>