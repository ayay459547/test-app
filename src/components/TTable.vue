<template>
  <div ref="tableWrapper" class="table-container">
    <n-data-table 
      ref="table"
      class="table-main"
      :columns="columns" 
      :data="data"
      :loading="tempLoading"
      :pagination="pagination"
      flex-height
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  data: {
    type: Array,
    default() {
      return []
    }
  },
  pagination: {
    type: Object,
    default() {
      return { pageSize: 5 }
    }
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:loading'])

const tempLoading = computed({
  get: () => props.loading,
  set: value => emit('update:loading', value)
})

</script>

<style lang="scss" scoped>
.table {
  &-container {
    width: 100%;
    height: 100%;
    background-color: #45454b;
  }

  &-main {
    height: 100%;
  }
}
</style>