<template>
  <div class="layout-container">
    <header class="layout-header">
      <h1 class="layout-title">Time Sheet Manage System</h1>

      <n-button class="layout-btn" @click="isShow = true" block>
        <template #icon>
          <n-icon :component="Bars" size="40" :depth="4" />
        </template>
      </n-button>
    </header>

    <main class="layout-main">
      <slot name="routerView"></slot>
    </main>

    <SideBar 
      v-model:isShow="isShow" 
      :width="240" 
      :title="`選單`" 
      :routerData="routerData"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SideBar from './SideBar.vue'
import { Bars } from '@vicons/fa'

export default defineComponent({
  name: 'Layout',
  components: {
    SideBar
  },
  props: {
    routerData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    return {
      isShow: ref(false),
      Bars
    }
  }
})
</script>

<style lang="scss" scoped>
.layout {
  &-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    padding: 8px;
    background-color: #404043;
  }

  &-title {
    color: #fff;
    margin: 0;
  }

  &-btn {
    width: fit-content;
    padding: 26px 20px;
  }

  &-main {
    display: block;
    overflow: hidden;
    flex: 1;
    background: #66666c;
  }
}
</style>