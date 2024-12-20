<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
  <splitpanes class="default-theme">
    <pane class="pane-dashboard">
      <span style="color: blue; align-self: center">Trading Dashboard</span>
    </pane>
    <pane class="pane-agent" min-size="20" max-size="30">
      <span style="color: blue; align-self: center">Agentic Dialog</span>
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
}

.pane-agent {
  background-color: #f3f3f3 !important;
  display: flex;
  justify-content: center;
}
</style>
