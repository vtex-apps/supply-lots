import {
  listSupplyLots,
  setSupplyLot,
  transferSupplyLot,
  deleteSupplyLot,
} from '../resolvers/supplyLots'

jest.mock('uuid', () => ({
  default: 'mockedDefault',
  v4: jest.fn(() => '1234'),
}))

describe('Supply Lots Resolvers', () => {
  // @ts-ignore
  const ctx = {
    clients: {
      supplyLot: {
        list: jest.fn(),
        set: jest.fn(),
        transfer: jest.fn(),
        delete: jest.fn(),
      },
    },
  } as Context

  it('List: call the list method of the supplyLot client provided by the context', () => {
    const params = {
      skuId: 'mockedSKU',
      warehouseId: 'mockedWarehouse',
      supplyLotId: 'mockedSupplyLotId',
    }

    listSupplyLots('', params, ctx)
    expect(ctx.clients.supplyLot.list).toBeCalledWith(
      params.skuId,
      params.warehouseId,
      params.supplyLotId
    )
  })

  it('Set with a supplyLotId as a parameter: call the list method of the supplyLot client provided by the context', () => {
    const params = {
      supplyLotData: {
        skuId: 'mockedSKU',
        warehouseId: 'mockedWarehouse',
        supplyLotId: 'mockedSupplyLotId',
        totalQuantity: 0,
        dateOfSupplyUtc: '2030-12-12',
        keepSellingAfterExpiration: false,
      },
    }
    setSupplyLot('', params as any, ctx)
    expect(ctx.clients.supplyLot.set).toBeCalledWith(params.supplyLotData)
  })

  it('Set without a supplyLotId as a parameter: call the list method of the supplyLot client provided by the context, but generating a random ID', () => {
    const params = {
        supplyLotData: {
          skuId: 'mockedSKU',
          warehouseId: 'mockedWarehouse',
          totalQuantity: 0,
          dateOfSupplyUtc: '2030-12-12',
          keepSellingAfterExpiration: false,
        },
      },
      modifiedLotData = {
        supplyLotId: '1234',
        ...params.supplyLotData,
      }
    setSupplyLot('', params as any, ctx)
    expect(ctx.clients.supplyLot.set).toBeCalledWith(modifiedLotData)
  })

  it('Transfer: call the transfer method of the supplyLot client provided by the context', () => {
    const params = {
      skuId: 'mockedSKU',
      warehouseId: 'mockedWarehouse',
      supplyLotId: 'mockedSupplyLotId',
    }
    transferSupplyLot('', params, ctx)
    expect(ctx.clients.supplyLot.transfer).toBeCalledWith(
      params.skuId,
      params.warehouseId,
      params.supplyLotId
    )
  })

  it('Delete: call the delete method of the supplyLot client provided by the context', () => {
    const params = {
      skuId: 'mockedSKU',
      warehouseId: 'mockedWarehouse',
      supplyLotId: 'mockedSupplyLotId',
    }
    deleteSupplyLot('', params, ctx)
    expect(ctx.clients.supplyLot.delete).toBeCalledWith(
      params.skuId,
      params.warehouseId,
      params.supplyLotId
    )
  })
})
