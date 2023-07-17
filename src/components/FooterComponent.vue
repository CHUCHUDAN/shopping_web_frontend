<template>
  <footer>
    <div class="year-wrapper">
      <span class="year">© 2022-{{ currentYear }}</span>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const currentYear = ref(dayjs().year())

</script>

<style scoped>
/* footer */
footer {
  background-color: #FF5809;
  padding: 5px;
}

.year-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>