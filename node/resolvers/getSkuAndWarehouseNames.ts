export const getSkuAndWarehouseNames = async (
  _: any,
  { skuId, warehouseId }: { skuId: string; warehouseId: string },
  { clients: { catalog, logistics } }: Context
) => {
  const skuName = catalog.skuName(skuId)
  const warehouseName = logistics.warehouseName(warehouseId)

  return { skuName, warehouseName }
}
