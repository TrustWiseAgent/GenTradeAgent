import axios, { AxiosError } from 'axios'

class AgentServer {
  static DEFAULT_SERVER_ADDRESS = 'http://47.100.216.225:8000/api/v1'
  apiKey: string = 'e54d4431-5dab-474e-b71a-0db1fcb9e659'
  tzName: string = ''
  tzOffset: number = 0
  pingInterval: number = 10000

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
