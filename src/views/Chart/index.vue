<template>
  <div class="chart-list grid-row">
    <div class="grid-col-md-12 grid-col-xl-8 chart-item">
      <VChart :options="test3" />
    </div>
    <div class="grid-col-md-12 grid-col-xl-8 chart-item">
      <VChart :options="test2" />
    </div>
    <div class="grid-col-md-24 grid-col-xl-8 chart-item">
      <VChart :options="test1" />
    </div>
  </div>
</template>

<script setup>
const test1 = {
  title: {
    text: '長條圖測試'
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28, 25]
    }
  ]
}
const test2 = {
  title: {
    text: '折線圖測試'
  },
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ]
}
const test3 = {
  title: {
    text: '圓餅圖測試'
  },
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 335,
          name: '直接訪問'
        },
        {
          value: 234,
          name: '聯盟廣告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
    }
  ]
}
</script>

<style lang="scss" scoped>
.chart {
  &-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  &-item {
    width: 100%;
    height: 100%;
  }
}
</style>