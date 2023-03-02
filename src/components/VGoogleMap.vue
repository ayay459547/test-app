<template>
  <div ref="mapRef" class="google-map-container">
    Google map
  </div>
</template>
<script setup>
import { Loader } from "@googlemaps/js-api-loader"
import { 
  reactive, 
  ref, 
  onMounted, 
  defineProps, 
  defineExpose, 
  defineEmits,
} from 'vue'

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
  },
  position: {
    type: Boolean,
    default: false,
    description: `是否在初始化的圖時 定位`
  },
  initCallback: {
    type: Function,
    default () {
      return () => {}
    },
    description: `初始化後執行`
  },
  service: {
    type: Object,
    default () {
      return {
        inject: false,
        inputText: ''
      }
    }
  }

})

const emit = defineEmits(['sendOptions', 'sendPlace'])

const states = reactive({
  google: null,
  map: null,
  markers: null,
  service: null,
  places: null
})
const mapRef = ref(null)

const currentPosition = reactive({
  lat: 0,
  lng: 0
})

// service
const displaySuggestions = (predictions, status) => {
  const tempOptions = []
  if (status === 'OK') {
    predictions.forEach(prediction => {
      tempOptions.push(prediction)
    })
  }
  emit('sendOptions', tempOptions)
}
const getPlacePredictions = (text = '') => {
  if (states.service && text.length > 0) {
    states.service.getPlacePredictions(
      { 
        input: text,
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lat + 0.001,
          north: currentPosition.lat - 0.001,
        },
      },
      displaySuggestions
    )
  }
}
// places
const getDetailCallback = (placeResult, status) => {
  if (status === 'OK') {
    emit('sendPlace', placeResult)
  }
}
const getDetails = (placeId = '') => {
  if (states.places && placeId.length > 0) {
    states.places.getDetails(
      {
        placeId,
        language: 'zh-TW'
      },
      getDetailCallback
    )
  }
}

const initMap = async () => {
  const { 
    center, 
    zoom, 
    mapTypeId, 
    position, 
    initCallback,
    service
  } = props
  const { lat, lng } = center

  // google
  const loader = new Loader({
    apiKey: process.env.VUE_APP_GOOGLE_MAP_API,
    version: "weekly",
    libraries: ["places"],
    language: "zh-TW",
  })
  states.google = await loader.load()

  // map
  states.map = new states.google.maps.Map(mapRef.value, {
    center: { lat , lng },
    zoom,
    mapTypeId,
    // mapTypeControl: true,
    // fullscreenControl: true,
  })

  if (position) {
    navigator.geolocation.getCurrentPosition((pos) => {
      currentPosition.lat = pos.coords.latitude
      currentPosition.lng = pos.coords.longitude

      states.map.setCenter(currentPosition)
      states.map.setZoom(16)
    })
  }
  // places
  if (states.google && states.map) {    
    states.places = new states.google.maps.places.PlacesService(states.map)
  }

  // service
  if (service?.inject && states.google) {    
    states.service = new states.google.maps.places.AutocompleteService()
    getPlacePredictions(service.inputText)
  }

  initCallback()
}

defineExpose({
  states,
  currentPosition,
  getPlacePredictions,
  getDetails
})

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