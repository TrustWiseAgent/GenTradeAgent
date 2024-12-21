<template>
  <div class="status-main">
    <div class="status-notification">
      <span>Latest Prices</span>
    </div>
    <div class="status-clock">
      <span class="status-icon" >Version v0.1</span>
    </div>
    <div class="status-clock">
      <n-icon>
        <Clock20Regular class="status-icon"/>
      </n-icon>
    </div>
    <div class="status-network">
      <n-icon>
        <PlugConnected20Filled class="status-icon"/>
      </n-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlugConnected20Filled, Clock20Regular } from '@vicons/fluent'
</script>
<style lang="scss" scoped>
.status-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
}

.status-notification {
  flex-grow: 1;
  align-content: center;
}

.status-clock {
  padding-right: 10px;
  height: 100%;
  align-content: center;
}

.status-icon {
  width: 20px;
  height: 100%;
  align-content: center;
}
</style>
