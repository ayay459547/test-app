<template>
  <div class="teacher-wrapper">
    <div class="teacher-btn">
      <TButton 
        title="新增" 
        type="info"
        class="n-mb-md"
        :icon="Add12Filled"
        @click="add"
      />
    </div>
    <div class="teacher-table">
      <TTable 
        :loading="loading" 
        :columns="columns" 
        :data="teacherData" 
        :pagination="pagination"
      />
    </div>
    <!-- <n-data-table ref="table" :columns="columns" :data="data" :pagination="pagination" /> -->
  </div>
</template>

<script>
import { h, defineComponent, ref, reactive, onMounted } from 'vue';
import { Add12Filled } from "@vicons/fluent";
import { NTag, NButton } from "naive-ui";
import http from '@/lib/axios.js'

export default defineComponent({
  setup() {
    const loading = ref(false)

    const columns = [
      {
        key: 'name',
        title: '名稱',
        width: 150,
        // defaultSortOrder: 'ascend',
        sorter: 'default'
      },
      {
        title: '電話',
        key: 'phone',
        width: 150,
        sorter: 'default'
      },
      {
        title: 'E-mail',
        key: 'email',
        minWidth: 200,
        sorter: 'default'
      },
      {
        title: "管理",
        key: "actions",
        width: 150,
        render(row) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => {
                console.log("send mail to " + row.name)
              }
            },
            { default: () => "Send Email" }
          );
        }
      }
    ]

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

    const init = async() => {
      loading.value = true
      await getTeacherData()

      loading.value = false
    }

    onMounted( () => {
      init()
    })

    const add = () => {
      console.log('add')
    }
    return {
      loading,
      Add12Filled,
      add,
      columns,
      teacherData,
      pagination: { pageSize: 5 }
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

  &-table {
    flex: 1;
  }
}
</style>
