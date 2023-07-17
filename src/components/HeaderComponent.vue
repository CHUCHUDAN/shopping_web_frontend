<template>
  <header>
    <div class="title-wrapper">
      <a class="title" href="/">我的電商網站</a>
    </div>
    <div class="user-login-wrapper">
      <ButtonComponent msg="login" link="/login" backgroundColor="background-color:#FFBD9D"></ButtonComponent>
    </div>
  </header>
</template>

<script setup>
import ButtonComponent from './ButtonComponent.vue';
{
  ButtonComponent
}
</script>

<style scoped>
/* header */
header {
  background-color: #FF5809;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 20px;
}

.title-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 40px;
}

.user-login-wrapper {
  display: grid;
  grid-template-columns: 100px;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
}

.user-logout-wrapper {
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-template-rows: 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: flex-end;
}
.user-data-wrapper {
  display: flex;
  justify-content: flex-end;
}
.user-profile-link {
  color: black;
  padding-left: 5px;
}

</style>