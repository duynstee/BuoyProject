<template>
  <v-container>
    <h1>Boei locaties</h1>
    <div style="width: 100%; height: 75vh">
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
        <div class="image-container">
          <img :src="currentImage" alt="Thumbs" class="thumbs-image" />
          <button @click="switchImage">Switch Image</button>
        </div>
      </div>
    </div>
    <br />
    <br />
    <hr />
    <h1>Error Log</h1>
    <div id="log">
      <p>Errors:</p>
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
        labels: [],
        datasets: [
          {
            label: "Temperature (°C)",
            backgroundColor: "#f87979",
            borderColor: "#f87979",
            data: [],
          },
        ],
      },
      PHData: {
        labels: [],
        datasets: [
          {
            label: "PH Levels",
            backgroundColor: "#79f8d7",
            borderColor: "#79f8d7",
            data: [],
          },
        ],
      },
      TurbidityData: {
        labels: [],
        datasets: [
          {
            label: "Turbidity",
            backgroundColor: "#79a9f8",
            borderColor: "#79a9f8",
            data: [],
          },
        ],
      },
      ConductivityData: {
        labels: [],
        datasets: [
          {
            label: "Conductivity",
            backgroundColor: "#d279f8",
            borderColor: "#d279f8",
            data: [],
          },
        ],
      },
      OxygenData: {
        labels: [],
        datasets: [
          {
            label: "Oxygen Levels",
            backgroundColor: "#f8d779",
            borderColor: "#f8d779",
            data: [],
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
    async fetchData() {
      const url =
        "https://gec13051aa051a2-boei3.adb.eu-amsterdam-1.oraclecloudapps.com/ords/admin/metingen/";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tempArray = data.items;

        const temperatureData = [];
        const phData = [];
        const turbidityData = [];
        const conductivityData = [];
        const oxygenData = [];
        const labels = [];

        for (const element of tempArray) {
          temperatureData.push(element.temperatuur || null);
          phData.push(element.phwaarde || null);
          turbidityData.push(element.turbiditeit || null);
          conductivityData.push(element.ecvoltage || null);
          oxygenData.push(element.zuurstof || null);
          labels.push(element.tijd || "Unknown");
        }

        this.TemperatureData.datasets[0].data = temperatureData;
        this.PHData.datasets[0].data = phData;
        this.TurbidityData.datasets[0].data = turbidityData;
        this.ConductivityData.datasets[0].data = conductivityData;
        this.OxygenData.datasets[0].data = oxygenData;

        this.TemperatureData.labels = labels;
        this.PHData.labels = labels;
        this.TurbidityData.labels = labels;
        this.ConductivityData.labels = labels;
        this.OxygenData.labels = labels;

        console.log("Data successfully loaded and updated!");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    },
    switchImage() {
      this.currentImage =
        this.currentImage === ThumbsUp ? ThumbsDown : ThumbsUp;
    },
  },
  mounted() {
    console.log("HomePage mounted");
    this.fetchData();
  },
};
</script>

<style scoped>
.title {
  color: rgb(0, 0, 0);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

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
  margin-left: 20px;
}
.thumbs-image {
  width: 350px;
  height: 350px;
}
</style>
