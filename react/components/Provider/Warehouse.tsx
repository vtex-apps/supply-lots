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
  ButtonWithIcon,
  Tooltip,
  Button,
  IconInfo,
} from 'vtex.styleguide'

import WarehouseContext from '../Context/WarehouseContext'
import getSkuAndWarehouseNames from '../../queries/getSkuAndWarehouseNames.gql'
import listSupplyLots from '../../queries/listSupplyLots.gql'
import setSupplyLot from '../../queries/setSupplyLot.gql'
import SupplyLots from '../../SupplyLots'

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

const schemaYup = yup.object().shape({
  dateOfSupplyUtc: yup.date().required(),
  keepSellingAfterExpiration: yup.boolean().required(),
  totalQuantity: yup.number().required().positive().integer()
})

const WarehouseProvider: FC = (props) => {
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

  function updateSku(object: Sku) {
    setSku({ ...sku, ...object })
  }

  function updateWarehouse(object: Warehouse) {
    setWarehouse({ ...warehouse, ...object })
  }
  
  function updateItems(object: number) {
    setItems(object)
  }

  function convert(date: Date) {
      const mnth = ("0" + (date.getMonth() + 1)).slice(-2)
      const day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  async function validationFuntion(key: string) {
    let text = ''

    let object: Date | boolean | number | undefined = date
    if(key === 'keepSellingAfterExpiration') object = keep
    else if(key === 'totalQuantity') object = items

      try {
        schemaYup.validateSyncAt(key, object)
      } catch (e) {
        if (
          key === 'totalQuantity' &&
          e.errors[0] === 'zipCode must be exactly 8 characters'
        ) text = "o número precisa ser positivo"
        else text = 'Preencha o campo obrigatório'
      }
    
    return text
  }

  

  const { data: dataListSupplyLots, refetch } =
    useQuery(listSupplyLots,  {
      variables: { skuId: sku.id, warehouseId: warehouse.id },
    });

  const [setSupplyLotValue] = useMutation(setSupplyLot)


  function newSupplyLot() {
    setModal(1)
    setDate(undefined)
    setKeep(undefined)
    setItems(undefined)
  }


async function validation() {
  const object = { dateOfSupplyUtc: date,
    keepSellingAfterExpiration: keep,
    totalQuantity: items}
  const retorno = await schemaYup.validate(object).catch(function (err) {
    err.name // => 'ValidationError'
    err.errors // => ['Deve ser maior que 18']

    if(err.errors[0] === "totalQuantity must be a positive number") setText('O total de lotes precisa ser maior que 0')
    else setText('Preencha todos os campos')
    console.log(err.names, err.errors)
    return false
  })

  return retorno
}

  async function addSupplyLot(){
    const valid = await validation()
    console.log("valid", valid)
    if(valid){
      setModal(0)
      let dateValue = '0000-00-00'
      if(date != undefined) dateValue = convert(date)
        const supplyLotData: SypplyLotInput ={
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ? keep : false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ? items : 0
      }

      console.log(supplyLotData)

      const retorno = await setSupplyLotValue ({ variables: { supplyLotData } })

      refetch()
      console.log("retorno: ", retorno)
    }
  }

  async function editSupplyLot(){
    const valid = await validation()
    console.log("valid", valid)
    if(valid){
      setModal(0)
      let dateValue = '0000-00-00'
      if(date != undefined) dateValue = convert(date)
        const supplyLotData: SypplyLotInput ={
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ? keep : false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ? items : 0,
        supplyLotId: id ? id : '',

      }

      console.log(supplyLotData)

      const retorno = await setSupplyLotValue ({ variables: { supplyLotData } })

      refetch()
      console.log("retorno: ", retorno)
    }
  }



  async function clickEdit(index: number, skuId: string, warehouseId: string, supplyLotId: string) {
    setModal(2)
    const dateValue = new Date(dataListSupplyLots?.listSupplyLots[index]?.dateOfSupplyUtc)
    setDate(dateValue)
    setItems(dataListSupplyLots?.listSupplyLots[index]?.totalQuantity)
    setKeep(dataListSupplyLots?.listSupplyLots[index]?.keepSellingAfterExpiration)

    setId(supplyLotId)
    

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

  function reformatDate(dateStr: string) {
    const date = dateStr.split('T')
    const dArr = date[0].split('-') // ex input "2010-01-18"

    return `${dArr[2]}/${dArr[1]}/${dArr[0]}` // ex out: "18/01/10"
  }

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
        updateItems,
        modalDelete,
        setDelete,
        modalTransfer,
        setTransfer,
        addSupplyLot,
        editSupplyLot,
        text
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider


