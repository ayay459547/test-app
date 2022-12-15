<template>
  <n-popover :overlap="overlap" placement="left-start" trigger="click">
    <template #trigger>
      <TButton 
        title="篩選" 
        type="primary"
        class="n-mb-md"
        :icon="Magnify"
      />
    </template>
    <template #default>
      <div class="filter-container">
        <slot>
          無過濾選項
        </slot>
      </div>

      <div class="flex-row content-between">
        <TButton title="清除" @click="clear"/>
        <TButton title="確認" type="primary" @click="submit"/>
      </div>
    </template>
  </n-popover>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { Magnify } from "@vicons/carbon"


const overlap = ref(false)

const emits = defineEmits(['clear', 'submit'])

const clear = () => emits('clear')

const submit = () => emits('submit')

</script>

<style lang="scss" scoped>
.filter-container {
  width: fit-content;
  min-width: 300px;
  height: fit-content;
}
</style>