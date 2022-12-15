<template>
  <div class="teacher-wrapper">
    <div class="teacher-header">
      <TButton 
        title="新增" 
        type="primary"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="openCreate"
      />

      <TFilter @clear="clearFilter" @submit="submitFilter">
        <template #default>
          <SchoolFilter ref="refFilter" v-model:form="formValue"/>
        </template>
      </TFilter>
    </div>
    <div class="teacher-table">
      <TTable 
        :loading="loading" 
        :columns="columns"
        :tableKey="tableKey"
        :data="schoolData"
        :filterFrom="filterFrom"
        @update:sorter="handleUpdateSorter"
      />
    </div>

    <TModal 
      v-model:showModal="showModal.create" 
      title="新增學校"
      @cancel="showModal.create = false"
      @submit="addSchool"
    >
      <template #default>
        <Create ref="refCreate"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.edit" 
      title="編輯學校"
      @cancel="cancelEdit"
      @submit="updateSchool"
    >
      <template #default>
        <Edit ref="refEdit" :data="currentModalData"/>
      </template>
    </TModal>

    <TModal 
      v-model:showModal="showModal.delete" 
      title="刪除學校"
      @cancel="cancelDelete"
      @submit="deleteSchool"
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
import { NButton } from "naive-ui"
import http from '@/lib/axios.js'
import SchoolFilter from './SchoolFile/Filter.vue'
import Create from './SchoolFile/Create.vue'
import Edit from './SchoolFile/Edit.vue'
import Delete from './SchoolFile/Delete.vue'
import { useSchool } from '@/store/school.js'

export default defineComponent({
  components: {
    SchoolFilter,
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

    // filter
    const refFilter = ref(null)
    const formValue = reactive({
      name: null,
      phone: null,
      email: null
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
        key: 'phone',
        title: '電話',
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

    const schoolData = reactive([])

    const getSchoolData = async () => {
      await http({
        url: '/school',
        method: 'get',
      }, {
        fakeData: [],
        getFakeData: false
      }).then(dateList => {
        dateList.forEach(dateItem => {
          schoolData.push({
            key: dateItem.id,
            ...dateItem
          })
        })
      })
    }


    // 初始化
    const init = async() => {
      loading.value = true
      schoolData.splice(0)
      await Promise.all([
        getSchoolData(),
        store.school.init()
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
    const addSchool = () => {
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
    const updateSchool = () => {
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
    const deleteSchool = () => {
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
      // filter
      formValue,
      filterFrom,
      refFilter,
      clearFilter,
      submitFilter,
      // table
      columns,
      schoolData,
      handleUpdateSorter,
      // modal
      currentModalData,
      showModal,
      // create
      refCreate,
      openCreate,
      addSchool,
      // edit
      refEdit,
      openEdit,
      cancelEdit,
      updateSchool,
      // delete
      refDelete,
      openDelete,
      cancelDelete,
      deleteSchool
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
