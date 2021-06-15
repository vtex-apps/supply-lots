/* eslint-disable vtex/prefer-early-return */
/* eslint-disable func-names */
import { FC, SyntheticEvent, useEffect } from 'react'
import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-apollo'
import {
  IconDelete,
  IconExternalLinkMini,
  IconEdit,
  Tag,
  ButtonWithIcon,
  Tooltip,
  Button,
} from 'vtex.styleguide'

import WarehouseContext from '../Context/WarehouseContext'
import getSkuAndWarehouseNames from '../../queries/getSkuAndWarehouseNames.gql'
import listSupplyLots from '../../queries/listSupplyLots.gql'

const initialState = {
  searchValue: '',
  emptyStateLabel: 'Nothing to show.',
}

const initialSku = {
  id: '1',
  name: '',
}

const initialWarehouse = {
  id: '1db5eb2',
  name: '',
}

const actionsFalse = {
  1: true,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
}

const WarehouseProvider: FC = (props) => {
  const [warehouse, setWarehouse] = useState<Warehouse>(initialWarehouse)
  const [sku, setSku] = useState<Sku>(initialSku)
  const [date, setDate] = useState<Date>()
  const [keep, setKeep] = useState<boolean>()
  const [items, setItems] = useState<number>()
  const [modal, setModal] = useState(0)
  const [modalDelete, setDelete] = useState(false)
  const [modalTransfer, setTransfer] = useState(false)

  function updateSku(object: Sku) {
    setSku({ ...sku, ...object })
  }

  function updateWarehouse(object: Warehouse) {
    setWarehouse({ ...warehouse, ...object })
  }
  function reformatDate(dateStr: string) {
    const date = dateStr.split('T')
    const dArr = date[0].split('-') // ex input "2010-01-18"

    return `${dArr[2]}/${dArr[1]}/${dArr[0]}` // ex out: "18/01/10"
  }

  const { data: dataListSupplyLots } =
    useQuery(listSupplyLots,  {
      variables: { skuId: sku.id, warehouseId: warehouse.id },
    });

  function newSupplyLot() {
    setModal(1)
    setDate(undefined)
    setKeep(undefined)
    setItems(undefined)
  }


  async function clickEdit(index: number, skuId: string, warehouseId: string, supplyLotId: string) {
    setModal(2)
    const date = new Date(dataListSupplyLots?.listSupplyLots[index]?.dateOfSupplyUtc)
    setDate(date)
    setItems(dataListSupplyLots?.listSupplyLots[index]?.totalQuantity)
    setKeep(dataListSupplyLots?.listSupplyLots[index]?.keepSellingAfterExpiration)
  }

  function clickDelete(
    skuId: string,
    warehouseId: string,
    supplyLotId: string
  ) {
    setDelete(true)
    // Deletar
  }

  function clickTransfer(
    skuId: string,
    warehouseId: string,
    supplyLotId: string
  ) {
    setTransfer(true)
    // Transferir
  }

  const listSupplyLotsValues = useMemo(() => {
    const tableValues: any[] = []
    
    // eslint-disable-next-line array-callback-return
    dataListSupplyLots?.listSupplyLots.map(function (
      values: {
        supplyLotId: string
        dateOfSupplyUtc: string
        totalQuantity: number
        keepSellingAfterExpiration: boolean
        reservedQuantity: number
        availableQuantity: number
      },
      indexOf: number
    ) {
      const value = {
        index: indexOf+1,
        date: reformatDate(values.dateOfSupplyUtc),     
        total: values.totalQuantity,
        reserved:values.reservedQuantity,
        available:values.availableQuantity,
        keepSelling: values.keepSellingAfterExpiration ? 'Sim' : 'Não',
        color: colorLabel(
          values.keepSellingAfterExpiration,
          values.dateOfSupplyUtc
        ),
        actions: {
          index: indexOf,
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
    let color = '#8bc34a'
    let label = 'Regular'
    const date = new Date()
    const dateUTC = date.toUTCString()

    const secondsdateOfSupplyUtc = Date.parse(dateOfSupplyUtc)
    const secondsNow = Date.parse(dateUTC)

    if (secondsdateOfSupplyUtc < secondsNow && !keepSellingAfterExpiration) {
      label = 'Expirado'
      color = 'red'
    } else if (
      secondsdateOfSupplyUtc < secondsNow &&
      keepSellingAfterExpiration
    ) {
      label = 'Expirado e vendendo'
      color = 'red'
    } else if (
      secondsdateOfSupplyUtc > secondsNow &&
      secondsdateOfSupplyUtc - secondsNow < 259200000
    ) {
      label = 'Expirando'
      color = 'yellow'
    }

    return { color, label }
  }

  const schemaTable = {
    properties: {
      index: {
        title: 'Indice',
      },
      date: {
        title: 'Data de chegada',
      },
      total: {
        title: 'Total dos lotes',
      },
      reserved:{
        title: "Reservado"
      },
      available:{
        title: "Disponível"
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
            <Tooltip label="Editar estoque futuro">
              <Button
                icon={true}
                variation="tertiary"
                autoComplete="teste"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickEdit(
                    cellData?.index,
                    cellData?.skuId,
                    cellData?.warehouseId,
                    cellData?.supplyLotId
                  )
                }
                
              }
              ><IconEdit /></Button>
              </Tooltip>
              <Tooltip label="Excluir estoque futuro">
                 <Button
                  icon={true}
                  variation="tertiary"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault()
                    clickDelete(
                      cellData.skuId,
                      cellData.warehouseId,
                      cellData.supplyLotId
                    )
                  }}
                  ><IconDelete /></Button>
              </Tooltip>
              <Tooltip label="Transferir estoque futuro">

              <Button
                icon={true}
                variation="tertiary"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickTransfer(
                    cellData.skuId,
                    cellData.warehouseId,
                    cellData.supplyLotId
                  )
                }}
              ><IconExternalLinkMini /></Button>
              </Tooltip>
            </>
          )
          }
      },
    },
  }

  return (
    <WarehouseContext.Provider
      value={{
        warehouse,
        sku,
        newSupplyLot,
        listSupplyLotsValues,
        schemaTable,
        modal,
        setModal,
        setDate,
        date,
        setKeep, 
        keep,
        items,
        setItems,
        modalDelete,
        setDelete,
        modalTransfer,
        setTransfer
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider

function cancellEdit(skuId: any, warehouseId: any, supplyLotId: any) {
  throw new Error('Function not implemented.')
}

