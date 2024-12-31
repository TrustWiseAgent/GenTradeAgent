import axios, { AxiosError } from 'axios'
import { IState } from '@renderer/store'
import { Store } from 'vuex'

class AgentServer {
  serverAddress: string = 'http://47.100.216.225:8000/api/v1'
  //serverAddress: string = 'http://127.0.0.1:8000/api/v1'
  apiKey: string = 'e54d4431-5dab-474e-b71a-0db1fcb9e659'
  tzName: string = ''
  tzOffset: number = 0
  store: Store<IState> | null = null
  pingInterval: number = 10000

  ping() {
    const tsStart = new Date().getTime()
    const address = this.serverAddress + '/public/server_time'

    axios
      .get(address)
      .then((response) => {
        const tsEnd = new Date().getTime()
        this.tzName = response.data['timezone_name']
        this.tzOffset = response.data['timezone_offset']

        if (this.store) {
          this.store.commit('updateServerConnection', (tsEnd - tsStart) / 2)
        }
      })
      .catch((err: AxiosError) => {
        console.log(err)
        if (this.store) {
          this.store.commit('updateServerConnection', -1)
        }
      })
  }

  ask_question(prompt: string, callback: (answer: string) => void) {
    const address = this.serverAddress + '/agent/'
    axios.interceptors.request.use((request) => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })

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

  get_assets(callback: (retval) => void) {
    const address = this.serverAddress + '/public/assets/'
    axios
      .get(address)
      .then((response) => {
        console.log(response)
        callback(response.data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
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
        console.log(response)
        callback(response.data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }
}

export const agentServer = new AgentServer()
