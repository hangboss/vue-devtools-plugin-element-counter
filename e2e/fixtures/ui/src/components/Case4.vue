<template>
  <div>
    <h1>Case 4: Append and remove element use Vue</h1>
    <button @click="addElement" id="case4-add-element">+</button>
    <button @click="removeElement" id="case4-remove-element">-</button>
    <p v-for="item in count">
      {{ item }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const count = ref(2)

const addElement = () => {
  count.value++
}

const removeElement = () => {
  count.value--
}

</script>