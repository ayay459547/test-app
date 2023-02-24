<template>
  <div ref="mapRef" class="google-map-container">
    Google map
  </div>
</template>
<script setup>
import { Loader } from "@googlemaps/js-api-loader"
import { reactive, ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  center: {
    type: Object,
    default () {
      return { lat: 25.0425, lng: 121.5468 }
    }
  },
  zoom: {
    type: Number,
    default: 11
  },
  mapTypeId: {
    type: String,
    default: 'roadmap',
    description: `
      roadmap 顯示默認道路地圖視圖。
      satellite 顯示 Google 地球衛星圖像。
      hybrid 顯示正常和衛星視圖的混合。
      terrain 顯示基於地形信息的物理地圖。
    `
  }
})

const states = reactive({
  google: null,
  map: null,
  markers: null,
})
const mapRef = ref(null)

const initMap = async () => {
  const { center, zoom, mapTypeId } = props

  const loader = new Loader({
    apiKey: process.env.VUE_APP_GOOGLE_MAP_API,
    version: "weekly",
    libraries: ["places"],
    language: "zh-TW",
  })
  states.google = await loader.load()
  states.map = new states.google.maps.Map(mapRef.value, {
    center: { 
      ...center
    },
    zoom,
    mapTypeId,
    // mapTypeControl: true,
    // fullscreenControl: true,
  })
}

onMounted(() => {
  initMap()
})

</script>
<style lang="scss" scoped>
.google-map-container {
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  border: 1px solid skyblue;
}
</style>