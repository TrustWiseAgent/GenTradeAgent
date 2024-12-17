<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <splitpanes class="default-theme">
    <pane class="pane-dashboard" >
      <span style="color: blue; align-self: center">大盘窗口</span>
    </pane>
    <pane class="pane-agent" min-size="20" max-size="30">
      <span style="color: blue; align-self: center">Agentic对话窗口</span>
    </pane>
  </splitpanes>
</template>

<style lang="scss" scoped>

.splitpanes {
  width: 100vw;
  height: 100vh;
}

.pane-dashboard {
  background-color: #df8484 !important;
  display: flex;
  justify-content: center;
}

.pane-agent {
  background-color: beige !important;
  display: flex;
  justify-content: center;
}
</style>
