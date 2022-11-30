<template>
  <n-config-provider :theme="darkTheme">
    <Layout :routerData="routes">
      <template #routerView>
        <router-view />
      </template>
    </Layout>
  </n-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'
import Layout from '@/layout/Layout.vue'
import { routes } from '@/router'

export default defineComponent({
  components: {
    Layout
  },
  setup() {
    return {
      darkTheme,
      routes
    }
  }
})
</script>

<style lang="scss" scoped></style>
