import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Catalog extends JanusClient {
  protected baseURL = '/api/catalog/pvt'
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

  public skuName = (skuId: string) =>
    this.http
      .get<{ Name: string }>(
        `${this.baseURL}/stockkeepingunit/${encodeURI(skuId)}`
      )
      .then((sku) => sku.Name)
      .catch(() => null)
}
