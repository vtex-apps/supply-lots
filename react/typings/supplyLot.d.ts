interface SypplyLotInput {
    supplyLotId?: string
    skuId: string
    warehouseId: string
    totalQuantity: number
    dateOfSupplyUtc: string
    keepSellingAfterExpiration: boolean
    transfer?: {
      isTransfered?: boolean
      destinationItemAvailabilityId?: string
      dateOfTransferUTC?: string
      user?: string
    }
  }