import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import { useIntl, injectIntl } from 'react-intl'
import { Button, Modal } from 'vtex.styleguide'

import IconTransferBig from '../../icons/IconsTransferBig'
import { commonModal, modalTransfer } from '../../utils/definedMessages'
import WarehouseContext from '../Context/WarehouseContext'

const ModalTransfer: FC = () => {
  const provider = useContext(WarehouseContext)

  const intl = useIntl()

  function closeModal() {
    provider.setTransfer(false)
  }

  return (
    <Modal
      isOpen={provider.modalTransfer}
      responsiveFullScreen
      bottomBar={
        <div className="nowrap">
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
                provider.transferSupplyLots()
              }}
            >
              {intl.formatMessage(modalTransfer.transfer)}
            </Button>
          </span>
        </div>
      }
      onClose={(e: SyntheticEvent) => {
        e.preventDefault
        closeModal()
      }}
    >
      <div className="flex flex-column items-center justify-center t-heading-5">
        <IconTransferBig />
        <div className="pv3 t-heading-4">
          {intl.formatMessage(modalTransfer.transferText)}
        </div>

        <div className="pv3 t-body c-muted-2">
          {intl.formatMessage(modalTransfer.transferQuestion)}{' '}
        </div>
      </div>
    </Modal>
  )
}

export default injectIntl(ModalTransfer)
