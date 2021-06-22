import type { ComponentType, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import type { IntlShape, InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { Button, Modal } from 'vtex.styleguide'

import IconTrashCan from '../../icons/IconTrashCan'
import { commonModal, modalDelete } from '../../utils/definedMessages'
import WarehouseContext from '../Context/WarehouseContext'

interface Props {
  intl: IntlShape
}
const ModalDelete: ComponentType<Props & InjectedIntlProps> = ({ intl }) => {
  const provider = useContext(WarehouseContext)

  function closeModal() {
    provider.setDelete(false)
  }

  return (
    <Modal
      isOpen={provider.modalDelete}
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
                provider.deleteSupplyLots()
              }}
            >
              {intl.formatMessage(commonModal.delete)}
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
        <IconTrashCan />
        <div className="pv3 t-heading-4">
          {intl.formatMessage(modalDelete.deleteText)}
        </div>

        <div className="pv3 t-body c-muted-2">
          {intl.formatMessage(modalDelete.deleteQuestion)}
        </div>
        <div className="pv3 t-body c-muted-2">
          {intl.formatMessage(modalDelete.deleteReason)}
        </div>
      </div>
    </Modal>
  )
}

export default injectIntl(ModalDelete)
