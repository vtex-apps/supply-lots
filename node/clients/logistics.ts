import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Logistics extends JanusClient {
  protected baseURL = '/api/logistics/pvt'
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

  public warehouseName = (warehouseId: string) =>
     this.http.get<{ id: string, name: string }[]>(
      `${this.baseURL}/configuration/warehouses`
    ).then(data => 
      data.find((element: { id: string }) => 
        element.id === warehouseId
      )?.name
    ).catch(() => undefined)
}