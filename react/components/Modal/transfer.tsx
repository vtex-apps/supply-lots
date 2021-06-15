import React, { FC, SyntheticEvent, useContext} from "react"
import { Button, Modal } from "vtex.styleguide"
import IconTrashCan from "../../icons/IconTrashCan"
import WarehouseContext from "../Context/WarehouseContext"

const ModalTransfer: FC = () => {
    const provider = useContext(WarehouseContext)

    function closeModal(){
        provider.setTransfer(false)
    }

    const options = [
      { value: true, label: 'Sim' },
      { value: false, label: 'Não' },
    ]

    return (
        <Modal
          isOpen={provider.modalTransfer}
          responsiveFullScreen
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button variation="tertiary" onClick={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
                  Cancelar
                </Button>
              </span>
              <span>
                <Button variation="primary" onClick={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
                  Transferir
                </Button>
              </span>
            </div>
          }
          onClose={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
         <div className="flex flex-column items-center justify-center t-heading-5">
        <IconTrashCan />
        <div className="pv3 t-heading-4">
          Transferir estoque futuro
        </div>
        
          <div className="pv3 t-body c-muted-2">Tem certeza que deseja transferir esse estoque futuro?</div>
        
      </div>
        </Modal>
    )
  }


export default ModalTransfer



