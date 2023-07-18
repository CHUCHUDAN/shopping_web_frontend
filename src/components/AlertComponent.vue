<template>
  <div v-if="successMessage" class="alert-wrapper">
    <div class="alert-message success-color">
      {{ successMessage }}
      <button type="button" class="close-button success-color" @click="removeMessage">X</button>
    </div>
  </div>
  <div v-if="errMessage" class="alert-wrapper">
    <div class="alert-message error-color">
      {{ errMessage }}
      <button type="button" class="close-button error-color" @click="removeMessage">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

defineProps({
  errMessage: {
    type: String
  },
  successMessage: {
    type: String
  }
})

const removeMessage = ref((e) => {
  const targetElement = e.target.parentNode.parentNode
  targetElement.remove()
})

</script>

<style scoped>
/* messages */

.alert-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px;
}

.alert-message {
  width: 80%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 5px;
  -webkit-box-shadow: 0px 1px 3px 0px #D0D0D0;
  -moz-box-shadow: 0px 1px 3px 0px #D0D0D0;
  box-shadow: 0px 1px 3px 0px #D0D0D0;
  letter-spacing: 1.5px;
  position: relative;
  font-size: 1rem;
}

.close-button {
  position: absolute;
  right: 5px;
  border: none;
  padding: 0;
  cursor: pointer;
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
  background-color: #FFC0C7;
  color: black;
}

.alert-message-index {
  width: 400px;
  margin-top: 10px;
}
</style>