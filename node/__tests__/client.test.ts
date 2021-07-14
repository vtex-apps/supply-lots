import { SupplyLot } from '../clients/supplyLot'
import type { IOContext } from '@vtex/api'

describe('Supply Lots Client', () => {
  const client = new SupplyLot({} as IOContext),
    spyGet = jest
      .spyOn(client['http'], 'get')
      .mockImplementation(() => new Promise(() => null)),
    spyPut = jest
      .spyOn(client['http'], 'put')
      .mockImplementation(() => new Promise(() => null)),
    spyPost = jest
      .spyOn(client['http'], 'post')
      .mockImplementation(() => new Promise(() => null)),
    spyDelete = jest
      .spyOn(client['http'], 'delete')
      .mockImplementation(() => new Promise(() => null))

  it('List without a supplyLotId: GET request to the endpoint which lists all Supply Lots', () => {
    const skuId = 'mockedSKU',
      warehouseId = 'mockedWarehouse',
      supplyLotId = undefined

    client.list(skuId, warehouseId, supplyLotId)

    expect(spyGet).toBeCalledWith(
      `${client['baseURL']}/${encodeURI(skuId)}/warehouses/${encodeURI(
        warehouseId
      )}/supplyLots`
    )
  })

  it('List with a supplyLotId: GET request to the endpoint which retrieves info for that specific Supply Lot', () => {
    const skuId = 'mockedSKU',
      warehouseId = 'mockedWarehouse',
      supplyLotId = 'definedSupplyLotId'

    client.list(skuId, warehouseId, supplyLotId)

    expect(spyGet).toBeCalledWith(
      `${client['baseURL']}/${encodeURI(skuId)}/warehouses/${encodeURI(
        warehouseId
      )}/supplyLots/${encodeURI(supplyLotId)}`
    )
  })

  it('Set: PUT request to the endpoint that specifies the Supply Lot, with the necessary parameters in the body', () => {
    const supplyLotData = {
      supplyLotId: 'mockedId',
      skuId: 'mockedSKU',
      warehouseId: 'mockedWarehouse',
      totalQuantity: 0,
      keepSellingAfterExpiration: true,
      dateOfSupplyUtc: '2030-12-12',
    }

    client.set(supplyLotData as any)

    expect(spyPut).toBeCalledWith(
      `${client['baseURL']}/${encodeURI(
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
  })

  it('Transfer: POST request to the endpoint which transfers a Supply Lot to the inventory', () => {
    const skuId = 'mockedSKU',
      warehouseId = 'mockedWarehouse',
      supplyLotId = 'mockedSupplyLotId'

    client.transfer(skuId, warehouseId, supplyLotId)

    expect(spyPost).toBeCalledWith(
      `${client['baseURL']}/${encodeURI(skuId)}/warehouses/${encodeURI(
        warehouseId
      )}/supplyLots/${encodeURI(supplyLotId)}/transfer`
    )
  })
  it('Delete: DELETE request to the endpoint containing the information of a specific Supply Lot', () => {
    const skuId = 'mockedSKU',
      warehouseId = 'mockedWarehouse',
      supplyLotId = 'mockedSupplyLotId'

    client.delete(skuId, warehouseId, supplyLotId)

    expect(spyDelete).toBeCalledWith(
      `${client['baseURL']}/${encodeURI(skuId)}/warehouses/${encodeURI(
        warehouseId
      )}/supplyLots/${encodeURI(supplyLotId)}`
    )
  })
})
