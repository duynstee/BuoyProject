<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
  config.apiKey = "vPVdI2ThkutQmnfFvumg";

  const initialState = { lng: 31.4088301, lat: -23.9297988, zoom: 10 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.OUTDOOR,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );
}),
  onUnmounted(() => {
    map.value?.remove();
  });
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
