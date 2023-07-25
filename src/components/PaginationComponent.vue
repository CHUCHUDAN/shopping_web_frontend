<template>
  <div>
   <router-link class="paginaton" to="/home">
    <nav aria-label="Page navigation example">
      <ul class="pagination">

        <li class="page-item" ref="prev" :class="{ disabled: storePage.currentPage === 1 }"
          @click="prevClick(storePage.currentPage - 1, storePage.categoryId)">
          <a class="page-link" href="" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item" @click="storePage.getProducts(item, storePage.categoryId)"
          :class="{ active: storePage.currentPage === item }" v-for="(item) in storePage.pages" v-bind:key="item">
          <a class="page-link" href="">{{ item }}</a>
        </li>

        <li class="page-item" ref="next" :class="{ disabled: storePage.currentPage === storePage.totalPage }"
          @click="nextClick(storePage.currentPage + 1, storePage.categoryId)">
          <a class="page-link" href="" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePageStore } from '../stores/page'
const storePage = usePageStore()


const prev = ref(null)
const next = ref(null)


// 檢查如果有禁止按鈕就不能發送api

const prevClick = (page, categoryId) => {
  if (prev.value.classList.contains('disabled')) return
  storePage.getProducts(page, categoryId)
}

const nextClick = (page, categoryId) => {
  if (next.value.classList.contains('disabled')) return
  storePage.getProducts(page, categoryId)
}
</script>

<style scoped>
.paginaton {
  text-decoration: none;
}

</style>