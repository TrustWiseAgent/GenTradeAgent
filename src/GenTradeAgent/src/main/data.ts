//
// Manage the local cache data
//
import { readFileSync } from 'fs'
import { join } from 'path'
export class LocalStore {
  private rootDir: string
  private cryptoAssets: object | null = null
  private stockUSAssets: object | null = null

  public constructor(cacheDir: string) {
    this.rootDir = cacheDir
  }

  private loadJsonData(filePath: string): object {
    const data = readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  }

  public init(): boolean {
    this.cryptoAssets = this.loadJsonData(join(this.rootDir, 'Binance/crypto_assets.json'))
    this.stockUSAssets = this.loadJsonData(join(this.rootDir, 'StockUS/stock_us_ticker.json'))

    return true
  }

  public getCryptoAssets(): object | null {
    return this.cryptoAssets
  }

  public getStockUSAssets(): object | null {
    return this.stockUSAssets
  }
}
