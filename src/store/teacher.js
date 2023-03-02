import { defineStore } from 'pinia'
import http from '@/lib/axios.js'
import { reactive } from 'vue'
import { teacherFakeData } from './FakeData'

export const useTeacher = defineStore('teacher', () => {
  const list = reactive([])

  const init = async () => {
    list.splice(0)

    await http(
      {
        url: '/teacher',
        method: 'get',
      },
      {
        fakeData: teacherFakeData,
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
