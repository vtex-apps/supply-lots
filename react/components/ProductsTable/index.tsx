import type { FC } from 'react'
import React, { useContext } from 'react'
import { PageBlock, Table } from 'vtex.styleguide'

import WarehouseContext from '../Context/WarehouseContext'
import HomePage from '../HomePage/index'

const ProductsTable: FC = () => {
  const provider = useContext(WarehouseContext)

  if (!provider.valid) return <HomePage></HomePage>

  return (
    <>
      <PageBlock>
        <Table
          toolbar={{
            inputSearch: {
              value: provider.search.searchValue,
              placeholder: 'Search stuff...',
              onChange: (event: { target: { value: string } }) => {
                provider.updateSearch(event.target.value)
              },
              onClear: () => {
                provider.updateClear()
              },
            },
            newLine: {
              label: 'Ações',
              handleCallback: () => alert('handle new line callback'),
              actions: [
                'Adicionar novo estoque futuro',
                'Trocar SKU e/ou Estoque',
              ].map((label, indexOf) => ({
                label,
                onClick: () => {
                  provider.actions(indexOf)
                },
              })),
            },
            fields: {
              label: 'Toggle visible fields',
              showAllLabel: 'Show All',
              hideAllLabel: 'Hide All',
            },
            density: {
              buttonLabel: 'Line density',
              lowOptionLabel: 'Low',
              mediumOptionLabel: 'Medium',
              highOptionLabel: 'High',
            },
          }}
          totalizers={[
            {
              label: 'SKU ID',
              value: provider.sku.id,
            },
            {
              label: 'Produto',
              value: provider.sku.name,
            },
            {
              label: 'Estoque ID',
              value: provider.warehouse.id,
            },
            {
              label: 'Nome estoque',
              value: provider.warehouse.name,
            },
          ]}
          schema={provider.schemaTable}
          items={provider.listSupplyLotsValues}
        ></Table>
      </PageBlock>
    </>
  )
}

export default ProductsTable
