<template>
  <div class="teacher-wrapper">
    <div class="teacher-header">
      <TButton 
        title="新增" 
        type="info"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="openCreate"
      />

      <TFilter @clear="clearFilter" @submit="submitFilter">
        <template #default>
          <TeacherFilter ref="refFilter" v-model:form="formValue"/>
        </template>
      </TFilter>
    </div>
    <div class="teacher-table">
      <TTable 
        :loading="loading" 
        :columns="columns" 
        :tableKey="tableKey"
        :data="teacherData"
        :filterFrom="filterFrom"
        @update:sorter="handleUpdateSorter"
      />
    </div>

    <TModal 
      v-model:showModal="showModal.create" 
      title="新增老師"
      @cancel="showModal.create = false"
      @submit="addTeacher"
    >
      <template #default>
        <Create ref="refCreate"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.edit" 
      title="編輯老師"
      @cancel="cancelEdit"
      @submit="updateTeacher"
    >
      <template #default>
        <Edit ref="refEdit" :data="currentModalData"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.delete" 
      title="刪除老師"
      @cancel="cancelDelete"
      @submit="deleteTeacher"
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
import TeacherFilter from './TeacherFile/Filter.vue'
import Create from './TeacherFile/Create.vue'
import Edit from './TeacherFile/Edit.vue'
import Delete from './TeacherFile/Delete.vue'
import { useSchool } from '@/store/school.js'
import { useTeacher } from '@/store/teacher.js'

export default defineComponent({
  components: {
    TeacherFilter,
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
      teacher: useTeacher()
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
      manageSchool: null
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
      formValue.manageSchool = null

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
        title: '負責學校',
        key: 'manageSchool',
        minWidth: 200,
        sortOrder: sortKeyMapOrderRef.value.manageSchool || false,
        sorter: (a, b) => a.manageSchool.length - b.manageSchool.length,
        render (row) {
          const tags = row.manageSchool.map((teacherKey) => {
            return h(
              NTag,
              {
                style: {
                  margin: '2px 6px 2px 0'
                },
                type: 'info',
                bordered: false
              },
              {
                default: () => getSchoolName(teacherKey)
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

    const teacherData = reactive([])
    const getTeacherData = async () => {
      await http({
        url: '/teacher',
        method: 'get',
      }, {
        fakeData: [],
        getFakeData: false
      }).then(dateList => {
        dateList.forEach(dateItem => {
          teacherData.push({
            key: dateItem.id,
            ...dateItem
          })
        })
      })
    }

    // 初始化
    const init = async() => {
      loading.value = true
      teacherData.splice(0)
      await Promise.all([
        getTeacherData(),
        store.teacher.init()
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

    // create
    const refCreate = ref(null)
    const openCreate = () => {
      showModal.create = true
    }
    const addTeacher = () => {
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
    const updateTeacher = () => {
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
    const deleteTeacher = () => {
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
      teacherData,
      handleUpdateSorter,
      // modal
      currentModalData,
      showModal,
      // create
      refCreate,
      openCreate,
      addTeacher,
      // edit
      refEdit,
      openEdit,
      cancelEdit,
      updateTeacher,
      // delete
      refDelete,
      openDelete,
      cancelDelete,
      deleteTeacher
    }
  }
})
</script>

<style lang="scss" scoped>
.teacher {
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
