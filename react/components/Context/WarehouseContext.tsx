import type { SyntheticEvent } from 'react'
import React from 'react'

interface WarehouseContextType {
  warehouse: Warehouse
  sku: Sku
  checkValues: () => void
  newSupplyLot: () => void
  listSupplyLotsValues: any
  schemaTable: any
  modal: number
  setModal: (modal: number) => void
  setDate: (date: Date) => void
  date: Date | undefined
  setKeep: (keep: boolean) => void
  keep: boolean | undefined
  setItems: (keep: number) => void
  items: number | undefined
  modalDelete: boolean | undefined
  setDelete: (modalDelete: boolean) => void
  modalTransfer: boolean | undefined
  setTransfer: (modalDelete: boolean) => void
}
const WarehouseContext = React.createContext<WarehouseContextType>({
  warehouse: {},
  sku: {},
  checkValues: () => {},
  newSupplyLot: () => {},
  listSupplyLotsValues: {},
  schemaTable: {},
  modal: 0,
  setModal: () => {},
  setDate: () => {},
  date: new Date(),
  setKeep: () => {},
  keep: false,
  setItems: () => {},
  items: 0,
  modalDelete: false,
  setDelete: () => {},
  modalTransfer: false,
  setTransfer: () => {},
})

export default WarehouseContext
