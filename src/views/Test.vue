<template>
  <div class="test-container">
    <draggable v-model="items" class="test-list">
      <template v-slot:item="{item}">
        <div class="test-item">
            {{item.title}}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const items = reactive([
  { id: 1, title: 'item1' },
  { id: 2, title: 'item2' },
  { id: 3, title: 'item3' },
  { id: 4, title: 'item4' },
  { id: 5, title: 'item5' },
])

</script>

<style lang="scss" scoped>
.test {
  &-container {
    padding: 16px;
  }
  &-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &-item {
    background-color: #fff;
    border-radius: 8px;
    font-size: 2em;
    font-weight: 600;
    padding: 16px;
    cursor: pointer;
  }
}
</style>