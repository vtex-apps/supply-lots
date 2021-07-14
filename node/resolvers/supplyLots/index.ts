import { v4 } from 'uuid'

export const listSupplyLots = (
  _: unknown,
  {
    skuId,
    warehouseId,
    supplyLotId,
  }: { skuId: string; warehouseId: string; supplyLotId?: string },
  { clients: { supplyLot } }: Context
) => supplyLot.list(skuId, warehouseId, supplyLotId)

export const setSupplyLot = (
  _: unknown,
  { supplyLotData }: { supplyLotData: SupplyLotInterface },
  { clients: { supplyLot } }: Context
) =>
  (supplyLotData.supplyLotId = supplyLotData.supplyLotId ?? v4()) &&
  supplyLot.set(supplyLotData)

export const transferSupplyLot = (
  _: unknown,
  {
    skuId,
    warehouseId,
    supplyLotId,
  }: { skuId: string; warehouseId: string; supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.transfer(skuId, warehouseId, supplyLotId)

export const deleteSupplyLot = (
  _: unknown,
  {
    skuId,
    warehouseId,
    supplyLotId,
  }: { skuId: string; warehouseId: string; supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.delete(skuId, warehouseId, supplyLotId)
