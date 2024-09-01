<template>
  <h1>Component nesting level is 100，element count is 10000+</h1>
  <NestedComponent :currentDepth="depth" />
</template>

<script setup>
import { h, defineComponent } from 'vue';

const NestedComponent = defineComponent({
  name: 'NestedComponent',
  props: {
    currentDepth: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const divs = [];
    for (let i = 0; i < 100; i++) {
      divs.push(h('div', { class: 'extra-div' }, `Extra Div ${i + 1}`));
    }

    return () => [
      h('div'),
      h('div', { class: 'nested' }, [
        `Depth: ${props.currentDepth}`,
        ...divs,
        props.currentDepth > 0
          ? h(NestedComponent, { currentDepth: props.currentDepth - 1 })
          : null
      ])
    ];
  }
});

const depth = 100;
</script>

<style scoped>
.nested {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
