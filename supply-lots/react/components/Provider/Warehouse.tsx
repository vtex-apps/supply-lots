import type { FC, SyntheticEvent } from 'react'
import React, { useState } from 'react'

import WarehouseContext from '../Context/WarehouseContext'

const initialState = {
  searchValue: '',
  emptyStateLabel: 'Nothing to show.',
}

const initialSku = {
  id: '',
  name: 'Produto',
}

const initialWarehouse = {
  id: '',
  name: 'Warehouse',
}

const WarehouseProvider: FC = (props) => {
  const [search, setSearch] = useState(initialState)
  const [warehouse, setWarehouse] = useState<Warehouse>(initialWarehouse)
  const [sku, setSku] = useState<Sku>(initialSku)
  const [valid, setValid] = useState(false)

  function updateSearch(searchValue: string) {
    setSearch({ ...initialState, searchValue })
  }

  function updateClear() {
    setSearch({ ...initialState })
  }

  function submitToolbar(event: any) {
    event.preventDefault()

    if (!search.searchValue) {
      setSearch({ ...initialState })
    } else {
      setSearch({ ...initialState, emptyStateLabel: 'No results found.' })
    }
  }

  function updateSku(object: Sku) {
    setSku({ ...sku, ...object })
  }

  function updateWarehouse(object: Warehouse) {
    setWarehouse({ ...warehouse, ...object })
  }

  function checkValues(event: SyntheticEvent) {
    event.preventDefault()
    setValid(true)
  }

  function goHomePage() {
    setValid(false)
  }

  function openModalNewSupplyLot() {
    alert('Abrir Modal')
  }

  function actions(indexOf: number) {
    if (indexOf === 0) openModalNewSupplyLot()
    else if (indexOf === 1) goHomePage()
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
        goHomePage,
        actions,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  )
}

export default WarehouseProvider
