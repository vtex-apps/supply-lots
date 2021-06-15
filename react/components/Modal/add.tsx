import React, { FC, SyntheticEvent, useContext} from "react"
import { Provider } from "react-intl/src/components/injectIntl"
import { Button, DatePicker, Dropdown, Input, Modal } from "vtex.styleguide"
import WarehouseContext from "../Context/WarehouseContext"

const ModalAdd: FC = () => {
    const provider = useContext(WarehouseContext)

    function closeModal(){
        provider.setModal(0)
    }

    const options = [
      { value: true, label: 'Sim' },
      { value: false, label: 'Não' },
    ]

    return (
        <Modal
          isOpen={provider.modal}
          title={provider.modal === 1 ? "Adicionar estoque futuro" : 'Editar estoque Futuro'}
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
                  {provider.modal === 1 ? "Adicionar" : "Editar"}
                </Button>
              </span>
            </div>
          }
          onClose={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
          <div>
            <div>
              <div className="w-100 mv6">
                <DatePicker
                      label="Data de chegada"
                      size="regular"
                      value = {provider.date}
                      placeholder='Adicionar a data da chegada do estoque futuro'
                      onChange={(date: Date) => provider.setDate(date)}
                      locale="pt-BR"
                    />
              </div>
              <div className="w-100 mv6">
                <Input 
                    placeholder="Total de itens no lote" 
                    size="large"
                    label="Total dos lotes"
                    onChange={(value: number) => { provider.setItems(value)}}
                    value={provider.items} 
                />
              </div>
              <div className="w-100 mv6">
                <Dropdown
                    label='Permanecer vendendo' 
                    placeholder='O produto deve ser vendido mesmo se a data de chegada já tiver passado?'
                    options={options}
                    value={provider.keep} 
                    onChange={(_:any, v:string) => {provider.setKeep( v === 'true' ? true : false )}}
                />
              </div>
            </div>
          </div>
        </Modal>
    )
  }


export default ModalAdd



