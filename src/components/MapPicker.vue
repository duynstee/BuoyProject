<template>
  <div style="width: 100%; height: 75vh" class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
import { ref, onMounted, onUnmounted, markRaw } from "vue";

const mapContainer = ref(null);
const map = ref(null);
const lastMarker = ref(null)
const props = defineProps({
  buoys: Array,
});

const emit = defineEmits(["location-selected"]);

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

  props.buoys.forEach((buoy) => {
    new Marker({ color: "#FF0000" })
      .setLngLat([buoy.location.lng, buoy.location.lat])
      .addTo(map.value);
  });

  map.value.on("click", (e) => {
    const { lng, lat } = e.lngLat;

    // Optional: Add a marker on click
    if (lastMarker.value) {
      lastMarker.value.remove();
    }
    
    lastMarker.value = new Marker({ color: "#00FF00" })
      .setLngLat([lng, lat])
      .addTo(map.value);

    emit("location-selected", { lng, lat });
  });
});

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
