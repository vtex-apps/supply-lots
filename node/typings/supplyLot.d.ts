interface SupplyLotInterface {
  supplyLotId: string
  skuId: string
  warehouseId: string
  totalQuantity: number
  dateOfSupplyUtc: string
  keepSellingAfterExpiration: boolean
}
