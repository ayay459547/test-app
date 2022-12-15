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
      <n-form-item label="學校" path="manageSchool">
        <n-select
          v-model:value="formValue.manageSchool"
          placeholder="輸入學校"
          :options="options"
          multiple
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import { useSchool } from '@/store/school.js'
import http from '@/lib/axios.js'

const store = {
  school: useSchool()
}
const options = computed(() => {
  return store.school.list.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  })
})

const formRef = ref(null)
  
const formValue = ref({
  name: null,
  phone: null,
  email: null,
  manageSchool: []
})

defineExpose({
  setData(data) {
    formValue.value = data
  },
  getData() {
    return formValue.value
  },
  upload(data) {
    return http({ 
      url: '/teacher', 
      method: 'post', 
      data
    })
  }
})

</script>

<style lang="scss" scoped>
  
</style>