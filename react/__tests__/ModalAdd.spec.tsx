import { render } from '@vtex/test-tools/react'
import React from 'react'
import { Button, DatePicker, Dropdown, Input, Modal } from 'vtex.styleguide'

import ModalAdd from '../components/Modal/add'

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
  it('should render ModalAdd', async () => {
    const modal = render(<ModalAdd />)

    expect(modal.getByTestId('styleguide-modal').innerHTML).toBe('  ')
  })

  it('should render a style guide modal', async () => {
    const modal = render(<Modal title="Modal" />)

    expect(modal.getByTestId('styleguide-modal').innerHTML).toBe(' Modal ')
  })

  it('should render a style guide button', async () => {
    const button = render(<Button />)

    expect(button.getByTestId('styleguide-button').innerHTML).toBe(' Button ')
  })

  it('should render a style guide datepicker', async () => {
    const datepicker = render(<DatePicker />)

    expect(datepicker.getByTestId('styleguide-datepicker').innerHTML).toBe(
      ' DatePicker '
    )
  })

  it('should render a style guide input', async () => {
    const input = render(<Input />)

    expect(input.getByTestId('styleguide-input').innerHTML).toBe(' Input ')
  })

  it('should render a style guide dropdown', async () => {
    const dropdown = render(<Dropdown />)

    expect(dropdown.getByTestId('styleguide-dropdown').innerHTML).toBe(
      ' Dropdown '
    )
  })
})
