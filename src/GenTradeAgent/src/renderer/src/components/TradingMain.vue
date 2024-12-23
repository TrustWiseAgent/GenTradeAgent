<template>
  <splitpanes class="default-theme">
    <pane class="pane-dashboard">
      <div class="pane-dashboard-title">
        <n-space horizontal>
          <n-select
            v-model:value="selectedValue"
            filterable
            placeholder="Please select a song"
            :options="options"
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
import { ref } from 'vue'

const selectedValue = ref(null)
const options = [
  {
    label: 'BTC',
    value: 'BTC_USDT'
  }
]
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
  height: 30px;
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
