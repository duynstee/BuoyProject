<template>
  <div id="map" style="height: 500px; width: 100%"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapComponent",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  mounted() {
    this.map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    this.map.on("click", this.addMarker);
  },
  methods: {
    addMarker(event) {
      const { lat, lng } = event.latlng;
      const marker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`Marker at ${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup();

      this.markers.push(marker); // Save marker reference if needed
    },
  },
};
</script>

<style scoped>
/* Adjust map styles */
#map {
  height: 100%;
  width: 100%;
}

:host {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
