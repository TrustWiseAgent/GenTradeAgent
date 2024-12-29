<template>
  <!-- <span style="color: blue; align-self: center">Agentic</span> -->
  <div class="chat-agent-all">
    <div class="chat-title-box">
      <div style="flex-grow: 1">
        <span>GenAI Output: </span>
      </div>
      <n-space reverse size="small" style="margin-right: 5px">
        <n-button class="chat-title-button" text style="font-size: 18px" @click="onClickDelete">
          <n-icon><Delete20Filled></Delete20Filled></n-icon>
        </n-button>
        <n-button class="chat-title-button" text style="font-size: 18px" @click="onClickCopy">
          <n-icon><Copy20Filled></Copy20Filled></n-icon>
        </n-button>
      </n-space>
    </div>
    <n-log class="chat-agent-output" :log="placeholder_output" :font-size="12" />
    <n-input
      v-model:value="prompt"
      class="chat-agent-input"
      size="large"
      type="textarea"
      placeholder="Prompt please show last 200 days bitcon prices"
      autosize
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NLog, NButton, NSpace, NIcon } from 'naive-ui'
import { Delete20Filled, Copy20Filled } from '@vicons/fluent'
import { useStore } from '@renderer/store'
import { agentServer } from '@renderer/server'

const store = useStore()
let isConnect = false
const placeholder_output = ref(``)
const prompt = ref('')

const onRemoteSay = (message) => {
  placeholder_output.value += '\nGenAI: ' + message + '\n'
}

const onUserSay = (message) => {
  placeholder_output.value += '\nUser: ' + message + '\n'
}

const onClientSay = (message) => {
  placeholder_output.value += '\nclient: ' + message + '\n'
}

store.watch(
  (state) => state.serverLatency,
  (value) => {
    if (isConnect && value == -1) {
      isConnect = false
      onClientSay('GenAI Server disconnected.')
    }

    if (!isConnect && value != -1) {
      isConnect = true
      onClientSay('GenAI Server connected.')
    }
  }
)

const handleInput = (v: string) => {
  if (v.charCodeAt(v.length - 1) == 10) {
    onUserSay(v)
    prompt.value = ''
    agentServer.ask_question(v, onRemoteSay)
  }
}

const onClickCopy = () => {
  navigator.clipboard.writeText(placeholder_output.value)
}
const onClickDelete = () => {
  placeholder_output.value = ''
}

// const onTimerOutput = () => {
//   onRemoteSay('hello')
//   onUserSay('how are you')
//   setTimeout(onTimerOutput, 1000)
// }
// onTimerOutput()
</script>

<style lang="scss" scoped>
.chat-title-box {
  height: 25px;
  width: 100%;
  display: flex;
  margin-bottom: 2px;
  align-items: center;
}
.chat-title-button {
  height: 20px;
  width: 20px;
  align-items: center;
}

.chat-agent-all {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-agent-input {
  height: 60px;
  margin-top: 4px;
  font-size: 12px;
}

.chat-agent-output {
  flex-grow: 1;
  padding: 4px;
  border: #e5e5e5;
  border-style: solid;
  border-width: thin;
}
</style>
