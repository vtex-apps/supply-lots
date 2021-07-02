import { render } from '@vtex/test-tools/react'
import React from 'react'
import { PageBlock, PageHeader, Table } from 'vtex.styleguide'

import ProductsTable from '../components/ProductsTable'

jest.mock('react-intl', () => ({
  useIntl: () => ({ formatMessage: jest.fn() }),
  defineMessages: () => ({}),
  injectIntl: (component: any) => component,
}))

const useContextMock = {
  items: ['line1', 'line2'],
  schema: ['col1'],
  totalizers: ['sku', 'product', 'warehouseId', 'warehouse'],
  sort: 'index',
}

describe('Product Table', () => {
  it('should render a style guide products table', async () => {
    const productTable = render(<ProductsTable />)

    expect(productTable.getByTestId('styleguide-pageblock').innerHTML).toBe(
      ' PageBlock '
    )
  })

  it('should render a style guide PageBlocks', () => {
    const pageblock = render(<PageBlock />)

    expect(pageblock.getByTestId('styleguide-pageblock').innerHTML).toBe(
      ' PageBlock '
    )
  })

  it('should render a style guide PageHeader', () => {
    const pageblock = render(<PageHeader title="PageHeader" link="inventory" />)

    expect(pageblock.getByTestId('inventory').innerHTML).toBe(' PageHeader ')
  })

  it('should render a style guide Table', () => {
    // Falta colocar botão
    const table = render(
      <Table
        items={useContextMock.items}
        schema={useContextMock.schema}
        totalizer={useContextMock.totalizers}
        sort={useContextMock.sort}
      />
    )

    expect(document.getElementsByClassName('totalizer')).toHaveLength(4)
    expect(document.getElementsByClassName('line')).toHaveLength(2)
    expect(document.getElementsByClassName('col')).toHaveLength(1)
    expect(table.getByTestId('styleguide-table').innerHTML).toBe(' index ')
  })
})
