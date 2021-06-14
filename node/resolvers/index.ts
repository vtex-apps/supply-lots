import { listSupplyLots, setSupplyLot, transferSupplyLot, deleteSupplyLot } from './supplyLots'

export const resolvers = {
  Query: {
    listSupplyLots
  },
  Mutation: {
    setSupplyLot,
    transferSupplyLot,
    deleteSupplyLot,
  },
}