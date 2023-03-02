import { defineStore } from 'pinia'
import http from '@/lib/axios.js'
import { reactive } from 'vue'
import { schoolFakeData } from './FakeData'

export const useSchool = defineStore('school', () => {
  const list = reactive([])

  const init = async () => {
    list.splice(0)

    await http(
      {
        url: '/school',
        method: 'get',
      },
      {
        fakeData: schoolFakeData,
        getFakeData: true,
      }
    ).then((dateList) => {
      dateList.forEach((dateItem) => {
        list.push({
          key: dateItem.id,
          ...dateItem,
        })
      })
    })
  }

  return {
    list,
    init
  }
})
