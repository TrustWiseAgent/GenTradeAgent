import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { agentServer, MARKET_CRYPTO, MARKET_STOCK_US } from './server'

export interface ohlcvData {
  time: number
  open: number
  high: number
  low: number
  close: number
  vol: number
}

export interface IState {
  currentMarket: string
  currentAsset: string
  currentOhlcv: ohlcvData[]
  currentInterval: string
  notifyMessage: string
  serverLatency: number
}

export const keyStore: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state: () => ({
    currentMarket: '',
    currentAsset: '',
    currentOhlcv: [],
    currentInterval: '1d',
    notifyMessage: 'Last message',
    serverLatency: -1
  }),
  mutations: {
    updateCurrentMarket(state, newId) {
      console.log('updateMarket: ' + newId)
      state.currentMarket = newId
      const marketInst = agentServer.markets[newId]
      const assetNames = Object.keys(marketInst.assets)
      if (!(state.currentAsset in assetNames)) {
        if (newId == MARKET_CRYPTO) {
          state.currentAsset = 'btc_usdt'
        } else if (newId == MARKET_STOCK_US) {
          state.currentAsset = 'ibit'
        }
        const callback = ((data) => {
          state.currentOhlcv = data
        })
        agentServer.get_ohlcv(state.currentAsset, state.currentInterval, callback)
      }
    },
    updateCurrentAsset(state, newAsset: string) {
      console.log('updateCurrentAsset')
      state.currentAsset = newAsset
      const callback = ((data) => {
        state.currentOhlcv = data
      })
      agentServer.get_ohlcv(newAsset, state.currentInterval, callback)
    },
    updateCurrentInterval(state, newInterval: string) {
      console.log('updateCurrentInterval')
      state.currentInterval = newInterval
      const callback = ((data) => {
        state.currentOhlcv = data
      })
      agentServer.get_ohlcv(state.currentAsset, state.currentInterval, callback)
    },
    updateNotification(state, notifyMessage) {
      state.notifyMessage = notifyMessage
    },
    updateServerConnection(state, latency) {
      state.serverLatency = latency
    }
  }
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(keyStore)
}
