<template>
  <div class="form-item">
    <label class="form-label" :for="labelFor">{{ labelText }}</label>
    <span class="form-text">{{ spanText }}</span>
    <input class="form-input" :type="inputType" :id="labelFor" :name="labelFor" :placeholder="inputPlaceholder"
      :minlength="minLength" :maxlength="maxLength" :pattern="inputPattern" :required="inputRequired">
    <!-- <div class="invalid-text">此項目為必填，請填寫正確信箱格式，字數限制3-50</div>
          <div class="valid-text">&#x2713</div> -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  labelFor: {
    type: String,
    required: true
  },
  labelText: {
    type: String,
    required: true
  },
  spanText: {
    type: String,
    required: true
  },
  inputPlaceholder: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  minLength: {
    type: String,
    required: true
  },
  maxLength: {
    type: String,
    required: true
  },
  inputPattern: {
    type: String,
    required: true
  },
  inputRequired: {
    type: Boolean,
    required: true
  }
})

</script>

<style scoped>
.form-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 30px 2fr 1fr;
}

.form-label {
  color: #BEBEBE;
}

.form-input,
.form-input:focus {
  font-size: 10px;
  background-color: #F0F0F0;
  border: none;
  border-bottom: 1px solid #6C6C6C;
  outline: none;
}

.form-label,
.form-input,
.form-text {
  margin: 0;
}
</style>