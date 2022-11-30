<template>
  <div v-if="isShow" class="loading-box" :style="positionStyle">
    <div class="mask" :style="{ background: maskBackground }"></div>
    <div class="loading-content-box">
      <n-spin :theme-overrides="spinThemeOverrides" size="small" />
      <div :style="{ color: textColor }" class="tip">{{ tip }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, computed } from 'vue'
import { NSpin } from 'naive-ui'

const props = defineProps({
  tip: {
    type: String,
    default: 'loading......'
  },
  maskBackground: {
    type: String,
    default: 'rgba(0, 0, 0, 0.8)'
  },
  loadingColor: {
    type: String,
    default: 'rgba(255, 255, 255, 1)'
  },
  textColor: {
    type: String,
    default: 'rgba(255, 255, 255, 1)'
  }
})

const spinThemeOverrides = {
  color: props.loadingColor
}
const isShow = ref(false)
const minTime = 500
const openTime = ref(0)
const position = reactive({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
})
const positionStyle = computed(() => {
  const { top, left, bottom, right } = position

  return {
    top: `${top}px`,
    left: `${left}px`,
    bottom: `${bottom}px`,
    right: `${right}px`
  }
})

const show = () => {
  // const elAttr = el?.getBoundingClientRect() ?? {}
  // const { top = 0, left = 0, width = 0, height = 0 } = elAttr
  // position.top = top
  // position.left = left
  // position.width = width
  // position.height = height

  openTime.value = Date.now()
  isShow.value = true
}
const hide = () => {
  // 強制間格超過300毫秒
  if (Date.now() >= openTime.value + minTime) {
    isShow.value = false

  } else {
    setTimeout(() => {
      isShow.value = false
    }, minTime)
  }
}

defineExpose({
  isShow,
  show,
  hide
})

</script>

<style lang="scss" scoped>
.loading {
  &-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: $loading;

    .n-spin {
      color: #ccc;
    }
    .mask {
      width: 100%;
      height: 100%;
    }
    .tip {
      font-size: 14px;
      margin-top: 8px;
    }
  }

  &-content-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>