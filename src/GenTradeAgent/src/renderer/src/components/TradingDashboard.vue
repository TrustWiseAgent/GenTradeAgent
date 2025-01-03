<template>
  <div class="dashboard-all">
    <div
      id="trading-chart"
      v-resize-observer="resizeHandler"
      class="trading-chart"
      @contextmenu="handleContextMenu"
    ></div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="contextMenuOptions"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      @select="handleSelectMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { vResizeObserver } from '@vueuse/components'
import { onMounted, ref, nextTick } from 'vue'
import { createChart, IChartApi, TickMarkType } from 'lightweight-charts'
import { useStore } from '@renderer/store'
import { NDropdown } from 'naive-ui'

let chartObj: IChartApi | null = null
let chartElement: HTMLElement | null = null
let candlestickSeries

const contextMenuOptions = [
  {
    label: 'Reset Chart',
    key: 'Reset Chart'
  }
]

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

const onClickoutside = () => {
  showDropdown.value = false
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

const handleSelectMenu = (key: string | number) => {
  showDropdown.value = false

  if (key == 'Reset Chart') {
    if (chartObj != null) {
      chartObj.timeScale().fitContent()
    }
  }
}

const store = useStore()
store.watch(
  (state) => state.currentOhlcv,
  (value) => {
    console.log('change ohlcv')
    candlestickSeries.setData(value)
  }
)

store.watch(
  (state) => state.currentAsset,
  () => {
    console.log('change Asset')
    candlestickSeries.setData(store.state.currentOhlcv)
  }
)

store.watch(
  (state) => state.currentInterval,
  () => {
    console.log('change Interval')
    candlestickSeries.setData(store.state.currentOhlcv)
  }
)

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
      background: { color: 'white' },
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
