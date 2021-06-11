export const listSupplyLots = (
  _: any,
  { skuId, warehouseId, supplyLotId}: { skuId: string, warehouseId: string, supplyLotId?: string },
  { clients: { supplyLot } }: Context
) => supplyLot.list(skuId, warehouseId, supplyLotId)

export const setSupplyLot = async (
  _: any,
  { supplyLotData, updateExisting }: { supplyLotData: SupplyLotInterface, updateExisting: boolean },
  { clients: { supplyLot } }: Context
) => {
  if (!updateExisting) {
    const [existingData] = await supplyLot.list(supplyLotData.skuId, supplyLotData.warehouseId, supplyLotData.supplyLotId)
    if (existingData.transfer?.isTransfered == true || existingData.dateOfSupplyUtc != null) return false
  }
  return supplyLot.set(supplyLotData)
}
export const transferSupplyLot = (
  _: any,
  { skuId, warehouseId, supplyLotId }: { skuId: string, warehouseId: string, supplyLotId: string },
  { clients: { supplyLot } }: Context
) => supplyLot.transfer(skuId, warehouseId, supplyLotId)