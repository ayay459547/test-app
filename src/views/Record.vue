<template>
  <div class="record-wrapper">
    <div class="record-header">
      <TButton 
        title="新增" 
        type="primary"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="openCreate"
      />

      <TFilter @clear="clearFilter" @submit="submitFilter">
        <template #default>
          <StudentFilter ref="refFilter" v-model:form="formValue"/>
        </template>
      </TFilter>
    </div>
    <div class="record-table">
      <TTable 
        :loading="loading" 
        :columns="columns"
        :tableKey="tableKey"
        :data="recordData" 
        :filterFrom="filterFrom"
        @update:sorter="handleUpdateSorter"
      />
    </div>

    <TModal 
      v-model:showModal="showModal.create" 
      title="新增紀錄"
      :modalStyle="modalStyle"
      @cancel="showModal.create = false"
      @submit="addStudent"
    >
      <template #default>
        <Create ref="refCreate"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.edit" 
      title="編輯紀錄"
      :modalStyle="modalStyle"
      @cancel="cancelEdit"
      @submit="updateStudent"
    >
      <template #default>
        <Edit ref="refEdit" :data="currentModalData"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.delete" 
      title="刪除紀錄"
      @cancel="cancelDelete"
      @submit="deleteStudent"
    >
      <template #default>
        <Delete ref="refDelete" :data="currentModalData"/>
      </template>
    </TModal>
  </div>
</template>

<script>
import { h, defineComponent, ref, reactive, onMounted, computed } from 'vue'
import { Add12Filled } from '@vicons/fluent'
import { NButton } from 'naive-ui'
import http from '@/lib/axios.js'
import StudentFilter from './RecordFile/Filter.vue'
import Create from './RecordFile/Create.vue'
import Edit from './RecordFile/Edit.vue'
import Delete from './RecordFile/Delete.vue'
import { useSchool } from '@/store/school.js'
import { useStudent } from '@/store/student.js'
import { useTeacher } from '@/store/teacher.js'
import { FakeData } from './RecordFile/FakeData.js'
import { useNotification } from 'naive-ui'

export default defineComponent({
  components: {
    StudentFilter,
    Create,
    Edit,
    Delete
  },
  setup() {
    const loading = ref(false)

    const tableKey = ref(0)
    // store
    const store = {
      school: useSchool(),
      student: useStudent(),
      teacher: useTeacher()
    }
    const getSchoolName = (dataId) => {
      const data = store.school.list.find(item => item.id === dataId)

      return data?.name ?? `無此學校 ${dataId} ID`
    }

    const getTeacherName = (dataId) => {
      if(dataId === null) return '無'
      const data = store.teacher.list.find(item => item.id === dataId)
      
      return data?.name ?? `無此老師 ${dataId} ID`
    }

    // filter
    const refFilter = ref(null)
    const formValue = reactive({
      name: null,
      phone: null,
      email: null,
      fromSchool: null
    })
    const filterFrom = reactive({})

    function setFilterFrom (tempFilterFrom) {
      tempFilterFrom.$forEach((item, key) => {
        filterFrom[key] = item
      })
    }

    const clearFilter = () => {
      formValue.name = null
      formValue.phone = null
      formValue.email = null
      formValue.fromSchool = null

      const tempFilterFrom = refFilter.value.getData()
      setFilterFrom(tempFilterFrom)
      tableKey.value++
    }
    const submitFilter = () => {
      refFilter.value.setData()

      const tempFilterFrom = refFilter.value.getData()
      setFilterFrom(tempFilterFrom)
      tableKey.value++
    }

    // table
    const sortStatesRef = ref([])
    const sortKeyMapOrderRef = computed(() =>
      sortStatesRef.value.reduce((result, { columnKey, order }) => {
        result[columnKey] = order
        return result
      }, {})
    )
    function handleUpdateSorter (sorters) {
      sortStatesRef.value = [].concat(sorters)
    }

    const columns = computed(() => [
      {
        key: 'name',
        title: '名稱',
        width: 150
      },
      {
        title: '學校',
        key: 'school',
        width: 150,
        render (row) {
          return h(
            'div', {}, { default: () => getSchoolName(row.school)}
          )
        }
      },
      {
        title: '老師',
        key: 'mainTeacher',
        width: 150,
        render (row) {
          return h(
            'div', {}, { default: () => getTeacherName(row.mainTeacher)}
          )
        }
      },
      {
        title: '助教',
        key: 'subTeacher',
        width: 150,
        render (row) {
          return h(
            'div', {}, { default: () => getTeacherName(row.subTeacher)}
          )
        }
      },
      {
        title: '學生數',
        key: 'studentList',
        minWidth: 200,
        sortOrder: sortKeyMapOrderRef.value.fromSchool || false,
        sorter: (a, b) => a.fromSchool.length - b.fromSchool.length,
        render (row) {
          return h(
            'div', {}, { default: () => row.studentList.length }
          )
        }
      },
      {
        title: '管理',
        key: 'actions',
        width: 150,
        render(row) {
          return h(
            'div',
            {
              class: 'n-ga-md flex-row'
            },
            {
              default: () => [
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => {
                      openEdit(row)
                    }
                  },
                  { default: () => '編輯' }
                ),
                h(
                  NButton,
                  {
                    size: 'small',
                    onClick: () => {
                      openDelete(row)
                    },
                    type: 'error'
                  },
                  { default: () => '刪除' }
                ) 
              ]
            }
          )
        }
      }
    ])

    const recordData = reactive([])
    const getStudentData = async () => {
      await http({
        url: '/record',
        method: 'get',
      }, {
        fakeData: FakeData,
        getFakeData: true
      }).then(dateList => {
        dateList.forEach(dateItem => {
          recordData.push({
            key: dateItem.id,
            ...dateItem
          })
        })
      })
    }

    const init = async() => {
      loading.value = true
      recordData.splice(0)
      await Promise.all([
        getStudentData(), 
        store.student.init()
      ])

      loading.value = false
    }

    onMounted(() => {
      init()
    })

    // modal
    const currentModalData = ref(null)
    const showModal = reactive({
      create: false,
      edit: false,
      delete: false
    })

    const notification = useNotification()
    // create
    const refCreate = ref(null)
    const openCreate = () => {
      showModal.create = true
    }
    const addStudent = () => {
      const createData = refCreate.value.getData()
      const res = refCreate.value.upload(createData)
      res.then(() => {
        const type = 'success'
        notification[type]({
          content: "成功",
          meta: "資料更新",
          duration: 1500,
          keepAliveOnHover: true
        })
        init()
        showModal.create = false
      })
    }
    // edit
    const refEdit = ref(null)
    const openEdit = (row) => {
      showModal.edit = true
      currentModalData.value = row
    }
    const cancelEdit = () => {
      showModal.edit = false
      currentModalData.value = null
    }
    const updateStudent = () => {
      const editData = refEdit.value.getData()
      const rowId = editData.id
      const res = refEdit.value.upload(editData, rowId)
      res.then(() => {
        const type = 'success'
        notification[type]({
          content: "成功",
          meta: "資料更新",
          duration: 1500,
          keepAliveOnHover: true
        })
        init()
        showModal.edit = false
      })
    }
    // delete
    const refDelete = ref(null)
    const openDelete = (row) => {
      showModal.delete = true
      currentModalData.value = row
    }
    const cancelDelete = () => {
      showModal.delete = false
      currentModalData.value = null
    }
    const deleteStudent = () => {
      const delData = refDelete.value.getData()
      const rowId = delData.id
      const res = refDelete.value.upload(delData, rowId)
      res.then(() => {
        const type = 'success'
        notification[type]({
          content: "成功",
          meta: "資料更新",
          duration: 1500,
          keepAliveOnHover: true
        })
        init()
        showModal.delete = false
      })
    }
    return {
      loading,
      Add12Filled,
      // 為了filter 重新渲染
      tableKey,
      // store
      store,
      getSchoolName,
      getTeacherName,
      // filter
      formValue,
      filterFrom,
      refFilter,
      clearFilter,
      submitFilter,
      // table
      columns,
      recordData,
      handleUpdateSorter,
      // modal
      currentModalData,
      showModal,
      // create
      refCreate,
      openCreate,
      addStudent,
      // edit
      refEdit,
      openEdit,
      cancelEdit,
      updateStudent,
      // delete
      refDelete,
      openDelete,
      cancelDelete,
      deleteStudent,
      // modal style
      modalStyle: {
        width: '80%',
        minWidth: '500px'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.record {
  &-wrapper {
    padding: 16px;
    overflow: auto;
    height: calc(100% - 32px);
    display: flex;
    flex-direction: column;
  }

  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-table {
    flex: 1;
  }
}
</style>
