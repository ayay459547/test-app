<template>
  <div class="map-wrapper grid-row">
    <div class="map-container grid-col-lg-16">
      <VGoogleMap
        ref="mapRef"
        mapTypeId="roadmap" 
        position
        :service="service"
        @sendOptions="setOptions"
        @sendPlace="getPlace"
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
  console.log(list)
  options.splice(0)
  const temp = list.map(item => {
    return {
      label: item.description,
      value: item?.place_id ?? item.description
    }
  })
  options.push(...temp)
}

const onSelect = (placeId) => {
  console.log(placeId)
  if (mapRef) {
    mapRef.value.getDetails(placeId)
  }
}
const getPlace = (placeDetail) => {
  console.log(placeDetail)
}

const service = {
  inject: true,
  inputText: inputText.value
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