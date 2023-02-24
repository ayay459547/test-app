<template>
  <div class="map-wrapper">
    <div ref="mapRef" class="map-container">
      <VGoogleMap mapTypeId="hybrid"></VGoogleMap>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { throttle } from '@/lib/throttle.js'

let mapHeight = ref(500)
const ROcallback = throttle((entries) => {
  entries.forEach((entry) => {
    mapHeight.value = entry.contentRect.height
  })
}, 100)
const RO = new ResizeObserver(ROcallback)
const mapRef = ref(null)

const mapStyle = computed(() => {
  return {
    width: '100%',
    style: `${Math.floor(mapHeight.value)}px`
  }
})

onMounted(() => {
  if (mapRef.value !== null) {
    RO.observe(mapRef.value)
  }
})

onUnmounted(() => {
  RO.disconnect()
})

const center = {lat: 51.093048, lng: 6.842120}

</script>

<style lang="scss" scoped>
.map {
  &-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &-container {
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    background-color: #fff;
    overflow: hidden;
  }
}
</style>