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

  public list = (skuId: string, warehouseId: string) =>
    this.http.get<SupplyLotInterface[]>(
      `${this.baseURL}/${encodeURI(skuId)}/warehouses/${encodeURI(
        warehouseId
      )}/supplyLots`
    )

  public save = (supplyLotData: SupplyLotInterface) =>
    this.http
      .put(
        `${this.baseURL}/${encodeURI(
          supplyLotData.skuId
        )}/warehouses/${encodeURI(
          supplyLotData.warehouseId
        )}/supplyLots/${encodeURI(supplyLotData.supplyLotId)}`,
        {
          quantity: supplyLotData.totalQuantity,
          dateOfSupplyUtc: supplyLotData.dateOfSupplyUtc,
          keepSellingAfterExpiration: supplyLotData.keepSellingAfterExpiration,
        }
      )
      .then(() => true)
      .catch(() => {
        return false
      })

  public transfer = (skuId: string, warehouseId: string, supplyLotId: string) =>
    this.http
      .post(
        `${this.baseURL}/${encodeURI(skuId)}/warehouses/${encodeURI(
          warehouseId
        )}/supplyLots/${encodeURI(supplyLotId)}/transfer`
      )
      .then(() => true)
      .catch(() => false)
}
