//
// Manage the local cache data
//

import { readFileSync } from 'fs'
import { join } from 'path'

let crypto_assets

export function handlerLoadCache(cache_dir: string) {
  console.log('Cache path: ' + cache_dir)

  const crypto_assets_data = readFileSync(join(cache_dir, 'Binance/crypto_assets.json'), 'utf-8')
  crypto_assets = JSON.parse(crypto_assets_data)
  return crypto_assets
}

export function handlerGetCryptoAssets() {
  return crypto_assets
}
