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
import { ref, defineProps, onMounted, defineExpose, computed } from 'vue'
import { useSchool } from '@/store/school.js'
import http from '@/lib/axios.js'

const formRef = ref(null)

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

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        id: null,
        name: null,
        phone: null,
        email: null,
        manageSchool: []
      }
    }
  }
})

const formValue = ref({
  id: null,
  name: null,
  phone: null,
  email: null,
  manageSchool: []
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
      url: `/teacher/${rowId}`,
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