<template>
    <div>
        <canvas ref="lineChart"></canvas>
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { defineComponent, watch } from 'vue'

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
            if (this.$refs.lineChart.chartInstance) {
                this.$refs.lineChart.chartInstance.destroy()
            }
            this.$refs.lineChart.chartInstance = new ChartJS(this.$refs.lineChart, {
                type: 'line',
                data: chartData,
                options: options
            })
        }
    },
    watch: {
        chartData: {
            handler(newData) {
                this.renderChart(newData, this.options)
            },
            deep: true
        }
    }
})
</script>

<style>
</style>