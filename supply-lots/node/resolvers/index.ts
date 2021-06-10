import { getSkuAndWarehouseNames } from './getSkuAndWarehouseNames'
import { listSupplyLots, saveSupplyLot, transferSupplyLot } from './supplyLots'

export const resolvers = {
  Query: {
    getSkuAndWarehouseNames,
    listSupplyLots,
  },
  Mutation: {
    saveSupplyLot,
    transferSupplyLot,
  },
}
