
<template>
  
  <HeaderComponent></HeaderComponent>
  <RouterView />
  <FooterComponent></FooterComponent>

</template>

<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderComponent from '../src/components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue';
{
  HeaderComponent
  FooterComponent
}
// import { ref } from 'vue'

</script>

<style scoped>


</style>
