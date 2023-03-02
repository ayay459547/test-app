import { defineStore } from 'pinia'
import http from '@/lib/axios.js'
import { reactive } from 'vue'
import { studentFakeData } from './FakeData'

export const useStudent = defineStore('student', () => {
  const list = reactive([])

  const init = async () => {
    list.splice(0)

    await http(
      {
        url: '/student',
        method: 'get',
      },
      {
        fakeData: studentFakeData,
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
