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
    description: `是否在初始化的圖時 定位當前位置`
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
        marker: false,
        places: false,
        autocompleteService: false,
        directionsService: false,
        directionsRenderer: false,
        infoWindow: false
      }
    }
  }

})

const emit = defineEmits([
  'sendOptions', 
  'sendPlace',
  'currentPosition'
])

const states = reactive({
  google: null,
  map: null,
  marker: null,
  places: null,
  autocompleteService: null,
  directionsService: null,
  directionsRenderer: null,
  infoWindow: null,
})
const mapRef = ref(null)

const currentPosition = reactive({
  lat: 0,
  lng: 0
})

// map
const setCenter = (position) => {
  if (states.map) {
    states.map.setCenter(position)
  }
}
// marker
const createMarker = (position, placeId = '') => {
  if (typeof states.marker === 'object' && placeId.length > 0) {
    const tempMarker = new states.google.maps.Marker({
      map: states.map,
      position
    })
    states.marker[placeId] = tempMarker
  }
}
// autocompleteService
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
  if (states.autocompleteService && text.length > 0) {
    states.autocompleteService.getPlacePredictions(
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
// infoWindow
const createInfoWindow = (target, duration) => {
  if (typeof states.infoWindow === 'object' && target.placeId.length > 0) {
    const tempInfoWindow = new states.google.maps.InfoWindow()
    tempInfoWindow.setContent(`
      <h3>${target?.name ?? ''}</h3>
      <div>地址: ${target?.address ?? ''}</div>
      <div>電話: ${target?.phoneNumber ?? ''}</div>
      <div>評分: ${target?.rating ?? ''}</div>
      <div>步行時間: ${duration ?? ''}</div>
    `)
    states.infoWindow[target.placeId] = tempInfoWindow
  }
}
const openInfowindow = (placeId = '') => {
  if (placeId.length > 0 && states.infoWindow.hasOwnProperty(placeId)) {
    states.infoWindow[placeId].open(states.map, states.marker[placeId])
  }
}
// route
const setRoute = async (origin, target) => {
  const settingOrigin = {
    location: { lat: 0, lng: 0 },
    placeId: '',
    name: '起始位置',
    address: '',
    phoneNumber: '',
    rating: '',
    ...origin
  }
  const settingTarget = {
    location: { lat: 0, lng: 0 },
    placeId: '',
    name: '',
    address: '',
    phoneNumber: '',
    rating: '',
    ...target
  }
  if (states.directionsService) {
    const { lat, lng } = settingOrigin.location
    await states.directionsService.route({
      origin: new states.google.maps.LatLng(lat, lng),
      destination: {
        placeId: settingTarget.placeId
      },
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        states.directionsRenderer.setDirections(response)
        const duration = response.routes[0].legs[0].duration.text
        createInfoWindow(settingTarget, duration)
      }
    })
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

  const settingService = {
    marker: false,
    places: false,
    autocompleteService: false,
    directionsService: false,
    directionsRenderer: false,
    infoWindow: false,
    ...service
  }

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
  // marker
  if (settingService.marker) {
    states.marker = {}
  }
  // places
  if (settingService.places) {    
    states.places = new states.google.maps.places.PlacesService(states.map)
  }
  // autocompleteService
  if (settingService.autocompleteService) {    
    states.autocompleteService = new states.google.maps.places.AutocompleteService()
  }
  // directionsService
  if (settingService.directionsService) {
    states.directionsService = new states.google.maps.DirectionsService()
  }
  // directionsRenderer
  if (settingService.directionsRenderer) {
    states.directionsRenderer = new states.google.maps.DirectionsRenderer({
      map: states.map
    })

    states.directionsRenderer.set('directions', null)
  }
  if (settingService.infoWindow) {
    states.infoWindow = {}
  }

  if (position) {
    navigator.geolocation.getCurrentPosition((pos) => {
      currentPosition.lat = pos.coords.latitude
      currentPosition.lng = pos.coords.longitude

      setCenter(currentPosition)
      createMarker(currentPosition, 'center')
      emit('currentPosition', currentPosition)
      states.map.setZoom(16)
    })
  }

  initCallback()
}

defineExpose({
  states,
  currentPosition,
  getPlacePredictions,
  getDetails,
  setCenter,
  createMarker,
  setRoute,
  openInfowindow
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