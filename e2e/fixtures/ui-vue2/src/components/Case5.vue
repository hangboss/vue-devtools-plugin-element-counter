<template>
  <div>
    <h1>Case 5: With change elements use v-if</h1>
    <button id="case5-toggle-element" @click="showElement = !showElement">show/hide</button>
    <div v-if="showElement">
      <p>element</p>
      <p>element</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showElement = ref(false)
</script>