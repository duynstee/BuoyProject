<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
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

  new Marker({ color: "#FF0000" }) // boei 1
    .setLngLat([31.5318221, -24.0573661]) // -24.0583661,31.5318221
    .addTo(map.value);

  new Marker({ color: "#FF0000" }) // boei 2
    .setLngLat([31.688494, -23.911263]) // -23.911263, 31.688494
    .addTo(map.value);

  new Marker({ color: "#FF0000" }) // boei 3
    .setLngLat([31.300422, -24.073267]) // -24.073267, 31.300422
    .addTo(map.value);

  new Marker({ color: "#FF0000" }) // boei 4
    .setLngLat([31.743029, -24.007657]) // -24.007657, 31.743029
    .addTo(map.value);

  new Marker({ color: "#FF0000" }) // boei 5
    .setLngLat([31.634077, -23.836704]) // -23.836704, 31.634077
    .addTo(map.value);
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
