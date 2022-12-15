<template>
  <n-button :type="type" strong ghost>
    <template v-if="icon !== null" #icon>
      <n-icon :component="icon" size="20" :color="color"/>
    </template>
    <div class="btn-title" :style="textStyle">{{ title }}</div>
  </n-button>
</template>
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '按鈕'
  },
  type: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: null
  }
})

const textStyle = computed(() => {
  return {
    color: props.color
  }
})

</script>
<style lang="scss" scoped>
</style>