import type { FC } from 'react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader } from 'vtex.styleguide'

import { commonMessages } from './utils/definedMessages'
import ProductsTable from './components/ProductsTable'
import WarehouseProvider from './components/Provider/Warehouse'

const SupplyLots: FC = () => (
  <Layout
    fullWidth
    pageHeader={
      <PageHeader title={<FormattedMessage {...commonMessages.inventory} />} />
    }
  >
    <WarehouseProvider>
      <ProductsTable />
    </WarehouseProvider>
  </Layout>
)

export default SupplyLots
