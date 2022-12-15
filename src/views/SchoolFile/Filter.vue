<template>
  <div class="n-pt-md">
    <n-form ref="formRef" :model="formValue">
      <n-form-item label="名稱" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入名稱" />
      </n-form-item>
      <n-form-item label="電話" path="phone">
        <n-input v-model:value="formValue.phone" placeholder="输入電話" />
      </n-form-item>
      <n-form-item label="Email" path="email">
        <n-input v-model:value="formValue.email" placeholder="輸入Email" />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose, defineProps, computed } from 'vue'

const formRef = ref(null)

const props = defineProps({
  form: {
    type: Object,
    default () {
      return {}
    }
  }
})

const formValue = computed({
  get: () => props.form,
  set: v => emit('update:form', v)
})

const filterPropsList = ['name', 'phone', 'email']

const filterFrom = reactive({})

const setData = () => {
  filterPropsList.forEach(prop => {
    switch (prop) {
      case 'name':
      case 'phone':
      case 'email':
        const s = new RegExp(`${formValue.value[prop] ?? ''}`)
        filterFrom[prop] = (v) => { return s.test(v) }
        break
      default:
        filterFrom[prop] = (v) => { return true }
        break
    }
  })
}

defineExpose({
  setData,
  getData: () => {
    return filterFrom
  }
})
</script>

<style lang="scss" scoped></style>