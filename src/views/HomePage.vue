<template>
  <v-container>
    <h1>Boei Locaties</h1>
    <div style="width: 100%; height: 600px">
      <Map />
    </div>

    <h1>Data boeien</h1>
    <div class="chart-and-image-container">
      <div class="chart-grid">
        <div class="chart-item">
          <div class="chart-header">
            <v-icon>mdi-thermometer</v-icon>
            <span>Temperature</span>
          </div>
          <LineChart
            class="custom-line-chart"
            :chartData="TemperatureData"
            :options="chartOptions"
          />
        </div>
        <div class="chart-item">
          <div class="chart-header">
            <v-icon>mdi-flask-outline</v-icon>
            <span>PH</span>
          </div>
          <LineChart
            class="custom-line-chart"
            :chartData="PHData"
            :options="chartOptions"
          />
        </div>
        <div class="chart-item">
          <div class="chart-header">
            <v-icon>mdi-water</v-icon>
            <span>Turbidity</span>
          </div>
          <LineChart
            class="custom-line-chart"
            :chartData="TurbidityData"
            :options="chartOptions"
          />
        </div>
        <div class="chart-item">
          <div class="chart-header">
            <v-icon>mdi-flash</v-icon>
            <span>Conductivity</span>
          </div>
          <LineChart
            class="custom-line-chart"
            :chartData="ConductivityData"
            :options="chartOptions"
          />
        </div>
        <div class="chart-item">
          <div class="chart-header">
            <v-icon>mdi-air-filter</v-icon>
            <span>Oxygen</span>
          </div>
          <LineChart
            class="custom-line-chart"
            :chartData="OxygenData"
            :options="chartOptions"
          />
        </div>
      </div>
      <div class="image-container">
        <img :src="currentImage" alt="Thumbs" class="thumbs-image" />
        <button @click="switchImage">Switch Image</button>
      </div>
    </div>
  </v-container>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
import ThumbsUp from "@/assets/ThumbsUp.jpg";
import ThumbsDown from "@/assets/ThumbsDown.jpg";
import Map from "@/components/Map.vue";

export default {
  name: "HomePage",
  components: {
    LineChart,
    Map,
  },
  data() {
    return {
      TemperatureData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#f87979",
            data: [50, 40, 30, 20, 10, 0, -10, -20],
          },
        ],
      },

      PHData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "PH level",
            backgroundColor: "#79f879",
            data: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
          },
        ],
      },

      TurbidityData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Turbidity",
            backgroundColor: "#7979f8",
            data: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
          },
        ],
      },

      ConductivityData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Conductivity",
            backgroundColor: "#f8f879",
            data: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
          },
        ],
      },

      OxygenData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Oxygen",
            backgroundColor: "#f879f8",
            data: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0],
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      currentImage: ThumbsUp,
    };
  },
  methods: {
    switchImage() {
      this.currentImage =
        this.currentImage === ThumbsUp ? ThumbsDown : ThumbsUp;
    },
  },
  mounted() {
    console.log("HomePage mounted");
    console.log("TemperatureData:", this.chartData);
    console.log("PHData:", this.chartData);
    console.log("TurbidityData:", this.chartData);
    console.log("ConductivityData:", this.chartData);
    console.log("OxygenData:", this.chartData);
    console.log("chartOptions:", this.chartOptions);
  },
};
</script>

<style scoped>
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2px;
}
.custom-line-chart {
  width: 100%;
  height: 350px;
}
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.thumbs-image {
  width: 350px;
  height: 350px;
}
</style>
