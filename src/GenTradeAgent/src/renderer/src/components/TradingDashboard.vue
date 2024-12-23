<template>
  <div class="dashboard-all">
    <div id="trading-chart" v-resize-observer="resizeHandler" class="trading-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { vResizeObserver } from '@vueuse/components'
import { onMounted, inject, Ref, watch, ref } from 'vue'
import { createChart, IChartApi, TickMarkType } from 'lightweight-charts'
import type { ohlcvData } from '@renderer/const';

let chartObj: IChartApi | null = null
let chartElement: HTMLElement | null = null
let candlestickSeries
let ohlcvDb:{ [assetName: string]: { [timeFrame: string]: ohlcvData[] } } | null = null

const currentAsset = inject<Ref<string>>('currentAsset', ref('btc'))
const currentTimeFrame = inject<Ref<string>>('currentTimeFrame', ref('1h'))

window.electron.ipcRenderer.invoke('getOhlcvDB').then((response) => {
  ohlcvDb = response
  if (ohlcvDb) {
    candlestickSeries.setData(ohlcvDb[currentAsset.value][currentTimeFrame.value])
  }
})

watch(currentAsset, (newValue, oldValue) => {
  console.log(`The state changed from ${oldValue} to ${newValue}`)
  console.log(ohlcvDb)
  if (ohlcvDb) {
    candlestickSeries.setData(ohlcvDb[newValue][currentTimeFrame.value])
  }
})

watch(currentTimeFrame, (newValue, oldValue) => {
  console.log(`The state changed from ${oldValue} to ${newValue}`)
  console.log(ohlcvDb)
  if (ohlcvDb) {
    candlestickSeries.setData(ohlcvDb[currentAsset.value][newValue])
  }
})

const resizeHandler = () => {
  if (chartElement) {
    const dimensions = chartElement.getBoundingClientRect()
    if (chartObj) {
      chartObj.resize(dimensions.width, dimensions.height)
    }
  }
}

onMounted(() => {
  const chartOptions = {
    layout: {
      textColor: 'black',
      backgroundColor: { type: 'solid', color: 'white' },
      attributionLogo: false
    },
    localization: {
      timeFormatter: (UTCTimestamp) => {
        return new Date(UTCTimestamp * 1000)
      }
    },
    timeScale: {
      borderColor: '#71649C',
      timeVisible: true,
      tickMarkFormatter: (time, tickMarkType) => {
        switch (tickMarkType) {
          case TickMarkType.Year:
            return new Date(time * 1000).getFullYear()
          case TickMarkType.Month:
            return new Date(time * 1000).getMonth()
          case TickMarkType.DayOfMonth:
            return new Date(time * 1000).getDate()
          case TickMarkType.Time: {
            const local_time = new Date(time * 1000).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit'
            })
            return local_time
          }
          case TickMarkType.TimeWithSeconds:
            return ''
        }
        return null
      }
    }
  }

  chartElement = document.getElementById('trading-chart')
  if (chartElement) {
    chartObj = createChart(chartElement, chartOptions)
    chartObj.applyOptions({
      watermark: {
        visible: true,
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'rgba(171, 71, 188, 0.5)',
        text: 'GenAI Trading Agent (Lu Ken)'
      }
    })
    candlestickSeries = chartObj.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    })
    console.log(candlestickSeries)

    chartObj.timeScale().fitContent()
    window.addEventListener('resize', () => resizeHandler())
  } else {
    console.error('Chart element not found')
  }
})
</script>
<style lang="scss" scoped>
.dashboard-all {
  width: 100%;
}

.trading-chart {
  height: 100%;
  width: 100%;
}
</style>
