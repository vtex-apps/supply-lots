import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class SupplyLot extends JanusClient {
  protected baseURL = '/api/logistics/pvt/inventory/items'
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.adminUserAuthToken
          ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
          : null),
      },
    })
  }

  public list = (skuId: string, warehouseId: string, supplyLotId?: string) => 
    this.http.get<SupplyLotInterface[]>(
      `${this.baseURL}/${encodeURI(skuId)}/warehouses/${encodeURI(warehouseId)}/supplyLots${
        supplyLotId ? `/${encodeURI(supplyLotId)}` : `` 
      }`
    )
    
  public set = (supplyLotData: SupplyLotInterface) => 
    this.http.put<void>(
      `${this.baseURL}/${encodeURI(supplyLotData.skuId)}/warehouses/${encodeURI(supplyLotData.warehouseId)}/supplyLots/${encodeURI(supplyLotData.supplyLotId)}`,
      {
        quantity: supplyLotData.totalQuantity,
        dateOfSupplyUtc: supplyLotData.dateOfSupplyUtc,
        keepSellingAfterExpiration: supplyLotData.keepSellingAfterExpiration
      }
    ).then(() => true)

  public transfer = (skuId: string, warehouseId: string, supplyLotId: string) => 
    this.http.post<void>(
      `${this.baseURL}/${encodeURI(skuId)}/warehouses/${encodeURI(warehouseId)}/supplyLots/${encodeURI(supplyLotId)}/transfer`
    ).then(() => true)
    
  public delete = (skuId: string, warehouseId: string, supplyLotId: string) => 
    this.http.delete<void>(
      `${this.baseURL}/${encodeURI(skuId)}/warehouses/${encodeURI(warehouseId)}/supplyLots/${encodeURI(supplyLotId)}`
    ).then(() => true)
}
