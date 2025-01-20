<template>
    <div>
        <canvas ref="lineChart"></canvas>
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { defineComponent } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default defineComponent({
    name: 'LineChart',
    components: {
        Line
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    },
    methods: {
        renderChart(chartData, options) {
            this.$refs.lineChart.chartInstance = new ChartJS(this.$refs.lineChart, {
                type: 'line',
                data: chartData,
                options: options
            })
        }
    }
})
</script>

<style>

</style>