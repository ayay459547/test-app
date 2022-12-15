<template>
  <div class="student-wrapper">
    <div class="student-header">
      <TButton 
        title="新增" 
        type="info"
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
    <div class="student-table">
      <TTable 
        :loading="loading" 
        :columns="columns"
        :tableKey="tableKey"
        :data="studentData" 
        :filterFrom="filterFrom"
        @update:sorter="handleUpdateSorter"
      />
    </div>

    <TModal 
      v-model:showModal="showModal.create" 
      title="新增學生"
      @cancel="showModal.create = false"
      @submit="addStudent"
    >
      <template #default>
        <Create ref="refCreate"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.edit" 
      title="編輯學生"
      @cancel="cancelEdit"
      @submit="updateStudent"
    >
      <template #default>
        <Edit ref="refEdit" :data="currentModalData"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.delete" 
      title="刪除學生"
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
import { Add12Filled } from "@vicons/fluent"
import { NTag, NButton } from "naive-ui"
import http from '@/lib/axios.js'
import StudentFilter from './StudentFile/Filter.vue'
import Create from './StudentFile/Create.vue'
import Edit from './StudentFile/Edit.vue'
import Delete from './StudentFile/Delete.vue'
import { useSchool } from '@/store/school.js'

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
      school: useSchool()
    }
    const getSchoolName = (dataId) => {
      const data = store.school.list.find(item => item.id === dataId)

      return data?.name ?? `無此學校 ${dataId} ID`
    }

    // filter
    const refFilter = ref(null)
    const formValue = reactive({
      name: null,
      phone: null,
      email: null,
      fromSchool: []
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
      formValue.fromSchool.splice(0)

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
        title: '電話',
        key: 'phone',
        width: 150
      },
      {
        title: 'E-mail',
        key: 'email',
        minWidth: 200,
        sortOrder: sortKeyMapOrderRef.value.email || false,
        sorter: (a, b) => a.email.length - b.email.length,
      },
      {
        title: '學校',
        key: 'fromSchool',
        minWidth: 200,
        sortOrder: sortKeyMapOrderRef.value.fromSchool || false,
        sorter: (a, b) => a.fromSchool.length - b.fromSchool.length,
        render (row) {
          const tags = row.fromSchool.map((schoolKey) => {
            return h(
              NTag,
              {
                style: {
                  marginRight: '6px'
                },
                type: 'info',
                bordered: false
              },
              {
                default: () => getSchoolName(schoolKey)
              }
            )
          })
          return tags
        }
      },
      {
        title: "管理",
        key: "actions",
        width: 150,
        render(row) {
          return h(
            "div",
            {
              class: "n-ga-md flex-row"
            },
            {
              default: () => [
                h(
                  NButton,
                  {
                    size: "small",
                    onClick: () => {
                      openEdit(row)
                    }
                  },
                  { default: () => '編輯' }
                ),
                h(
                  NButton,
                  {
                    size: "small",
                    onClick: () => {
                      openDelete(row)
                    },
                    type: "error"
                  },
                  { default: () => '刪除' }
                ) 
              ]
            }
          )
        }
      }
    ])

    const studentData = reactive([])
    const getStudentData = async () => {
      await http({
        url: '/student',
        method: 'get',
      }, {
        fakeData: [],
        getFakeData: false
      }).then(dateList => {
        dateList.forEach(dateItem => {
          studentData.push({
            key: dateItem.id,
            ...dateItem
          })
        })
      })
    }

    const init = async() => {
      loading.value = true
      studentData.splice(0)
      await getStudentData()

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

    // create
    const refCreate = ref(null)
    const openCreate = () => {
      showModal.create = true
    }
    const addStudent = () => {
      const createData = refCreate.value.getData()
      const res = refCreate.value.upload(createData)
      res.then(() => {
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
      // filter
      formValue,
      filterFrom,
      refFilter,
      clearFilter,
      submitFilter,
      // table
      columns,
      studentData,
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
      deleteStudent
    }
  }
})
</script>

<style lang="scss" scoped>
.student {
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
