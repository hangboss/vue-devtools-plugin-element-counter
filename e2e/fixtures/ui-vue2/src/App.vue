<script setup lang="ts">
import Case1 from './components/Case1.vue'
import Case2 from './components/Case2.vue'
import Case3 from './components/Case3.vue'
import Case4 from './components/Case4.vue'
import Case5 from './components/Case5.vue'
import Case6 from './components/Case6.vue'
import Case7 from './components/Case7.vue'

import CaseEmpty from './components/CaseEmpty.vue'
</script>

<template>
  <div class="app">
    <Case1></Case1>
    <Case2></Case2>
    <Case3></Case3>
    <Case4></Case4>
    <Case5></Case5>
    <Case6></Case6>
    <Case7>
      <p>element 1</p>
      <p>element 2</p>
    </Case7>
    <CaseEmpty></CaseEmpty>
  </div>
</template>