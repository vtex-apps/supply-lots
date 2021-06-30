import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import { useIntl, injectIntl } from 'react-intl'
import { Button, Modal } from 'vtex.styleguide'

import { commonModal, modalLimit } from '../../utils/definedMessages'
import WarehouseContext from '../Context/WarehouseContext'

const ModalLimit: FC = () => {
  const provider = useContext(WarehouseContext)

  const intl = useIntl()

  function closeModal() {
    provider.setModal(0)
  }

  return (
    <Modal
      title={intl.formatMessage(modalLimit.limit)}
      centered
      isOpen={provider.modal}
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
        </div>
      }
      onClose={(e: SyntheticEvent) => {
        e.preventDefault
        closeModal()
      }}
    ></Modal>
  )
}

export default injectIntl(ModalLimit)
