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
import { onMounted, ref } from 'vue'
import { NInput, NLog, NButton, NSpace, NIcon } from 'naive-ui'
import { Delete20Filled, Copy20Filled } from '@vicons/fluent'

const placeholder_output =
  ref(`Bitcoin, introduced in 2009 by an anonymous entity known as Satoshi Nakamoto, is a decentralized \
digital currency that enables peer-to-peer transactions without the need for intermediaries like banks. Its creation marked \
the beginning of the cryptocurrency era, offering an alternative to traditional financial systems.
The global Bitcoin market has experienced significant growth since its inception.
In 2021, the market size was valued at \
approximately USD 17.05 billion, with projections indicating a compound annual growth rate (CAGR) of 26.2% from 2022 to 2030.
As of December 20, 2024, Bitcoin's price is approximately $97,568.49 USD, with a 24-hour trading volume of around $95.98 \
billion USD. The circulating supply is about 19.8 million BTC, nearing its maximum supply limit of 21 million coins.
Bitcoin's price has been highly volatile throughout its history. Notably, it surpassed $100,000 for the first time on \
December 5, 2024.
This volatility is influenced by various factors, including regulatory developments, macroeconomic trends, and technological\
advancements within the cryptocurrency ecosystem.
Investors and analysts continue to monitor Bitcoin's performance closely, considering its potential for high returns \
alongside inherent risks. As the cryptocurrency market evolves, Bitcoin remains a central figure, influencing the broader \
adoption and acceptance of digital assets worldwide.`)

const prompt = ref('')

onMounted(() => {})

const handleInput = (v: string) => {
  console.log(v)
}



const onClickCopy = () => {
  navigator.clipboard.writeText(placeholder_output.value)
}
const onClickDelete = () => {
  placeholder_output.value = ''
}

const onRemoteSay = (message) => {
  placeholder_output.value += '\nGenAI: ' + message
}

const onUserSay = (message) => {
  placeholder_output.value += '\nUser: ' + message
}

const onTimerOutput = () => {
  onRemoteSay('hello')
  onUserSay('how are you')
  setTimeout(onTimerOutput, 1000)
}
onTimerOutput()
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
