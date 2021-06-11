import type { ClientsConfig } from '@vtex/api'
import { IOClients, LRUCache } from '@vtex/api'

import { SupplyLot } from './supplyLot'
import { Catalog } from './catalog'
import { Logistics } from './logistics'

const REQUESTS_TIMEOUT = 10000

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get supplyLot() {
    return this.getOrSet('supplyLot', SupplyLot)
  }
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: REQUESTS_TIMEOUT,
    },
    status: {
      memoryCache,
    }
  },
}