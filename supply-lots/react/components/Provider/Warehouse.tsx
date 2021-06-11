/* eslint-disable vtex/prefer-early-return */
/* eslint-disable func-names */
import type { FC, SyntheticEvent } from 'react'
import React, { useMemo, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import {
  IconDelete,
  IconExternalLinkMini,
  IconEdit,
  Tag,
  ButtonWithIcon,
} from 'vtex.styleguide'

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
        index: indexOf + 1,
        name: values.supplyLotId,
        date: reformatDate(values.dateOfSupplyUtc),
        total: values.totalQuantity,
        keepSelling: values.keepSellingAfterExpiration ? 'Sim' : 'Não',
        color: colorLabel(
          values.keepSellingAfterExpiration,
          values.dateOfSupplyUtc
        ),
        actions: {
          skuId: sku.id,
          warehouseId: warehouse.id,
          supplyLotId: values.supplyLotId,
        },
      }

      tableValues.push(value)
    })

    return tableValues
  }, [dataListSupplyLots])

  function colorLabel(
    keepSellingAfterExpiration: boolean,
    dateOfSupplyUtc: string
  ) {
    let color = 'rgb(0, 187, 212)'
    let label = 'Regular'
    const date = new Date()
    const dateUTC = date.toUTCString()

    const secondsdateOfSupplyUtc = Date.parse(dateOfSupplyUtc)
    const secondsNow = Date.parse(dateUTC)

    if (secondsdateOfSupplyUtc < secondsNow && !keepSellingAfterExpiration) {
      label = 'Expirou'
      color = 'rgb(20, 32, 50)'
    } else if (
      secondsdateOfSupplyUtc < secondsNow &&
      keepSellingAfterExpiration
    ) {
      label = 'Expirou e vendendo'
      color = 'red'
    } else if (
      secondsdateOfSupplyUtc > secondsNow &&
      secondsdateOfSupplyUtc - secondsNow < 259200000
    ) {
      label = 'Expirando'
      color = 'rgb(214, 216, 224)'
    }

    return { color, label }
  }

  async function checkValues(event: SyntheticEvent) {
    event.preventDefault()
    if (sku.id && warehouse.id) {
      loadValue({ variables: { skuId: sku.id, warehouseId: warehouse.id } })
    }
  }

  function newSupplyLot() {
    // Adicionar new supply lots
  }

  function actions(indexOf: number) {
    if (indexOf === 0) newSupplyLot()
    else if (indexOf === 1) setValid(false)
  }

  function clickEdit(skuId: string, warehouseId: string, supplyLotId: string) {
    // editar
  }

  function clickDelete(
    skuId: string,
    warehouseId: string,
    supplyLotId: string
  ) {
    // Deletar
  }

  function clickTransfer(
    skuId: string,
    warehouseId: string,
    supplyLotId: string
  ) {
    // Transferir
  }

  const schemaTable = {
    properties: {
      index: {
        title: 'Indice',
      },
      name: {
        title: 'Nome',
      },
      date: {
        title: 'Data de chegada',
      },
      total: {
        title: 'Total dos lotes',
      },
      keepSelling: {
        title: 'Permanecer vendendo',
      },
      color: {
        title: 'Status',
        cellRenderer: ({ cellData }: any) => {
          return (
            <Tag color="#ffff" bgColor={cellData?.color}>
              <span className="nowrap"> {cellData?.label} </span>
            </Tag>
          )
        },
      },
      actions: {
        title: 'Ações',
        cellRenderer: ({ cellData }: any) => {
          const value = `${cellData?.skuId}, ${cellData?.warehouseId},  ${cellData?.supplyLotId}`

          return (
            <>
              <ButtonWithIcon
                icon={<IconEdit />}
                variation="tertiary"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickEdit(
                    cellData.skuId,
                    cellData.warehouseId,
                    cellData.supplyLotId
                  )
                }}
              ></ButtonWithIcon>
              <ButtonWithIcon
                icon={<IconDelete />}
                variation="tertiary"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickDelete(
                    cellData.skuId,
                    cellData.warehouseId,
                    cellData.supplyLotId
                  )
                }}
              ></ButtonWithIcon>
              <ButtonWithIcon
                icon={<IconExternalLinkMini />}
                variation="tertiary"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickTransfer(
                    cellData.skuId,
                    cellData.warehouseId,
                    cellData.supplyLotId
                  )
                }}
              ></ButtonWithIcon>
            </>
          )
        },
      },
    },
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
        schemaTable,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider
