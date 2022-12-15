<template>
  <div class="home-wrapper grid-row" v-loading="loading">
    <div class="home-calendar grid-col-xl-8">
      <n-calendar 
        :style="{ width: '100%', height: '100%' }" 
        v-model:value="value" #="{ year, month, date }"
        :is-date-disabled="isDateDisabled" 
        @update:value="handleUpdateValue"
      >
        {{ calendarData[`${year}-${month}-${date}`] ?? '' }}
      </n-calendar>
    </div>

    <div class="home-tip grid-col-xl-4">
      <div style="font-size: 3em">content</div>
    </div>

    <TModal 
      v-model:showModal="showModal" 
      title="編輯"
      @submit="setCalendarData"
    >
      <template #default>
        <n-input
          v-model:value="modalData"
          type="textarea"
          placeholder="備註"
        />
      </template>
    </TModal>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue"
import { isYesterday, addDays } from "date-fns/esm"
import http from '@/lib/axios.js'

export default defineComponent({
  setup() {
    const loading = ref(false)

    const calendarData = reactive({})
    const getCalendarData = async () => {
      await http({
        url: '/dashboard',
        method: 'get',
      }, {
        fakeData: [],
        getFakeData: false
      }).then(dateList => {
        dateList.forEach(dateItem => {
          calendarData[dateItem.id] = dateItem.ps
        })
      })
    }

    const init = async() => {
      loading.value = true
      calendarData.value = {}
      await getCalendarData()

      loading.value = false
    }

    onMounted( () => {
      init()
    })

    const modalData = ref('')
    const currentDate = ref('')
    const showModal = ref(false)

    const setCalendarData = () => {
      loading.value = true
      let url = ''
      let method = ''
      let data =  {
        id: currentDate.value,
        ps: modalData.value 
      }

      // 如果資料存在
      if(calendarData.hasOwnProperty(currentDate.value)) {
        url = `/dashboard/${currentDate.value}`

        // 空的就刪除
        if(modalData.value === '') {
          method = 'delete'

          delete calendarData[currentDate.value]
        } else {
          method = 'put'
        }
        
      } else if(modalData.value !== '') {
        url = `/dashboard`
        method = 'post'
      }

      http({ url, method, data }).then(() => {
        init()
      })
    }

    return {
      loading,
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue(_, { year, month, date }) {
        modalData.value = calendarData[`${year}-${month}-${date}`] ?? ''
        currentDate.value = `${year}-${month}-${date}`
        showModal.value = true
      },
      isDateDisabled(timestamp) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      },
      calendarData,
      showModal,
      setCalendarData,
      modalData
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  &-wrapper {
    padding: 16px;
    overflow: auto;
    height: calc(100% - 32px);
  }

  &-calendar {
    min-height: 550px;

    @media screen and (max-width: $small) {
      min-height: fit-content;
    }
  }

  &-tip {
    min-height: 550px;
    height: fit-content;

    @media screen and (max-width: $x-large) {
      min-height: fit-content;
    }
  }
}
</style>
