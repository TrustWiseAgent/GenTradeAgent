import axios, { AxiosError } from 'axios'
import { IState } from '@renderer/store'
import { Store } from 'vuex'

class AgentServer {
  serverAddress: string = 'http://47.100.216.225:8000/api/v1'
  apiKey: string = 'e54d4431-5dab-474e-b71a-0db1fcb9e659'
  tzName: string = ''
  tzOffset: number = 0
  store:Store<IState> = null

  constructor() {}

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
}

export const agentServer = new AgentServer()
