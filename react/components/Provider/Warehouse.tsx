/* eslint-disable vtex/prefer-early-return */
/* eslint-disable func-names */
import { FC, SyntheticEvent, useEffect } from 'react'
import React, { useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import * as yup from 'yup'

import {
  IconDelete,
  IconExternalLinkMini,
  IconEdit,
  Tag,
  Tooltip,
  Button,
  IconInfo,
} from 'vtex.styleguide'

import WarehouseContext from '../Context/WarehouseContext'
import getSkuAndWarehouseNames from '../../queries/getSkuAndWarehouseNames.gql'
import listSupplyLots from '../../queries/listSupplyLots.gql'
import setSupplyLot from '../../queries/setSupplyLot.gql'
import deleteSupplyLot from '../../queries/deleteSupplyLot.gql'
import transferSupplyLot from '../../queries/transferSupplyLot.gql'

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

const schemaYup = yup.object().shape({
  dateOfSupplyUtc: yup.date().required(),
  keepSellingAfterExpiration: yup.boolean().required(),
  totalQuantity: yup.number().required().positive().integer()
})

const WarehouseProvider: FC = (props) => {
  //Definições
  const [warehouse, setWarehouse] = useState<Warehouse>(initialWarehouse)
  const [sku, setSku] = useState<Sku>(initialSku)
  const [date, setDate] = useState<Date>()
  const [keep, setKeep] = useState<boolean>()
  const [items, setItems] = useState<number>()
  const [modal, setModal] = useState(0)
  const [modalDelete, setDelete] = useState(false)
  const [modalTransfer, setTransfer] = useState(false)
  const [text, setText] = useState('')
  const [id, setId] = useState('')
  const [sortedBy, setSortedBy] = useState()
  const [sortOrder, setSortOrder] = useState()
  const [limit, setLimit] = useState(false)

  const { data: dataListSupplyLots, refetch } =
    useQuery(listSupplyLots,  {
      variables: { skuId: sku.id, warehouseId: warehouse.id },
    });

    const { data: dataNames } =
    useQuery(getSkuAndWarehouseNames,  {
      variables: { skuId: sku.id, warehouseId: warehouse.id },
    });

  const [setSupplyLotValue] = useMutation(setSupplyLot)
  const [deleteSupplyLotValue] = useMutation(deleteSupplyLot)
  const [transferSupplyLotValue] = useMutation(transferSupplyLot)

  //Adicionando informações do sku e da warehouse 
  useEffect(() => {
    var url = window.location.href; 
    var values = url.split('?'); 
    
    if (values[1] !== undefined) {
      values = values[1].split('&');
      const idSku = values[0].split('=')
      const idWarehouse = values[1].split('=')

      updateSku({id: idSku[1]})
      updateWarehouse({id: idWarehouse[1]})
    }

  }, [])

  useMemo(() => {
   if(dataNames){
    updateSku({name: dataNames?.getSkuAndWarehouseNames[0]})
    updateWarehouse({name:dataNames?.getSkuAndWarehouseNames[1]})
   } 

  }, [dataNames])

  function updateSku(object: Sku) {
    setSku({ ...sku, ...object })
  }

  function updateWarehouse(object: Warehouse) {
    setWarehouse({ ...warehouse, ...object })
  }
  
  function updateItems(object: number) {
    setItems(object)
  }

  
  //Funções da tabela
  async function validation() {
  const object = { dateOfSupplyUtc: date,
    keepSellingAfterExpiration: keep,
    totalQuantity: items}
  const retorno = await schemaYup.validate(object).catch(function (err) {
    err.name // => 'ValidationError'
    err.errors // => ['Deve ser maior que 18']

    if(err.errors[0] === "totalQuantity must be a positive number") setText('O total de lotes precisa ser maior que 0')
    else setText('Preencha todos os campos')
    return false
  })

  return retorno
  }

  async function addSupplyLot(){
    const valid = await validation()
    if(valid){
      setModal(0)
      setText('')
      let dateValue = '0000-00-00'
      if(date != undefined) dateValue = date?.toISOString()
        const supplyLotData: SupplyLotInput ={
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ? keep : false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ? items : 0
      }


      await setSupplyLotValue ({ variables: { supplyLotData } })

      refetch()
    }
  }

  function newSupplyLot() {
    setModal(1)
    setDate(undefined)
    setKeep(undefined)
    setItems(undefined)
  }

  async function editSupplyLot(){
    const valid = await validation()
    if(valid){
      setModal(0)
      setText('')

      let dateValue = '0000-00-00'
      if(date != undefined) dateValue = date?.toISOString()
        const supplyLotData: SupplyLotInput ={
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ? keep : false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ? items : 0,
        supplyLotId: id ? id : '',

      }


      await setSupplyLotValue ({ variables: { supplyLotData } })

      refetch()
    }
  }

  async function clickEdit(index: number, supplyLotId: string) {
    setModal(2)
    const dateValue = new Date(dataListSupplyLots?.listSupplyLots[index]?.dateOfSupplyUtc)

    setDate(dateValue)
    setItems(dataListSupplyLots?.listSupplyLots[index]?.totalQuantity)
    setKeep(dataListSupplyLots?.listSupplyLots[index]?.keepSellingAfterExpiration)

    setId(supplyLotId)
  }

  async function deleteSupplyLots(){
    setDelete(false)
    await deleteSupplyLotValue ({ variables: { skuId: sku.id, warehouseId: warehouse.id, supplyLotId: id } })

    refetch()
  }

  function clickDelete(
    supplyLotId: string
  ) {
    setDelete(true)
    setId(supplyLotId)

  }

  async function transferSupplyLots(){
    setTransfer(false)
    await transferSupplyLotValue ({ variables: { skuId: sku.id, warehouseId: warehouse.id, supplyLotId: id } })

    refetch()
  }

  function clickTransfer(
    supplyLotId: string
  ) {
    setTransfer(true)
    setId(supplyLotId)
  }

  //Construindo a tabela
  const listSupplyLotsValues = useMemo(() => {
    const tableValues: any[] = []
    
    if(dataListSupplyLots?.listSupplyLots.length === 10 && !limit) setLimit(true)
    else if (limit) setLimit(false)

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
        date: (new Date(values.dateOfSupplyUtc)).toLocaleDateString(),     
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
      color = '#ffd700'
    }

    return { color, label }
  }

  const schemaTable = {
    properties: {
      index: {
        title: 'Indice',
        width: 80
      },
      date: {
        title: 'Data de chegada',
        minWidth: 100
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
        minWidth: 200,
        headerRenderer: () => {
          return (
            <>
            <p>{'Permanecer vendendo'}</p>
            <div className="ml2">
            <Tooltip label="O produto deve ser vendido mesmo se a data de chegada já tiver passado? ">
              <span className="c-on-base pointer">
                <IconInfo />
              </span>
            </Tooltip>
            </div>
            </>
          )
        },
      },
      color: {
        title: 'Status',
        minWidth:200,
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
                    clickDelete(cellData.supplyLotId)
                  }}
                  ><IconDelete /></Button>
              </Tooltip>
              <Tooltip label="Transferir estoque futuro">

              <Button
                icon={true}
                variation="tertiary"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault()
                  clickTransfer(cellData.supplyLotId)
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
        updateItems,
        modalDelete,
        setDelete,
        modalTransfer,
        setTransfer,
        addSupplyLot,
        editSupplyLot,
        deleteSupplyLots,
        transferSupplyLots,
        text,
        limit
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider


