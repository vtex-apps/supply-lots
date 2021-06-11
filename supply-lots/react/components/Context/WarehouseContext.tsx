import type { SyntheticEvent } from 'react'
import React from 'react'

interface WarehouseContextType {
  updateSearch: (search: string) => void
  updateClear: () => void
  updateSku: (sku: Sku) => void
  updateWarehouse: (warehouse: Warehouse) => void
  warehouse: Warehouse
  sku: Sku
  search: { searchValue: string; emptyStateLabel: string }
  valid: boolean
  checkValues: (event: SyntheticEvent) => void
  actions: (indexOf: number) => void
  listSupplyLotsValues: any
  schemaTable: any
}
const WarehouseContext = React.createContext<WarehouseContextType>({
  updateSearch: () => {},
  updateClear: () => {},
  updateSku: () => {},
  updateWarehouse: () => {},
  warehouse: {},
  sku: {},
  search: { searchValue: '', emptyStateLabel: '' },
  valid: false,
  checkValues: () => {},
  actions: () => {},
  listSupplyLotsValues: {},
  schemaTable: {},
})

export default WarehouseContext
