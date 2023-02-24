<template>
  <div class="e-chart-wrapper">
    <div ref="chartRef" class="e-chart-container"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, defineProps, onUpdated, onUnmounted } from 'vue'
import { throttle } from '@/lib/throttle.js'

const props = defineProps({
  key: {
    type: Number,
    defalut: 1
  },
  options: {
    type: Object,
    default () {
      return {
        title: {
          text: 'ECharts'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  }
})

const chartRef = ref(null)

const ROcallback = throttle((entries) => {
  entries.forEach(() => {
    initChart()
  })
}, 500)

const RO = new ResizeObserver(ROcallback)

const initChart = () => {
  const testChart = echarts.getInstanceByDom(chartRef.value)
  if (testChart) return

  const myChart = echarts.init(chartRef.value)
  myChart.setOption(props.options)
}

onUpdated(() => {
  if (chartRef !== null) {
    initChart()
  }
})

onMounted(() => {
  initChart()

  RO.observe(chartRef.value)
})

onUnmounted(() => {
  RO.disconnect()
})

</script>

<style lang="scss" scoped>
.e-chart {
  &-wrapper {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    min-width: fit-content;
    min-height: fit-content;
  }
  &-container {
    background-color: #fff;
    width: inherit;
    height: inherit;
    min-width: 200px;
    min-height: 200px;
  }
}
</style>