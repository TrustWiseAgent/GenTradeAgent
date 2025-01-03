<template>
  <n-space vertical size="large">
    <n-layout has-sider sider-placement="right" class="main-layout">
      <n-layout-content content-style="padding: 4px;">
        <div class="pane-dashboard">
          <div class="pane-dashboard-title">
            <n-space horizontal size="small">
              <n-select
                v-model:value="currentMarket"
                filterable
                placeholder="Please select a market"
                :options="optionsMarket"
                size="tiny"
                menu-size="tiny"
                class="title-item"
                style="width: 100px"
                @update:value="handleUpdateCurrentMarket"
              />
              <n-select
                v-model:value="currentAsset"
                filterable
                placeholder="Please select an asset"
                :options="optionsAsset"
                size="tiny"
                menu-size="tiny"
                class="title-item"
                style="width: 150px"
                @update:value="handleUpdateCurrentAsset"
              />
              <n-select
                v-model:value="currentInterval"
                filterable
                :options="optionsInterval"
                size="tiny"
                menu-size="tiny"
                class="title-item"
                style="width: 70px"
                @update:value="handleUpdateCurrentInterval"
              />
            </n-space>
          </div>
          <TradingDashboard class="pane-dashboard-chart" />
        </div>
      </n-layout-content>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="10"
        :native-scrollbar="false"
        :width="400"
        show-trigger="arrow-circle"
        :show-collapsed-content="false"
        bordered
      >
        <TradingChatAgent class="pane-agent" />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { NSpace, NSelect, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
import { ref } from 'vue'

import TradingDashboard from './TradingDashboard.vue'
import TradingChatAgent from './TradingChatAgent.vue'
import { useStore } from '../store'
import { agentServer, MARKET_CRYPTO } from '@renderer/server'

interface IOption {
  label: string
  value: string
}

let isConnect = false

const store = useStore()

const lastSelectedMarketId = localStorage.getItem('lastSelectedMarketId')
if (lastSelectedMarketId) {
  store.state.currentMarket = lastSelectedMarketId
}

const lastSelectedAsset = localStorage.getItem('lastSelectedAsset')
if (lastSelectedAsset) {
  store.state.currentAsset = lastSelectedAsset
}

const lastSelectedInterval = localStorage.getItem('lastSelectedInterval')
if (lastSelectedInterval) {
  store.state.currentInterval = lastSelectedInterval
}

const currentMarket = ref(store.state.currentMarket)
const currentAsset = ref(store.state.currentAsset)
const currentInterval = ref('1d')

const optionsMarket = ref<IOption[]>([])
const optionsAsset = ref<IOption[]>([])
const optionsInterval = ref([
  {
    label: '1m',
    value: '1m'
  },
  {
    label: '1h',
    value: '1h'
  },
  {
    label: '1d',
    value: '1d'
  },
  {
    label: '1w',
    value: '1w'
  },
  {
    label: '1M',
    value: '1M'
  }
])

const updateAssetOptions = (market_id) => {
  const assertNames = Object.keys(agentServer.markets[market_id].assets)
  optionsAsset.value.length = 0
  assertNames.forEach((item) => {
    optionsAsset.value.push({
      label: item,
      value: item
    })
  })
  currentAsset.value = store.state.currentAsset
}

const handleUpdateCurrentMarket = (value: string) => {
  store.commit('updateCurrentMarket', value)
  localStorage.setItem('lastSelectedMarketId', value)
  updateAssetOptions(value)
}

const handleUpdateCurrentAsset = (value: string) => {
  store.commit('updateCurrentAsset', value)
  localStorage.setItem('lastSelectedAsset', value)
}

const handleUpdateCurrentInterval = (value: string) => {
  store.commit('updateCurrentInterval', value)
  localStorage.setItem('lastSelectedInterval', value)
}

const callbackPing = (latency: number) => {
  store.commit('updateServerConnection', latency)
}

const handlerPingServer = () => {
  agentServer.ping(callbackPing)
  //setTimeout(handlerPingServer, agentServer.pingInterval)
}
handlerPingServer()

store.watch(
  (state) => state.serverLatency,
  (value) => {
    if (isConnect && value == -1) {
      isConnect = false
    }

    if (!isConnect && value != -1) {
      isConnect = true
      store.commit('updateNotification', 'Reloading market data...')
      agentServer.refreshAssets().then(() => {
        setTimeout(() => {
          store.commit('updateNotification', 'Reloading market data...Done')
          // refresh market select UI
          optionsMarket.value.length = 0
          Object.keys(agentServer.markets).forEach((index) => {
            optionsMarket.value.push({ label: agentServer.markets[index].name, value: index })
          })

          let lastSelectedMarketId = localStorage.getItem('lastSelectedMarketId')
          if (lastSelectedMarketId == null || !(lastSelectedMarketId in agentServer.markets)) {
            lastSelectedMarketId = MARKET_CRYPTO
          }
          currentMarket.value = agentServer.markets[lastSelectedMarketId].name
          localStorage.setItem('lastSelectedMarketId', lastSelectedMarketId)

          store.commit('updateCurrentMarket', lastSelectedMarketId)
          updateAssetOptions(lastSelectedMarketId)
        }, 500)
      })
    }
  }
)
</script>

<style lang="scss" scoped>
.main-layout {
  width: 100vw;
  height: calc(100vh - 30px);
}

.pane-dashboard {
  height: 100%;
  display: flex;
  padding: 2px;
  flex-direction: column;
}

.pane-dashboard-title {
  height: 25px;
  margin-bottom: 2px;
}

.pane-dashboard-chart {
  height: calc(100% - 20px);
  border: #f3f3f3;
  border-style: solid;
  border-width: thin;
}

.pane-agent {
  height: calc(100vh - 30px);
  display: flex;
  padding: 5px;
}
</style>
