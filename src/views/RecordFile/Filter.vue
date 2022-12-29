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
      <n-form-item label="學校" path="fromSchool">
        <n-select
          v-model:value="formValue.fromSchool"
          placeholder="輸入學校"
          :options="options"
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose, defineProps, computed } from 'vue'
import { useSchool } from '@/store/school.js'

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

const filterPropsList = ['name', 'phone', 'email', 'fromSchool']

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
      case 'fromSchool':
        if (formValue.value[prop]) {
          const tempIndex = formValue.value[prop]
          filterFrom[prop] = (v) => { 
            const index =  v.$findIndex(item => {
              return item === tempIndex
            })
            return index > -1
          }
        } else {
          filterFrom[prop] = (v) => { return true }
        }
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