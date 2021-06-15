import { getSkuAndWarehouseNames } from './getSkuAndWarehouseNames'
import { listSupplyLots, setSupplyLot, transferSupplyLot, deleteSupplyLot } from './supplyLots'

export const resolvers = {
  Query: {
    getSkuAndWarehouseNames,
    listSupplyLots
  },
  Mutation: {
    setSupplyLot,
    transferSupplyLot,
    deleteSupplyLot,
  },
}