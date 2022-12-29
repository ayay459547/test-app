<template>
  <div>
    <n-form ref="formRef" :model="formValue" class="grid-row">
      <n-form-item label="名稱" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入名稱" />
      </n-form-item>
      <n-form-item label="老師" path="mainTeacher" class="grid-col-lg-4">
        <n-select
          v-model:value="formValue.mainTeacher"
          placeholder="輸入老師"
          :options="options.teacher"
          clearable
        />
      </n-form-item>
      <n-form-item label="助教" path="subTeacher" class="grid-col-lg-4">
        <n-select
          v-model:value="formValue.subTeacher"
          placeholder="輸入老師"
          :options="options.teacher"
          clearable
        />
      </n-form-item>
      <n-form-item label="學校" path="school" class="grid-col-lg-4">
        <n-select
          v-model:value="formValue.school"
          placeholder="輸入學校"
          :options="options.shcool"
          multiple
          clearable
        />
      </n-form-item>
    </n-form>

    <div>
      <FormTable 
        :column="testColumn"
        :row="testRow"
      >
        <template v-slot:header-name="nameScrop">
          <div>
            {{ `key = ${nameScrop.key}`}}
          </div>
        </template>
        <template v-slot:column-name="nameScrop">
          <div>
            {{ `data${nameScrop.index} = ${nameScrop.data}`}}
          </div>
        </template>
      </FormTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose } from 'vue'
import { useSchool } from '@/store/school.js'
import { useTeacher } from '@/store/teacher.js'
import http from '@/lib/axios.js'

const testColumn = [
  {
    title: '名稱',
    key: 'name'
  },
  {
    title: 'col1',
    key: 'col1'
  },
  {
    title: 'col2',
    key: 'col2'
  },
  {
    title: 'col3',
    key: 'col3'
  },
  {
    title: 'col4',
    key: 'col4'
  }
]
const testRow = [
  {
    name: '小名',
    col1: '111',
    col2: '222',
    col3: '333',
    col4: '444',
    col5: '555'
  },
  {
    name: '小名2',
    col1: '5111',
    col2: '5222',
    col3: '5333',
    col4: '5444',
    col5: '9555'
  },
  {
    name: '小名3',
    col1: '7111',
    col2: '7222',
    col3: '7333',
    col4: '7444',
    col5: '7555'
  }
]

const store = {
  school: useSchool(),
  teacher: useTeacher()
}
const options = computed(() => {
  return {
    shcool: store.school.list.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    }),
    teacher: store.teacher.list.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
  }
})

const formRef = ref(null)
  
const formValue = ref({
  name: null,
  school: null,
  mainTeacher: null,
  subTeacher: null,
  studentList: [],
  dateList: [],
  checkForm: []
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
      url: '/student', 
      method: 'post', 
      data
    })
  }
})

</script>

<style lang="scss" scoped>
</style>