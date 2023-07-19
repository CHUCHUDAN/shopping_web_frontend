<template>
  <div v-if="successMessage" class="alert-wrapper">
    <div class="alert-message success-color">
      <div class="text">{{ successMessage }}</div>
      <button type="button" class="close-button success-color" @click="removeMessage(true)">X</button>
    </div>
  </div>
  <div v-if="errMessage" class="alert-wrapper">
    <div class="alert-message error-color">
      <div class="text">{{ errMessage }}</div>
      <button type="button" class="close-button error-color" @click="removeMessage(false)">X</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'


const emit = defineEmits(['close-message'])
defineProps({
  errMessage: {
    type: String
  },
  successMessage: {
    type: String
  }
})

const removeMessage = (state) => {
  emit('close-message', state, '')
}

</script>

<style scoped>
/* messages */

.alert-wrapper {

  display: flex;
  justify-content: center;
  margin: 10px;

}

.alert-message {
  width: 350px;
  height: 100%;
  border-radius: 5px;
  display: grid;
  place-items: center;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  padding: 10px;
  -webkit-box-shadow: 0px 1px 3px 0px #D0D0D0;
  -moz-box-shadow: 0px 1px 3px 0px #D0D0D0;
  box-shadow: 0px 1px 3px 0px #D0D0D0;
  letter-spacing: 1.5px;
  font-size: 1rem;
}

.close-button {
  width: 50px;
  height: 70px;
  right: 5px;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 20px;
}

.alert-message:hover {
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.success-color {
  background-color: #04AA6D;
  color: white;
}



.error-color {
  background-color: #f8d7da;
  color: black;
}

.alert-message-index {
  width: 400px;
  margin-top: 10px;
}
</style>