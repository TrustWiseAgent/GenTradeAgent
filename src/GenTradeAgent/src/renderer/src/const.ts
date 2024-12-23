import { Ref } from 'vue'
import type { InjectionKey } from 'vue'

export interface IAsset {
  name: string
}

export const currentAssetKey: InjectionKey<Ref<IAsset>> = Symbol()

export interface ohlcvData {
  time: number | string
  open: number | string
  high: number | string
  low: number | string
  close: number | string
  vol: number | string
}
