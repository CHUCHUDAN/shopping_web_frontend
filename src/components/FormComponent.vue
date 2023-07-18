<template>
  <div class="form-item">
    <label class="form-label" :for="labelFor">{{ labelText }}</label>
    <span class="form-text">{{ spanText }}</span>
    <input class="form-input" :type="inputType" :id="labelFor" :name="labelFor" :placeholder="inputPlaceholder"
      :minlength="minLength" :maxlength="maxLength" :pattern="inputPattern" :required="inputRequired" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
    <div class="invalid-text">{{ invalidText }}</div>
    <div class="valid-text">{{ '&#10003;' }}</div>
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
    type: String
  },
  inputRequired: {
    type: String
  },
  invalidText: {
    type: String,
    required: true
  },
  modelValue: {}
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

.valid-text,
.invalid-text {
  display: none;
  font-size: 10px;
  padding: 5px;
}

/* 驗證樣式 */

.valid-text {
  color: green;
}

.invalid-text {
  color: red;
}

form.was-validated .form-input:invalid {
  border-bottom: 2px solid red;
}

form.was-validated .form-input:valid {
  border-bottom: 2px solid green;
}

form.was-validated .form-input:invalid~.invalid-text,
form.was-validated .form-input:valid~.valid-text {
  display: initial;
}
</style>