import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Catalog extends JanusClient {
  protected baseURL = '/api/catalog/pvt'
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

  public skuName = (skuId: string) => 
    this.http.get<{ Name: string }>(
      `${this.baseURL}/stockkeepingunit/${encodeURI(skuId)}`
    ).then(sku => sku.Name)
     .catch(() => undefined)
}

