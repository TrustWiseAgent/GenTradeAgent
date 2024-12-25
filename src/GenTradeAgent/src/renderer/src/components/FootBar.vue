<template>
  <div class="foot-main">
    <div class="foot-notification">
      <span>{{ nodifyMessage }}</span>
    </div>
    <n-space class="foot-status">
      <span class="status-icon">Version v0.1</span>
      <n-button text style="font-size: 18px">
        <n-icon>
          <Clock20Regular />
        </n-icon>
      </n-button>
      <n-button text style="font-size: 18px">
        <n-icon>
          <PlugConnected20Filled />
        </n-icon>
      </n-button>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { PlugConnected20Filled, Clock20Regular } from '@vicons/fluent'
import { NIcon, NSpace, NButton } from 'naive-ui'
import { useStore } from '../store'

const store = useStore()

const nodifyMessage = ref('Notification Message')
store.watch(
  (state) => state.notifyMessage,
  (value) => {
    nodifyMessage.value = value
  }
)

</script>
<style lang="scss" scoped>
.foot-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
}

.foot-notification {
  flex-grow: 1;
  align-content: center;
}

.foot-status {
  padding-right: 10px;
  height: 100%;
  align-content: center;
}
</style>
