<template>
  <splitpanes class="default-theme">
    <pane class="pane-dashboard">
      <div class="pane-dashboard-title">
        <n-space horizontal>
          <n-select
            v-model:value="currentAsset"
            filterable
            placeholder="Please select an asset"
            :options="optionsAsset"
            size="tiny"
            menu-size="tiny"
            class="title-item"
          />
          <n-select
            v-model:value="currentTimeFrame"
            filterable
            :options="optionsTimeFrame"
            size="tiny"
            menu-size="tiny"
            class="title-item"
          />
        </n-space>
      </div>
      <TradingDashboard class="pane-dashboard-chart" />
    </pane>
    <pane class="pane-agent" min-size="20" max-size="30">
      <TradingChatAgent />
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import TradingDashboard from './TradingDashboard.vue'
import 'splitpanes/dist/splitpanes.css'
import TradingChatAgent from './TradingChatAgent.vue'
import { NSpace, NSelect } from 'naive-ui'
import { ref, provide } from 'vue'

const currentAsset = ref('')
provide('currentAsset', currentAsset)
const currentTimeFrame = ref('1h')
provide('currentTimeFrame', currentTimeFrame)

const optionsAsset = ref([{}])
const optionsTimeFrame = ref([
  {
    label: "1h",
    value: "1h"
  },
  {
    label: "1d",
    value: "1d"
  },
  {
    label: "1w",
    value: "1w"
  },
  {
    label: "1M",
    value: "1M"
  }
])
window.electron.ipcRenderer.invoke('getOhlcvDB').then((response) => {
  Object.keys(response).forEach((item) =>
  optionsAsset.value.push({
      label: item,
      value: item
    })
  )
  optionsAsset.value.splice(0, 1)

  currentAsset.value = Object.keys(response)[0]
  console.log(currentAsset.value)
})
</script>

<style lang="scss" scoped>
.splitpanes {
  width: 100vw;
  height: calc(100vh - 30px);
}

.pane-dashboard {
  background-color: #f3f3f3 !important;
  display: flex;
  padding: 2px;
  flex-direction: column;
}

.pane-dashboard-title {
  height: 23px;
  margin-bottom: 2px;
}

.pane-dashboard-chart {
  flex-grow: 1;
}

.pane-agent {
  background-color: #f3f3f3 !important;
  display: flex;
  padding: 4px;
}
</style>
