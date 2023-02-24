<template>
  <div>
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
import { ref, defineProps, onMounted, defineExpose } from "vue"
import http from '@/lib/axios.js'

const formRef = ref(null)

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

const formValue = ref({
  id: null,
  name: null,
  phone: null,
  email: null
})

onMounted(() => {
  props.data.$forEach((value, key) => {
    formValue.value[key] = value
  })
})

defineExpose({
  setData(data) {
    formValue.value = data
  },
  getData() {
    return formValue.value
  },
  upload(data, rowId) {
    return http({ 
      url: `/school/${rowId}`,
      method: 'put', 
      data
    },{
      fakeData: null,
      getFakeData: true
    })
  }
})

</script>

<style lang="scss" scoped>

</style>