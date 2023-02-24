<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <Layout :routerData="routes" v-loading="loading">
        <template #routerView>
          <router-view />
        </template>
      </Layout>
    </n-notification-provider>
  </n-config-provider>
</template>

<script>
import { ref, defineComponent, onMounted, provide } from 'vue'
import { darkTheme } from 'naive-ui'
import Layout from '@/layout/Layout.vue'
import { routes } from '@/router'
import { useStudent } from '@/store/student.js'
import { useTeacher } from '@/store/teacher.js'
import { useSchool } from '@/store/school.js'
import { NNotificationProvider } from 'naive-ui'
// import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    Layout,
    NNotificationProvider
  },
  setup() {
    const loading = ref(false)
    const test = ref('test')

    provide('change', () => {
      if (test.value) {
        test.value = null
      } else {
        test.value = 'test'
      }
      console.log(test)
    })

    const store = {
      student: useStudent(),
      teacher: useTeacher(),
      school: useSchool()
    }
    
    const init = () => {
      // loading.value = true

      Promise.all([
        store.student.init(),
        store.teacher.init(),
        store.school.init()
      ]).then(() => {
        loading.value = false
      })
    }

    onMounted(() => {
      init()
      console.log('app init')
    })

    return {
      loading,
      init,
      routes,
      darkTheme
    }
  }
})
</script>

<style lang="scss" scoped></style>
