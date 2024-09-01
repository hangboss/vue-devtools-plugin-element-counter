<template>
  <div>
    <h1>Iframe App</h1>
    <p>This is an iframe app.</p>
    <Case1></Case1>
  </div>
</template>

<script setup lang="ts">
import Case1 from './components/Case1.vue'

defineOptions({
  name: 'AppIframe',
})
</script>

<style scoped></style>
