<script setup lang="ts">
import TradingMain from './components/TradingMain.vue'
import StatusBar from './components/StatusBar.vue'
import 'vfonts/Lato.css'

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
  height: 30px;
  background: #f3f3f3;
}
</style>
