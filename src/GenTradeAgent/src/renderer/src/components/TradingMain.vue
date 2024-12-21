<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import TradingDashboard  from './TradingDashboard.vue'
import 'splitpanes/dist/splitpanes.css'
import TradingChatAgent from './TradingChatAgent.vue';

</script>

<template>
  <splitpanes class="default-theme">
    <pane class="pane-dashboard">
      <TradingDashboard />
    </pane>
    <pane class="pane-agent" min-size="20" max-size="30">
      <TradingChatAgent />
    </pane>
  </splitpanes>
</template>

<style lang="scss" scoped>
.splitpanes {
  width: 100vw;
  height: calc(100vh - 30px);
}

.pane-dashboard {
  background-color: #f3f3f3 !important;
  display: flex;
  justify-content: center;
  padding: 4px;
}

.pane-agent {
  background-color: #f3f3f3 !important;
  display: flex;
  padding: 4px;
}

</style>
