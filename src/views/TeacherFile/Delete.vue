<template>
  <div class="delete-title">
    {{ `確定刪除 ${name} 嗎?` }}
  </div>
</template>

<script setup>
import { defineProps, defineExpose, computed } from 'vue'
import http from '@/lib/axios.js'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        id: null,
        name: null,
        phone: null,
        email: null
      }
    }
  }
})
const name = computed(() => {
  return props.data?.name ?? ''
})

defineExpose({
  getData() {
    return props.data
  },
  upload(data, rowId) {
    return http({ 
      url: `/teacher/${rowId}`,
      method: 'delete', 
      data
    })
  }
})

</script>

<style lang="scss" scoped>
.delete-title {
  font-size: 1.2em;
  color: $danger;
}
</style>