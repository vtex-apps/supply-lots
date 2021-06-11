// You can import your files here for testing them
//
// More info: https://github.com/sapegin/jest-cheat-sheet

import {setSupplyLot} from '../resolvers/supplyLots/index'

const supplyLotList = []
const supplyLotData = {

}

const getContext = (supplyLotList: []): unknown => {
  return {
    clients: {
      supplyLot: {
        list: () => supplyLotList,
        set: () => {}
      }
    }
  }

}

describe(`teste 1`, () => {
  it(`empty array`, async () => {
    const ctx = getContext([]) as Context
    //const result = await setSupplyLot('', supplyLotData, ctx)
   // expect(result).toBe(true)
  })

})