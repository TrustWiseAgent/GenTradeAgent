<template>
  <div class="foot-main">
    <div class="foot-notification">
      <span>{{ nodifyMessage }}</span>
    </div>
    <n-space class="foot-status">
      <span class="status-icon">Version v0.1</span>
      <n-button
        v-show="isServerConnected"
        text
        style="font-size: 18px"
        @click="handlerClickNetwork"
      >
        <n-icon>
          <PlugConnected20Filled />
        </n-icon>
      </n-button>
      <n-button
        v-show="!isServerConnected"
        text
        style="font-size: 18px"
        @click="handlerClickNetwork"
      >
        <n-icon>
          <PlugDisconnected20Regular />
        </n-icon>
      </n-button>
      <div style="width: 30px; max-width: 30px;">
        <span style="align-items: center;">{{ serverLatency }}ms</span>
      </div>
    </n-space>
    <n-modal
      v-model:show="showServerModal"
      :mask-closable="false"
      preset="card"
      title="Trade Agent Server"
      style="width: 400px"
    >
      <!-- <template #header-extra> Oops! </template> -->
      <n-space vertical>
        Address URL
        <n-input v-model:value="serverAddress"></n-input>
        API Key
        <n-input v-model:value="apiKey"></n-input>
      </n-space>
      <template #footer>
        <n-button @click="onPositiveClick">OK</n-button>
      </template>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { PlugConnected20Filled, PlugDisconnected20Regular } from '@vicons/fluent'
import { NIcon, NSpace, NButton, NModal, NInput } from 'naive-ui'
import { useStore } from '../store'
import { agentServer } from '@renderer/server'

const showServerModal = ref(false)
const serverAddress = ref(agentServer.serverAddress)
const apiKey = ref(agentServer.apiKey)

const store = useStore()

const nodifyMessage = ref('Notification Message')
const serverLatency = ref('')
const isServerConnected = ref(store.state.serverLatency != -1)

store.watch(
  (state) => state.notifyMessage,
  (value) => {
    nodifyMessage.value = value
  }
)

store.watch(
  (state) => state.serverLatency,
  (value) => {
    serverLatency.value = value.toFixed(1)
    isServerConnected.value = value != -1
  }
)

const handlerClickNetwork = () => {
  console.log('hehe')
  showServerModal.value = true
}

const onPositiveClick = () => {
  console.log('ok')
  agentServer.serverAddress = serverAddress.value
  showServerModal.value = false
}

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
