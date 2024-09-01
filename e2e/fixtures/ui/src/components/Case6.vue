<template>
  <div>
    <h1>Case 6: Append element but not use Vue</h1>
    <button @click="addElement" id="case6-add-element">click me</button>
    <div id="case6-container">
      <p>This is a paragraph</p>
      <p>This is a paragraph</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const addElement = () => {
  document.getElementById("case6-container")!.innerHTML += "<p>This is a paragraph</p>";
}

</script>