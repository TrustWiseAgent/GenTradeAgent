<script setup lang="ts">
import TradingMain from './components/TradingMain.vue'
import StatusBar from './components/StatusBar.vue'
import 'vfonts/Lato.css'
import {
  NConfigProvider,
  NModalProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider
} from 'naive-ui'
</script>

<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-modal-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-loading-bar-provider>
              <div class="app-main">
                <TradingMain class="app-trading" />
                <StatusBar class="app-status" />
              </div>
            </n-loading-bar-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
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
