import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Logistics extends JanusClient {
  protected baseURL = '/api/logistics/pvt'
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        ...(context.adminUserAuthToken
          ? { VtexIdclientAutCookie: context.adminUserAuthToken }
          : null),
      },
    })
  }

  public warehouseName = (warehouseId: string) =>
    this.http
      .get<Array<{ id: string; name: string }>>(
        `${this.baseURL}/configuration/warehouses`
      )
      .then(
        (data) =>
          data.find((element: { id: string }) => element.id === warehouseId)
            ?.name
      )
}
