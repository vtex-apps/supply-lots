import type { ComponentType } from 'react'
import React, { useContext } from 'react'
import { PageBlock, PageHeader, Table } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'
import type { InjectedIntlProps, IntlShape } from 'react-intl'
import { injectIntl } from 'react-intl'

import WarehouseContext from '../Context/WarehouseContext'
import ModalAdd from '../Modal/add'
import ModalDelete from '../Modal/delete'
import ModalTransfer from '../Modal/transfer'
import { productTable } from '../../utils/definedMessages'

interface Props {
  intl: IntlShape
}
const ProductsTable: ComponentType<Props & InjectedIntlProps> = ({ intl }) => {
  const provider = useContext(WarehouseContext)

  const { history } = useRuntime()

  if (provider.modal !== 0) return <ModalAdd></ModalAdd>
  if (provider.modalDelete) return <ModalDelete></ModalDelete>
  if (provider.modalTransfer) return <ModalTransfer></ModalTransfer>

  return (
    <>
      <PageBlock>
        <PageHeader
          title={intl.formatMessage(productTable.titleProdutctTable)}
          linkLabel={intl.formatMessage(productTable.link)}
          onLinkClick={() => {
            history.goBack()
          }}
        />
        <Table
          fullWidth
          toolbar={{
            newLine: {
              label: intl.formatMessage(productTable.toolbar),
              handleCallback: () => provider.newSupplyLot(),
            },
          }}
          totalizers={[
            {
              label: intl.formatMessage(productTable.totalizersSku),
              value: provider.sku.id,
            },
            {
              label: intl.formatMessage(productTable.totalizersProduct),
              value: provider.sku.name,
            },
            {
              label: intl.formatMessage(productTable.totalizersWarehouseId),
              value: provider.warehouse.id,
            },
            {
              label: intl.formatMessage(productTable.totalizersWarehouse),
              value: provider.warehouse.name,
            },
          ]}
          schema={provider.schemaTable}
          items={provider.orderedItems}
          sort={{
            sortedBy: provider.sortedByValue,
            sortOrder: provider.sortOrderValue,
          }}
          onSort={provider.sort}
        ></Table>
      </PageBlock>
    </>
  )
}

export default injectIntl(ProductsTable)
