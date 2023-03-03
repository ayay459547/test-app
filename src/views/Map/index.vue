<template>
  <div class="map-wrapper grid-row">
    <div class="map-container grid-col-lg-16">
      <VGoogleMap
        ref="mapRef"
        mapTypeId="roadmap" 
        position
        :service="service"
        @sendOptions="setOptions"
        @currentPosition="setOrigin"
        @sendPlace="setTarget"
      ></VGoogleMap>
    </div>

    <div class="map-control grid-col-lg-8">
      <n-auto-complete
        v-model:value="inputText"
        :options="options"
        clearable
        @update:value="onAutocompleteUpdate"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const mapRef = ref(null)
const inputText = ref('')
const options = reactive([])

const onAutocompleteUpdate = (text) => {
  if ([null, ''].includes(text) || text.length <= 0) return

  if (mapRef) {
    mapRef.value.getPlacePredictions(text)
  }
}
const setOptions = (list) => {
  options.splice(0)
  const temp = list.map(item => {
    return {
      label: item.description,
      value: item?.place_id ?? item.description
    }
  })
  options.push(...temp)
}


const origin = reactive({
  location: {},
  placeId: '',
  name: '當前位置',
  address: '',
  phoneNumber: '',
  rating: '',
})
const setOrigin = (currentPosition) => {
  origin.location = currentPosition
}

const target = reactive({
  location: {},
  placeId: '',
  name: '',
  address: '',
  phoneNumber: '',
  rating: '',
})
const onSelect = (placeId) => {
  if (mapRef) {
    mapRef.value.getDetails(placeId)
  }
}
const setTarget = async (placeDetail) => {
  target.location = placeDetail.geometry.location
  target.placeId = placeDetail.place_id
  target.name = placeDetail.name
  target.address = placeDetail.formatted_address
  target.phoneNumber = placeDetail.formatted_phone_number
  target.rating = placeDetail.rating

  if (mapRef) {
    await mapRef.value.createMarker(target.location, target.placeId)

    await mapRef.value.setRoute(origin, target)
    mapRef.value.openInfowindow(target.placeId)
  }
}

const service = {
  marker: true,
  places: true,
  autocompleteService: true,
  directionsService: true,
  directionsRenderer: true,
  infoWindow: true,
}

</script>

<style lang="scss" scoped>
.map {
  &-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
  }
  
  &-container {
    width: inherit;
    height: inherit;
    overflow: hidden;
  }

  &-control {
    width: inherit;
    height: inherit;
  }
}
</style>