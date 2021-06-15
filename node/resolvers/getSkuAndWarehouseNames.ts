export const getSkuAndWarehouseNames = (
  _: any,
  { skuId, warehouseId }: { skuId: string, warehouseId: string },
  { clients: { catalog, logistics } }: Context
) => Promise.all([
  catalog.skuName(skuId),
  logistics.warehouseName(warehouseId)
])
