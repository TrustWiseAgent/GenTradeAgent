<template>
  <!-- <span style="color: blue; align-self: center">Agentic</span> -->
  <div class="chat-agent-all">
    <n-log class="chat-agent-output" :log="placeholder_output" :font-size="12"/>
    <n-input
      :value="prompt"
      class="chat-agent-input"
      size="large"
      type="textarea"
      placeholder="Prompt please show last 200 days bitcon prices"
      autosize
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NLog } from 'naive-ui'

const placeholder_output = ref(`Response for Agentic GenTrade Server:
Bitcoin, introduced in 2009 by an anonymous entity known as Satoshi Nakamoto, is a decentralized \
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
</script>

<style lang="scss" scoped>
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
