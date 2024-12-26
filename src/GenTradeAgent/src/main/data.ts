//
// Manage the local cache data
//
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { parse } from 'csv-parse'
interface ohlcvData {
  time: number | string
  open: number | string
  high: number | string
  low: number | string
  close: number | string
  vol: number | string
}

interface ICryptoAsset {
  base: string
  quote: string
  symbol: string
  type: string
}

interface IStockUSAsset {
  cik_str: number
  ticker: string
  title: string
}
export class LocalStore {
  private rootDir: string
  private cryptoAssetDB: { [typeName: string]: { [assetName: string]: ICryptoAsset } } = {
    spot: {},
    future: {},
    swap: {}
  }
  private stockUSAssetDB: { [assetName: string]: IStockUSAsset } = {}

  private ohlcDB: { [assetName: string]: { [timeFrame: string]: ohlcvData[] } } = {}
  public constructor(cacheDir: string) {
    this.rootDir = cacheDir
  }

  private loadJsonData(filePath: string): object {
    const data = readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  }

  private loadCsvData(filePath: string, dataArray: ohlcvData[]): void {
    const data = readFileSync(filePath, { encoding: 'utf-8' })
    const headers = ['time', 'open', 'high', 'low', 'close', 'vol']
    parse(
      data,
      {
        delimiter: ',',
        columns: headers
      },
      (error, result: ohlcvData[]) => {
        if (error) {
          console.error(error)
        }
        result.shift()

        result.forEach((element) => {
          if (typeof element.time === 'string') {
            element.time = parseInt(element.time, 10)
          }
          if (typeof element.open === 'string') {
            element.open = parseInt(element.open, 10)
          }
          if (typeof element.high === 'string') {
            element.high = parseInt(element.high, 10)
          }
          if (typeof element.low === 'string') {
            element.low = parseInt(element.low, 10)
          }
          if (typeof element.close === 'string') {
            element.close = parseInt(element.close, 10)
          }
          if (typeof element.vol === 'string') {
            element.vol = parseInt(element.vol, 10)
          }
        })
        dataArray.push(...result)
      }
    )
  }

  public loadOhlcvData(marketPrefix: string, assetName: string) {
    const filepath_1h = join(this.rootDir, marketPrefix + assetName + '-1hour.csv')
    const filepath_1d = join(this.rootDir, marketPrefix + assetName + '-1day.csv')
    const filepath_1w = join(this.rootDir, marketPrefix + assetName + '-1week.csv')
    const filepath_1M = join(this.rootDir, marketPrefix + assetName + '-1mon.csv')

    if (existsSync(filepath_1h)) {
      this.ohlcDB[assetName] = {
        '1h': [],
        '1d': [],
        '1w': [],
        '1M': []
      }
      this.loadCsvData(filepath_1h, this.ohlcDB[assetName]['1h'])
    }
    if (existsSync(filepath_1d)) {
      this.loadCsvData(filepath_1d, this.ohlcDB[assetName]['1d'])
    }
    if (existsSync(filepath_1w)) {
      this.loadCsvData(filepath_1w, this.ohlcDB[assetName]['1w'])
    }
    if (existsSync(filepath_1M)) {
      this.loadCsvData(filepath_1M, this.ohlcDB[assetName]['1M'])
    }
  }

  public init(): boolean {
    const cryptoAssets: { [name: string]: ICryptoAsset } = this.loadJsonData(
      join(this.rootDir, 'Binance/crypto_assets.json')
    ) as { [name: string]: ICryptoAsset }

    Object.keys(cryptoAssets).forEach((assetName) => {
      this.cryptoAssetDB[cryptoAssets[assetName].type][assetName] = cryptoAssets[assetName]
      if (cryptoAssets[assetName].type == 'spot') {
        this.loadOhlcvData('Binance/', assetName)
      }
    })

    const stockUSAssets = this.loadJsonData(join(this.rootDir, 'StockUS/stock_us_ticker.json')) as {
      [id: string]: IStockUSAsset
    }
    Object.values(stockUSAssets).forEach((item) => {
      this.stockUSAssetDB[item.ticker.toLowerCase()] = item
      this.loadOhlcvData('StockUS/', item.ticker.toLowerCase())
    })
    return true
  }

  public getCryptoAssetDB(): object | null {
    return this.cryptoAssetDB
  }

  public getStockUSAssetDB(): object | null {
    return this.stockUSAssetDB
  }

  public getOhlcvDB(): { [assetName: string]: { [timeFrame: string]: ohlcvData[] } } {
    return this.ohlcDB
  }
}
