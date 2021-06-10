/* eslint-disable func-names */
/* eslint-disable vtex/prefer-early-return */
/* eslint-disable no-console */
import type { FC, SyntheticEvent } from 'react'
import React, { useMemo, useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'

import WarehouseContext from '../Context/WarehouseContext'
import getSkuAndWarehouseNames from '../../queries/getSkuAndWarehouseNames.gql'
import listSupplyLots from '../../queries/listSupplyLots.gql'

const initialState = {
  searchValue: '',
  emptyStateLabel: 'Nothing to show.',
}

const initialSku = {
  id: '',
  name: '',
}

const initialWarehouse = {
  id: '',
  name: '',
}

// eslint-disable-next-line vtex/prefer-early-return
const WarehouseProvider: FC = (props) => {
  const [search, setSearch] = useState(initialState)
  const [warehouse, setWarehouse] = useState<Warehouse>(initialWarehouse)
  const [sku, setSku] = useState<Sku>(initialSku)
  const [valid, setValid] = useState(false)

  function reformatDate(dateStr: string) {
    const date = dateStr.split('T')
    const dArr = date[0].split('-') // ex input "2010-01-18"

    return `${dArr[2]}/${dArr[1]}/${dArr[0]}` // ex out: "18/01/10"
  }

  function updateSearch(searchValue: string) {
    setSearch({ ...initialState, searchValue })
  }

  function updateClear() {
    setSearch({ ...initialState })
  }

  function updateSku(object: Sku) {
    setSku({ ...sku, ...object })
  }

  function updateWarehouse(object: Warehouse) {
    setWarehouse({ ...warehouse, ...object })
  }

  const [loadValue, { data }] = useLazyQuery(getSkuAndWarehouseNames)
  const [loadListSupplyLots, { data: dataListSupplyLots }] =
    useLazyQuery(listSupplyLots)

  const isValid = useMemo(() => {
    return (
      data?.getSkuAndWarehouseNames?.skuName &&
      data?.getSkuAndWarehouseNames?.warehouseName
    )
  }, [data])

  useMemo(() => {
    console.log('MUDOU')
    if (isValid) {
      setValid(true)
      updateSku({ name: data.getSkuAndWarehouseNames.skuName })
      updateWarehouse({ name: data.getSkuAndWarehouseNames.warehouseName })
    }
  }, [isValid])

  const loadSupplyLots = useMemo(() => {
    if (isValid) {
      loadListSupplyLots({
        variables: { skuId: sku.id, warehouseId: warehouse.id },
      })
    }
  }, [isValid])

  const listSupplyLotsValues = useMemo(() => {
    console.log('retorno', dataListSupplyLots)

    const tableValues = [{}]

    // eslint-disable-next-line array-callback-return
    dataListSupplyLots?.listSupplyLots.map(function (
      values: {
        supplyLotId: string
        dateOfSupplyUtc: string
        totalQuantity: number
        keepSellingAfterExpiration: boolean
      },
      indexOf: number
    ) {
      const value = {
        index: indexOf,
        name: values.supplyLotId,
        date: reformatDate(values.dateOfSupplyUtc),
        total: values.totalQuantity,
        keepSelling: values.keepSellingAfterExpiration ? 'Sim' : 'Não',
        color: 'teste',
        actions: 'teste2',
      }

      tableValues.push(value)
    })

    return tableValues
  }, [dataListSupplyLots])

  async function checkValues(event: SyntheticEvent) {
    event.preventDefault()
    if (sku.id && warehouse.id) {
      loadValue({ variables: { skuId: sku.id, warehouseId: warehouse.id } })
    }
  }

  function openModalNewSupplyLot() {
    alert('Abrir Modal')
  }

  function actions(indexOf: number) {
    if (indexOf === 0) openModalNewSupplyLot()
    else if (indexOf === 1) setValid(false)
  }

  return (
    <WarehouseContext.Provider
      value={{
        updateSearch,
        updateClear,
        updateSku,
        updateWarehouse,
        warehouse,
        sku,
        search,
        valid,
        checkValues,
        actions,
        listSupplyLotsValues,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider
