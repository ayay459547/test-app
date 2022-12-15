<template>
  <div ref="tableWrapper" class="table-container" :key="tableKey">
    <n-data-table 
      ref="table"
      class="table-main"
      :columns="columns" 
      :data="showData"
      :loading="tempLoading"
      :pagination="pagination"
      flex-height
      striped
      @update:sorter="handleUpdateSorter"
      @update:filters="handleUpdateFilter"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  tableKey: {
    type: Number,
    default: 0
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
      return { pageSize: 10 }
    }
  },
  loading: {
    type: Boolean,
    default: false
  },
  filterFrom: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emits = defineEmits([
  'update:loading', 
  'update:sorter', 
  'update:filters'
])

const tempLoading = computed({
  get: () => props.loading,
  set: value => emits('update:loading', value)
})

const handleUpdateSorter = (sorters) => {
  emits('update:sorter', sorters)
}
const handleUpdateFilter = (filters, sourceColumn) => {
  emits('update:filters', filters, sourceColumn)
}

const tableWrapper = ref(null)

const showData = computed(() => {
  if (tableWrapper?.value) {
    return props.data.filter(rowData => {
      return rowData.$every((rowItem, key) => {
        if(props.filterFrom.hasOwnProperty(key)) {
          return props.filterFrom[key](rowItem)
        } else {
          return true
        }
      })
    })
  } else {
    return []
  }
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