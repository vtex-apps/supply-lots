import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import { injectIntl, useIntl } from 'react-intl'
import { Button, DatePicker, Dropdown, Input, Modal } from 'vtex.styleguide'

import {
  commonModal,
  modalAddTexts,
  optionModalAdd,
} from '../../utils/definedMessages'
import WarehouseContext from '../Context/WarehouseContext'
import ModalLimit from './limit'

const ModalAdd: FC = () => {
  const provider = useContext(WarehouseContext)

  const intl = useIntl()

  function closeModal() {
    provider.setModal(0)
    provider.setText('')
  }

  const options = [
    {
      value: true,
      label: intl.formatMessage(optionModalAdd.optionsTrue),
    },
    {
      value: false,
      label: intl.formatMessage(optionModalAdd.optionsFalse),
    },
  ]

  const currentDate = new Date()
  const minDate = currentDate.setDate(currentDate.getDate() + 1)

  if (provider.limit) return <ModalLimit></ModalLimit>

  return (
    <Modal
      centered
      isOpen={provider.modal}
      title={
        provider.modal === 1
          ? intl.formatMessage(modalAddTexts.titleAdd)
          : intl.formatMessage(modalAddTexts.titleEdit)
      }
      responsiveFullScreen
      bottomBar={
        <div>
          <span className="mr4">
            <Button
              variation="tertiary"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault
                closeModal()
              }}
            >
              {intl.formatMessage(commonModal.cancel)}
            </Button>
          </span>
          <span>
            <Button
              variation="primary"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault
                if (provider.modal === 1) provider.addSupplyLot()
                else provider.editSupplyLot()
              }}
            >
              {intl.formatMessage(commonModal.save)}
            </Button>
          </span>
        </div>
      }
      onClose={(e: SyntheticEvent) => {
        e.preventDefault
        closeModal()
      }}
    >
      <div>
        <div className="w-90 mv6">
          <DatePicker
            label={intl.formatMessage(modalAddTexts.date)}
            size="large"
            value={provider.date ? provider.date : undefined}
            placeholder={intl.formatMessage(modalAddTexts.datePlaceholder)}
            onChange={(date: Date) => provider.setDate(date)}
            locale="pt-BR"
            minDate={minDate}
          />
        </div>
        <div className="w-90 mv6">
          <Input
            placeholder={intl.formatMessage(modalAddTexts.totalPlaceholder)}
            size="large"
            label={intl.formatMessage(modalAddTexts.total)}
            type="number"
            min="0"
            onChange={(e: any) => {
              provider.updateItems(parseInt(e.target.value, 10))
            }}
            value={
              provider.items?.toString()
                ? provider.items?.toString()
                : undefined
            }
          />
        </div>
        <div className="w-90 mv6">
          <Dropdown
            size="large"
            label={intl.formatMessage(modalAddTexts.keep)}
            placeholder={intl.formatMessage(modalAddTexts.keepPlaceholder)}
            options={options}
            value={provider.keep !== undefined ? provider.keep : undefined}
            onChange={(_: any, v: string) => {
              provider.setKeep(v === 'true')
            }}
          />
        </div>
        <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>
          {provider.text}
        </p>
      </div>
    </Modal>
  )
}

export default injectIntl(ModalAdd)
