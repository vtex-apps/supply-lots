import React, { FC, SyntheticEvent, useContext} from "react"
import { Button, Modal } from "vtex.styleguide"
import WarehouseContext from "../Context/WarehouseContext"

const ModalLimit: FC = () => {
    const provider = useContext(WarehouseContext)

    function closeModal(){
        provider.setModal(0)
    }


    return (
        <Modal
          isOpen={provider.modal}
          responsiveFullScreen
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button variation="tertiary" onClick={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
                  Cancelar
                </Button>
              </span>
            </div>
          }
          onClose={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
         <div className="flex flex-column items-center justify-center t-heading-5">
        <div className="pv3 t-heading-4">
          Só é possível adicionar até 10 estoque futuros
          </div>
        </div>
        </Modal>
    )
  }


export default ModalLimit



