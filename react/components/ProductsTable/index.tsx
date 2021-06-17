import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import { PageBlock, PageHeader, Table, Tooltip } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import WarehouseContext from '../Context/WarehouseContext'
import ModalAdd from '../Modal/add'
import ModalDelete from '../Modal/delete'
import ModalTransfer from '../Modal/transfer'
import ModalLimit from '../Modal/limit'

const ProductsTable: FC = () => {
  const provider = useContext(WarehouseContext)

  const { history} = useRuntime()

  if(provider.modal != 0) return (<ModalAdd></ModalAdd>)
  if(provider.modalDelete) return (<ModalDelete></ModalDelete>)
  if(provider.modalTransfer) return (<ModalTransfer></ModalTransfer>)


  return (
    <>
      <PageBlock>
      <PageHeader
        title="Estoque futuro"
        linkLabel="Inventário"
        onLinkClick={(e: SyntheticEvent) => {
          history.goBack()
        }}
      />
        <Table
          fullWidth
          toolbar={{
            newLine: {
              label: 'Adicionar novo estoque futuro',
              handleCallback: () => provider.newSupplyLot(),
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
