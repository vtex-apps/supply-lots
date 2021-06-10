import { IOClients } from '@vtex/api'

import { SupplyLot } from './supplyLot'
import { Catalog } from './catalog'
import { Logistics } from './logistics'

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
