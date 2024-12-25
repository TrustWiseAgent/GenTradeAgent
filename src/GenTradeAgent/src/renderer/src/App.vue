<script setup lang="ts">
import TradingMain from './components/TradingMain.vue'
import FootBar from './components/FootBar.vue'
import 'vfonts/Lato.css'
import {
  NConfigProvider,
  NModalProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  darkTheme
} from 'naive-ui'
</script>

<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }" :theme="null">
    <n-modal-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-loading-bar-provider>
              <div class="app-main">
                <TradingMain class="app-trading" />
                <FootBar class="app-status" />
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
}

.app-status {
  height: 30px;
  background-color: var(--color-background-mute);
}
</style>
