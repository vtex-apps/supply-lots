/* eslint-disable vtex/prefer-early-return */
/* eslint-disable func-names */
import type { FC, SyntheticEvent } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import * as yup from 'yup'
import {
  IconDelete,
  IconEdit,
  Tag,
  Tooltip,
  Button,
  IconInfo,
} from 'vtex.styleguide'
import { injectIntl, useIntl } from 'react-intl'

import WarehouseContext from '../Context/WarehouseContext'
import getSkuAndWarehouseNames from '../../queries/getSkuAndWarehouseNames.gql'
import listSupplyLots from '../../queries/listSupplyLots.gql'
import setSupplyLot from '../../queries/setSupplyLot.gql'
import deleteSupplyLot from '../../queries/deleteSupplyLot.gql'
import transferSupplyLot from '../../queries/transferSupplyLot.gql'
import IconTransfer from '../../icons/IconsTransfer'
import { provider } from '../../utils/definedMessages'

const initialSku = {
  id: '',
  name: '',
}

const initialWarehouse = {
  id: '',
  name: '',
}

const schemaYup = yup.object().shape({
  dateOfSupplyUtc: yup.date().required(),
  keepSellingAfterExpiration: yup.boolean().required(),
  totalQuantity: yup.number().required().positive().integer(),
})

const WarehouseProvider: FC = (props) => {
  // Definições
  const intl = useIntl()
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
  const [sortedByValue, setSortedBy] = useState('index')
  const [sortOrderValue, setSortOrder] = useState('index')
  const [limit, setLimit] = useState(false)
  const [orderedItems, setOrderedItems] = useState<any[]>()

  const { data: dataListSupplyLots, refetch } = useQuery(listSupplyLots, {
    variables: { skuId: sku.id, warehouseId: warehouse.id },
  })

  const { data: dataNames } = useQuery(getSkuAndWarehouseNames, {
    variables: { skuId: sku.id, warehouseId: warehouse.id },
  })

  const [setSupplyLotValue] = useMutation(setSupplyLot)
  const [deleteSupplyLotValue] = useMutation(deleteSupplyLot)
  const [transferSupplyLotValue] = useMutation(transferSupplyLot)

  useEffect(() => {
    const url = window.location.href
    let values = url.split('?')

    if (values[1] !== undefined) {
      values = values[1].split('&')
      const idSku = values[0].split('=')
      const idWarehouse = values[1].split('=')

      updateSku({ id: idSku[1] })
      updateWarehouse({ id: idWarehouse[1] })
    }
  }, [])

  useMemo(() => {
    if (dataNames) {
      updateSku({ name: dataNames?.getSkuAndWarehouseNames[0] })
      updateWarehouse({ name: dataNames?.getSkuAndWarehouseNames[1] })
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

  // Funções da tabela
  async function validation() {
    const object = {
      dateOfSupplyUtc: date,
      keepSellingAfterExpiration: keep,
      totalQuantity: items,
    }

    const retorno = await schemaYup.validate(object).catch(function (err) {
      err.name
      err.errors

      if (err.errors[0] === 'totalQuantity must be a positive number') {
        setText(intl.formatMessage(provider.textNoticeNumber))
      } else {
        setText(intl.formatMessage(provider.textNotice))
      }

      return false
    })

    return retorno
  }

  async function addSupplyLot() {
    const valid = await validation()

    if (valid) {
      setModal(0)
      setText('')
      let dateValue = '0000-00-00'

      if (date !== undefined) dateValue = date?.toISOString()
      const supplyLotData: SupplyLotInput = {
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ?? false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ?? 0,
      }

      await setSupplyLotValue({ variables: { supplyLotData } })

      refetch()
    }
  }

  function newSupplyLot() {
    setModal(1)
    setDate(undefined)
    setKeep(undefined)
    setItems(undefined)
  }

  async function editSupplyLot() {
    const valid = await validation()

    if (valid) {
      setModal(0)
      setText('')

      let dateValue = '0000-00-00'

      if (date !== undefined) dateValue = date?.toISOString()
      const supplyLotData: SupplyLotInput = {
        dateOfSupplyUtc: dateValue,
        keepSellingAfterExpiration: keep ?? false,
        skuId: sku.id ? sku.id : '',
        warehouseId: warehouse.id ? warehouse.id : '',
        totalQuantity: items ?? 0,
        supplyLotId: id || '',
      }

      await setSupplyLotValue({ variables: { supplyLotData } })

      refetch()
    }
  }

  async function clickEdit(index: number, supplyLotId: string) {
    setModal(2)
    const dateValue = new Date(
      dataListSupplyLots?.listSupplyLots[index]?.dateOfSupplyUtc
    )

    setDate(dateValue)
    setItems(dataListSupplyLots?.listSupplyLots[index]?.totalQuantity)
    setKeep(
      dataListSupplyLots?.listSupplyLots[index]?.keepSellingAfterExpiration
    )

    setId(supplyLotId)
  }

  async function deleteSupplyLots() {
    setDelete(false)
    await deleteSupplyLotValue({
      variables: { skuId: sku.id, warehouseId: warehouse.id, supplyLotId: id },
    })

    refetch()
  }

  function clickDelete(supplyLotId: string) {
    setDelete(true)
    setId(supplyLotId)
  }

  async function transferSupplyLots() {
    setTransfer(false)
    await transferSupplyLotValue({
      variables: { skuId: sku.id, warehouseId: warehouse.id, supplyLotId: id },
    })

    refetch()
  }

  function clickTransfer(supplyLotId: string) {
    setTransfer(true)
    setId(supplyLotId)
  }

  const listSupplyLotsValues = useMemo(() => {
    const tableValues: any[] = []

    if (dataListSupplyLots?.listSupplyLots.length === 8 && !limit) {
      setLimit(true)
    } else if (limit) {
      setLimit(false)
    }

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
        index: indexOf + 1,
        date: new Date(values.dateOfSupplyUtc).toLocaleDateString(),
        total: values.totalQuantity,
        reserved: values.reservedQuantity,
        available: values.availableQuantity,
        keepSelling: values.keepSellingAfterExpiration
          ? intl.formatMessage(provider.yes)
          : intl.formatMessage(provider.no),
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

    setOrderedItems(tableValues)

    return tableValues
  }, [dataListSupplyLots])

  function converter(dateConverter: string) {
    const parts = dateConverter.split('/')

    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    )
  }

  function sortDateASC() {
    listSupplyLotsValues.sort(function (a, b) {
      if (converter(a.date) > converter(b.date)) {
        return 1
      }

      if (converter(a.date) < converter(b.date)) {
        return -1
      }

      // a must be equal to b
      return 0
    })
  }

  function sortDateDESC() {
    listSupplyLotsValues.sort(function (a, b) {
      if (converter(a.date) < converter(b.date)) {
        return 1
      }

      if (converter(a.date) > converter(b.date)) {
        return -1
      }

      // a must be equal to b
      return 0
    })
  }

  function sortIndexASC() {
    listSupplyLotsValues.sort(function (a, b) {
      if (a.index > b.index) {
        return 1
      }

      if (a.index < b.index) {
        return -1
      }

      // a must be equal to b
      return 0
    })
  }

  function sortIndexDESC() {
    listSupplyLotsValues.sort(function (a, b) {
      if (a.index < b.index) {
        return 1
      }

      if (a.index > b.index) {
        return -1
      }

      // a must be equal to b
      return 0
    })
  }

  function sort({
    sortOrder,
    sortedBy,
  }: {
    sortOrder: string
    sortedBy: string
  }) {
    if (sortedBy === 'date') {
      if (sortOrder === 'ASC') {
        sortDateASC()
      } else {
        sortDateDESC()
      }
    } else if (sortOrder === 'ASC') {
      sortIndexASC()
    } else {
      sortIndexDESC()
    }

    setOrderedItems(listSupplyLotsValues)
    setSortOrder(sortOrder)
    setSortedBy(sortedBy)
  }

  useMemo(() => {
    listSupplyLotsValues.sort(function (a, b) {
      if (a.index > b.index) {
        return 1
      }

      if (a.index < b.index) {
        return -1
      }

      // a must be equal to b
      return 0
    })
  }, [listSupplyLotsValues])

  function colorLabel(
    keepSellingAfterExpiration: boolean,
    dateOfSupplyUtc: string
  ) {
    let color = '#8bc34a'
    let label = intl.formatMessage(provider.regular)
    const dateNow = new Date()
    const dateUTC = dateNow.toUTCString()

    const secondsdateOfSupplyUtc = Date.parse(dateOfSupplyUtc)
    const secondsNow = Date.parse(dateUTC)

    if (secondsdateOfSupplyUtc < secondsNow && !keepSellingAfterExpiration) {
      label = intl.formatMessage(provider.expired)
      color = 'red'
    } else if (
      secondsdateOfSupplyUtc < secondsNow &&
      keepSellingAfterExpiration
    ) {
      label = intl.formatMessage(provider.expiredYes)
      color = 'red'
    } else if (
      secondsdateOfSupplyUtc > secondsNow &&
      secondsdateOfSupplyUtc - secondsNow < 259200000
    ) {
      const days = Math.ceil(
        (secondsdateOfSupplyUtc - secondsNow) / (1000 * 60 * 60 * 24)
      ).toString()

      let notice = ''

      if (days === '1') {
        notice =
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          intl.formatMessage(provider.expiring) +
          days +
          intl.formatMessage(provider.day)
      } else {
        notice =
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          intl.formatMessage(provider.expiring) +
          days +
          intl.formatMessage(provider.days)
      }

      label = notice
      color = '#ffd700'
    }

    return { color, label }
  }

  const schemaTable = {
    properties: {
      index: {
        title: intl.formatMessage(provider.index),
        width: 80,
        sortable: true,
      },
      date: {
        title: intl.formatMessage(provider.date),
        minWidth: 100,
        sortable: true,
      },
      total: {
        title: intl.formatMessage(provider.total),
      },
      reserved: {
        title: intl.formatMessage(provider.reserved),
      },
      available: {
        title: intl.formatMessage(provider.available),
      },
      keepSelling: {
        minWidth: 200,
        headerRenderer: () => {
          return (
            <>
              <p>{intl.formatMessage(provider.keep)}</p>
              <div className="ml2">
                <Tooltip label={intl.formatMessage(provider.info)}>
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
        title: intl.formatMessage(provider.status),
        minWidth: 200,
        cellRenderer: ({ cellData }: any) => {
          return (
            <Tag color="#ffff" bgColor={cellData?.color}>
              <span className="nowrap"> {cellData?.label} </span>
            </Tag>
          )
        },
      },
      actions: {
        title: intl.formatMessage(provider.actions),
        cellRenderer: ({ cellData }: any) => {
          return (
            <>
              <Tooltip label={intl.formatMessage(provider.edit)}>
                <Button
                  icon={true}
                  variation="tertiary"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault()
                    clickEdit(cellData?.index, cellData?.supplyLotId)
                  }}
                >
                  <IconEdit />
                </Button>
              </Tooltip>
              <Tooltip label={intl.formatMessage(provider.delete)}>
                <Button
                  icon={true}
                  variation="tertiary"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault()
                    clickDelete(cellData.supplyLotId)
                  }}
                >
                  <IconDelete />
                </Button>
              </Tooltip>
              <Tooltip label={intl.formatMessage(provider.transfer)}>
                <Button
                  icon={true}
                  variation="tertiary"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault()
                    clickTransfer(cellData.supplyLotId)
                  }}
                >
                  <a>
                    <IconTransfer />
                  </a>
                </Button>
              </Tooltip>
            </>
          )
        },
      },
    },
  }

  return (
    <WarehouseContext.Provider
      value={{
        warehouse,
        sku,
        newSupplyLot,
        orderedItems,
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
        limit,
        sortedByValue,
        sortOrderValue,
        sort,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default injectIntl(WarehouseProvider)
