import { defineStore } from 'pinia'
import http from '@/lib/axios.js'
import { reactive } from 'vue'

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
        fakeData: [],
        getFakeData: false,
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
