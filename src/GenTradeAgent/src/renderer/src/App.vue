<script setup lang="ts">
import TradingMain from './components/TradingMain.vue';
import StatusBar from './components/StatusBar.vue';

// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="app-main">
    <TradingMain class="app-trading" />
    <StatusBar class="app-status" />
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.app-trading {
  flex-grow: 1;
  border: #e5e5e5;
  border-style: solid;
  border-width: thin;
  background: #f3f3f3;
}

.app-status {
  height: 35px;
  background: #f3f3f3;
}
</style>
