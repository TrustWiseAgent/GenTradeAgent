import axios, { AxiosError } from 'axios'

type Asset = {
  name: string
  quote: string
  type: string
  cik: number
  base: string
  symbol: string
}

interface IMarket {
  name: string
  type: string
  assets: { [name: string]: Asset }
}

export const MARKET_CRYPTO = 'b13a4902-ad9d-11ef-a239-00155d3ba217'
export const MARKET_STOCK_US = '5784f1f5-d8f6-401d-8d24-f685a3812f2d'

class AgentServer {
  static DEFAULT_SERVER_ADDRESS = 'http://47.100.216.225:8000/api/v1'
  apiKey: string = 'e54d4431-5dab-474e-b71a-0db1fcb9e659'
  tzName: string = ''
  tzOffset: number = 0
  pingInterval: number = 10000
  markets: { [market_id: string]: IMarket } = {}

  get serverAddress() {
    const retval = localStorage.getItem('serverAddress')
    if (retval == null) {
      return AgentServer.DEFAULT_SERVER_ADDRESS
    }
    return retval
  }

  set serverAddress(newVal) {
    localStorage.setItem('serverAddress', newVal)
  }

  ping(callback: (lantecy: number) => void) {
    const tsStart = new Date().getTime()
    const address = this.serverAddress + '/public/server_time'

    axios
      .get(address)
      .then((response) => {
        const tsEnd = new Date().getTime()
        this.tzName = response.data['timezone_name']
        this.tzOffset = response.data['timezone_offset']
        callback((tsEnd - tsStart) / 2)
      })
      .catch((err: AxiosError) => {
        console.log(err)
        callback(-1)
      })
  }

  ask_question(prompt: string, callback: (answer: string) => void) {
    const address = this.serverAddress + '/agent/'
    // axios.interceptors.request.use((request) => {
    //   console.log('Starting Request', JSON.stringify(request, null, 2))
    //   return request
    // })

    axios.defaults.headers['X-API-KEY'] = 'e54d4431-5dab-474e-b71a-0db1fcb9e659'
    axios
      .get(address, {
        params: {
          prompt: prompt
        }
      })
      .then((response) => {
        console.log(response)
        callback(response.data['answer']['content'])
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  async get_assets(market_id: string, start: number = 0, limit: number = 0) {
    const address = this.serverAddress + '/public/markets/' + market_id + '/assets'
    const resp = await axios.get(address, {
      params: {
        start: start,
        limit: limit
      }
    })
    return resp.data
  }

  async get_markets() {
    const address = this.serverAddress + '/public/markets/'
    const resp = await axios.get(address)
    return resp.data
  }

  get_ohlcv(assetName: string, interval: string, callback: (data) => void) {
    const address = this.serverAddress + '/public/asset/fetch_ohlcv/'
    console.log('get_ohlcv: ' + assetName)
    axios.interceptors.request.use((request) => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })
    axios
      .get(address, {
        params: {
          assetname: assetName,
          interval: interval,
          limit: 200
        }
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }

  async refreshAssets() {
    this.markets = await this.get_markets()
    await Object.keys(this.markets).forEach(async (market_id) => {
      this.markets[market_id].assets = {}
      let start = 0
      let isEnd = false
      while (!isEnd) {
        const assets = await this.get_assets(market_id, start, 1000)
        if (assets.length < 1000) {
          isEnd = true
          break
        }
        start += 1000
        assets.forEach(async (item) => {
          if (market_id == MARKET_CRYPTO && item.quote == 'usdt' && item.type == 'spot') {
            this.markets[market_id].assets[item.name] = item
          }
          if (market_id == MARKET_STOCK_US && item.type == 'stock') {
            this.markets[market_id].assets[item.name] = item
          }
        })
      }
    })
  }
}

export const agentServer = new AgentServer()
