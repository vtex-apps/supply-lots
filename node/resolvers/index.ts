import { getSkuAndWarehouseNames } from './getSkuAndWarehouseNames'
import { listSupplyLots, setSupplyLot, transferSupplyLot } from './supplyLots'

export const resolvers = {
  Query: {
    getSkuAndWarehouseNames,
    listSupplyLots,
  },
  Mutation: {
    setSupplyLot,
    transferSupplyLot
  },
}