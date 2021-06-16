import { v4 } from 'uuid'

export const listSupplyLots = (
  _: any,
  { skuId, warehouseId, supplyLotId, filterZeros}: { skuId: string, warehouseId: string, supplyLotId?: string, filterZeros: boolean },
  { clients: { supplyLot } }: Context
) => supplyLot.list(skuId, warehouseId, supplyLotId)
  .then(list => filterZeros ? 
    list.filter(lot => lot.totalQuantity > 0) :
    list
  )

export const setSupplyLot = (
  _: any,
  { supplyLotData }: { supplyLotData: SupplyLotInterface },
  { clients: { supplyLot } }: Context
) => (supplyLotData.supplyLotId = supplyLotData.supplyLotId || v4())
  && supplyLot.set(supplyLotData)

export const transferSupplyLot = (
  _: any,
  { skuId, warehouseId, supplyLotId }: { skuId: string, warehouseId: string, supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.transfer(skuId, warehouseId, supplyLotId)

export const deleteSupplyLot = (
  _: any,
  { skuId, warehouseId, supplyLotId }: { skuId: string, warehouseId: string, supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.delete(skuId, warehouseId, supplyLotId)