<template>
  <n-config-provider :theme="darkTheme">
    <Layout :routerData="routes" v-loading="loading">
      <template #routerView>
        <router-view />
      </template>
    </Layout>
  </n-config-provider>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import { darkTheme } from 'naive-ui'
import Layout from '@/layout/Layout.vue'
import { routes } from '@/router'
import { useStudent } from '@/store/student.js'
import { useTeacher } from '@/store/teacher.js'
import { useSchool } from '@/store/school.js'
// import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    Layout
  },
  setup() {
    const loading = ref(false)

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
      darkTheme,
      routes
    }
  }
})
</script>

<style lang="scss" scoped></style>
