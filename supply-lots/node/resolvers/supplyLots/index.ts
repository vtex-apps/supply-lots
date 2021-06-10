export const listSupplyLots = (
  _: any,
  { skuId, warehouseId }: { skuId: string; warehouseId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.list(skuId, warehouseId)

export const saveSupplyLot = (
  _: any,
  { supplyLotData }: { supplyLotData: SupplyLotInterface },
  { clients: { supplyLot } }: Context
) => supplyLot.save(supplyLotData)

export const transferSupplyLot = (
  _: any,
  {
    skuId,
    warehouseId,
    supplyLotId,
  }: { skuId: string; warehouseId: string; supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.transfer(skuId, warehouseId, supplyLotId)
