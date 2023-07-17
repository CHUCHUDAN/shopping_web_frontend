<template>
  <div class="wrapper">
    <div class="form-wrapper">
      <div class="form-title">
        <h3>login</h3>
      </div>
      <form novalidate action="/v1/user/login" method="POST">
        <FormComponent label-for="account" label-text="帳號" span-text="※注意請填寫3-50字的帳號" input-placeholder="請輸入帳號"
          input-type="text" min-length="3" max-length="50" inputRequired="true"></FormComponent>
        <FormComponent label-for="password" label-text="密碼" span-text="※注意請填寫4-50長度的密碼" input-placeholder="請輸入有效密碼"
          input-type="password" min-length="4" max-length="50" inputRequired="true"></FormComponent>
        <div>
          <ButtonComponent msg="login" link="/login" backgroundColor="background-color:#FFBD9D" type="submit">
          </ButtonComponent>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import FormComponent from '../components/FormComponent.vue'
{
  ButtonComponent
  FormComponent
}
</script>

<style scoped>
.form-wrapper {
  width: 40%;
  max-width: 600px;
  height: auto;
  border-radius: 40px;
  padding: 50px;
  /* 陰影 */
  -webkit-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 6px 27px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: brown;
  margin-bottom: 10px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 100px) 1fr;
  grid-gap: 20px;
}
</style>