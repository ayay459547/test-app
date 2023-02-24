<template>
  <n-button 
    :type="type" 
    strong 
    ghost
    :circle="props.circle"
    :round="props.round"
    :quaternary="props.quaternary"
  >
    <template v-if="props.icon !== null" #icon>
      <n-icon :component="props.icon" size="20" :color="props.color"/>
    </template>
    <div
      v-if="props.title !== ''"
      class="btn-title" 
      :style="textStyle"
    >
      {{ props.title }}
    </div>
  </n-button>
</template>
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
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
  },
  circle: {
    type: Boolean,
    default: false
  },
  round : {
    type: Boolean,
    defalut: false
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