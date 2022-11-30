<template>
  <n-drawer v-model:show="tempIsShow" :width="width">
    <n-drawer-content :title="title" closable>
      <nav class="side-nav">
        <router-link 
          v-for="router in routerData" 
          class="side-link" 
          :class="{ 'active': currentPath === router.path }"
          :to="router.path" :key="router.path"
        >
          <n-icon :component="router.icon" size="24" :depth="3" />
          <span class="side-title">{{ router.title }}</span>
        </router-link>
      </nav>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 500
  },
  title: {
    type: String,
    default: 'Title'
  },
  routerData: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['update:isShow'])

const tempIsShow = computed({
  get: () => props.isShow,
  set: value => emit('update:isShow', value)
})

const route = useRoute()

const currentPath = computed(() => route.path)

</script>

<style lang="scss" scoped>
::v-deep {
  .n-drawer {
    z-index: $side-nav;
  }
  .n-drawer-body-content-wrapper {
    padding: 0 !important;
  }
}

.side {
  &-nav {
    height: fit-content;
  }

  &-link {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #2c2c32;
    transition-duration: 0.1s;

    &.active,
    &:hover {
      background-color: #49494e;
    }
  }

  &-title {
    padding: 0 16px;
    font-size: 1.2em;
  }
}
</style>