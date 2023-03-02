<template>
  <div>
    <n-form ref="formRef" :model="formValue" class="grid-row">
      <n-form-item label="名稱" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入名稱" />
      </n-form-item>
      <n-form-item label="老師" path="mainTeacher" class="grid-col-lg-8">
        <n-select
          v-model:value="formValue.mainTeacher"
          placeholder="輸入老師"
          :options="options.teacher"
          clearable
        />
      </n-form-item>
      <n-form-item label="助教" path="subTeacher" class="grid-col-lg-8">
        <n-select
          v-model:value="formValue.subTeacher"
          placeholder="輸入老師"
          :options="options.teacher"
          clearable
        />
      </n-form-item>
      <n-form-item label="學校" path="school" class="grid-col-lg-8">
        <n-select
          v-model:value="formValue.school"
          placeholder="輸入學校"
          :options="options.school"
          clearable
        />
      </n-form-item>
    </n-form>

    <div class="flex-row content-end n-ga-md">
      <TButton 
        title="加入學生" 
        type="info"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="addStudent"
      />
      <TButton 
        title="加入日期" 
        type="info"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="addDate"
      />
    </div>

    <div>
      <FormTable 
        :column="tableColumn"
        :row="formValue.checkForm"
      >
        <template v-slot:header-student="{ data }">
          <div>{{ data }}</div>
        </template>
        <template v-slot:header="{ columnIndex }">
          <div class="flex-row n-ga-sm">
            <n-date-picker 
              v-model:formatted-value="formValue.dateList[columnIndex]"
              value-format="yyyy-MM-dd"
              type="date"
              clearable
            />

            <TButton
              type="error"
              :icon="Trash"
              circle
              @click="removeDate(columnIndex)"
            />
          </div>
        </template>

        <template v-slot:column-student="{ rowIndex }">
          <div class="flex-row n-ga-sm">
            <n-select
              :value="formValue.studentList[rowIndex]"
              placeholder="輸入學生"
              :options="studentOptions"
              clearable
              @update:value="setStudent($event, rowIndex)"
            />

            <TButton
              type="error"
              :icon="Trash"
              circle
              @click="removeStudent(rowIndex)"
            />
          </div>
        </template>
        <template v-slot:column="{ rowIndex, columnIndex }">
          <div class="flex-row align-center n-ga-sm">
            <n-checkbox 
              :value="getCheckForm(rowIndex, columnIndex, 'attend')" 
              @update:checked="setCheckForm($event, rowIndex, columnIndex, 'attend')"
            />

            <n-input 
              :value="getCheckForm(rowIndex, columnIndex, 'ps')"
              placeholder="備註"
              @update:value="setCheckForm($event, rowIndex, columnIndex, 'ps')"
            />
          </div>
        </template>
      </FormTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose, reactive, onMounted } from 'vue'
import { useSchool } from '@/store/school.js'
import { useTeacher } from '@/store/teacher.js'
import { useStudent } from '@/store/student.js'
import http from '@/lib/axios.js'
import { Add12Filled } from '@vicons/fluent'
import { Trash } from '@vicons/fa'

const store = {
  school: useSchool(),
  teacher: useTeacher(),
  student: useStudent()
}

const formRef = ref(null)
  
const formValue = reactive({
  name: null,
  school: null,
  mainTeacher: null,
  subTeacher: null,
  studentList: [],
  dateList: [],
  checkForm: []
})

const options = computed(() => {
  return {
    school: store.school.list.map(item => {
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

const studentOptions = computed(() => {
  return store.student.list.reduce((prev, curr) => {
    // if (!formValue.studentList.includes(curr.id)) {
    //   prev.push({
    //     label: curr.name,
    //     value: curr.id
    //   })
    // }

    prev.push({
      label: curr.name,
      value: curr.id
    })
    return prev
  }, [])
})

const tableColumn = computed(() => {
  return [
    {
      title: '學生名稱',
      key: 'student',
      minWidth: 180
    }
  ].concat(
    formValue.dateList.map((item, index) => {
      return {
        title: item,
        key: item,
        index,
        minWidth: 200
      }
    })
  )
})

function setCheckForm (v, rowIndex, columnIndex, type) {
  const date = formValue.dateList[columnIndex]

  if ([null, undefined].includes(date)) return

  if ([null, undefined].includes(formValue.checkForm[rowIndex][date])) {
    formValue.checkForm[rowIndex][date] = {
      attend: 'false',
      ps: ''
    }
  }

  formValue.checkForm[rowIndex][date][type] = `${v}`
}

function getCheckForm (rowIndex, columnIndex, type) {
  const date = formValue.dateList[columnIndex]

  const form = formValue.checkForm[rowIndex][date] ?? {
    attend: 'true',
    ps: ''
  }

  return form[type]
}

function addDate () {
  formValue.dateList.push(null)
}
function removeDate (index) {
  formValue.dateList.splice(index, 1)
}

// const sutendtList = computed(() => {
//   return store.student.list
// })

function addStudent () {
  // formValue.studentList.push(studentId)
  formValue.checkForm.push({
    student: {
      attend: false,
      ps: ''
    }
  })
}
function removeStudent (rowIndex) {
  formValue.checkForm.splice(rowIndex, 1)
}

function setStudent (v, rowIndex) {
  console.log('v => ', v)
  console.log('rowIndex => ', rowIndex)

  formValue.studentList[rowIndex] = v
}

onMounted(() => {
  addDate()
})

defineExpose({
  setData(data, key) {
    if (![null, undefined, ''].includes(key)) {
      formValue[key] = data
    }
  },
  getData(key) {
    if (![null, undefined].includes(key)) {
      return formValue[key]
    } else {
      return formValue
    }
  },
  upload(data) {
    return http({ 
      url: '/record', 
      method: 'post', 
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