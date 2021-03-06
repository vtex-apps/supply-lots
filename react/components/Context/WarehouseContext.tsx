import type { SyntheticEvent } from 'react'
import React from 'react'

interface WarehouseContextType {
  warehouse: Warehouse
  sku: Sku
  newSupplyLot: () => void
  orderedItems: any
  schemaTable: any
  modal: number
  setModal: (modal: number) => void
  setDate: (date: Date) => void
  date: Date | undefined
  setKeep: (keep: boolean) => void
  keep: boolean | undefined
  updateItems: (object: number) => void
  items: number | undefined
  modalDelete: boolean | undefined
  setDelete: (modalDelete: boolean) => void
  modalTransfer: boolean | undefined
  setTransfer: (modalDelete: boolean) => void
  addSupplyLot: () => void
  editSupplyLot: () => void
  deleteSupplyLots: () => void
  transferSupplyLots: () => void
  text: string
  limit: boolean
  sortedByValue: string
  sortOrderValue: string
  sort: (sortOrder: any, sortedBy: any) => void
  setText: (text: string) => void
}
const WarehouseContext = React.createContext<WarehouseContextType>({
  warehouse: {},
  sku: {},
  newSupplyLot: () => {},
  orderedItems: {},
  schemaTable: {},
  modal: 0,
  setModal: () => {},
  setDate: () => {},
  date: new Date(),
  setKeep: () => {},
  keep: false,
  updateItems: () => {},
  items: 0,
  modalDelete: false,
  setDelete: () => {},
  modalTransfer: false,
  setTransfer: () => {},
  addSupplyLot: () => {},
  editSupplyLot: () => {},
  deleteSupplyLots: () => {},
  transferSupplyLots: () => {},
  text: '',
  limit: false,
  sortedByValue: '',
  sortOrderValue: '',
  sort: () => {},
  setText: () => {},
})

export default WarehouseContext
