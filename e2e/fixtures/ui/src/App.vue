<script setup lang="ts">
import { Case1, Case2, Case3, Case4, Case5, Case6, Case7 } from 'ui-vue2'
import CaseEmpty from './components/CaseEmpty.vue'
import CaseMultiRoot from './components/CaseMultiRoot.vue'
import CaseTeleportComp from './components/CaseTeleportComp.vue'
// import PerformanceTest from './components/PerformanceTest.vue'

defineOptions({
  name: 'App',
})
</script>

<template>
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
  <CaseMultiRoot></CaseMultiRoot>
  <CaseTeleportComp></CaseTeleportComp>
  <!-- <PerformanceTest></PerformanceTest> -->
</template>