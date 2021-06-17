import React, { FC, SyntheticEvent, useContext} from "react"
import { Button, DatePicker, Dropdown, Input, Modal } from "vtex.styleguide"
import WarehouseContext from "../Context/WarehouseContext"
import ModalLimit from "./limit"


const ModalAdd: FC = () => {
    const provider = useContext(WarehouseContext)

    function closeModal(){
        provider.setModal(0)
    }

    const options = [
      { value: true, label: 'Sim' },
      { value: false, label: 'Não' },
    ]

    var currentDate = new Date();
    var minDate = currentDate.setDate(currentDate.getDate() + 1);

    if(provider.limit) return (<ModalLimit></ModalLimit>)

    return (
        <Modal
          isOpen={provider.modal}
          title={provider.modal === 1 ? "Adicionar estoque futuro" : 'Editar estoque futuro'}
          responsiveFullScreen
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button variation="tertiary" onClick={(e: SyntheticEvent) => { e.preventDefault; closeModal()}}>
                  Cancelar
                </Button>
              </span>
              <span>
                <Button variation="primary" onClick={(e: SyntheticEvent) => { 
                  e.preventDefault; 
                  if(provider.modal === 1) provider.addSupplyLot()
                  else provider.editSupplyLot()
                  }}>
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
                      value = {provider.date ? provider.date : undefined}
                      placeholder='Adicionar a data da chegada do estoque futuro'
                      onChange={(date: Date) => provider.setDate(date)}
                      locale="pt-BR"
                      minDate={minDate}
                    />
              </div>
              <div className="w-100 mv6">
                <Input 
                    placeholder="Total de itens no lote" 
                    size="large"
                    label="Total dos lotes"
                    type="number"
                    min='0'
                    onChange={(e: any) => {provider.updateItems(parseInt(e.target.value))}}
                    value={provider.items?.toString() ? provider.items?.toString() : undefined}
                />
              </div>
              <div className="w-100 mv6">
                <Dropdown
                    label='Permanecer vendendo' 
                    placeholder='O produto deve ser vendido mesmo se a data de chegada já tiver passado?'
                    options={options}
                    value={provider.keep ? provider.keep : undefined} 
                    onChange={(_:any, v:string) => {provider.setKeep( v === 'true' ? true : false )}}

                />
              </div>
              <p className="mt2" style={{ color: 'red', fontSize: '12px' }}>{provider.text}</p>
            </div>
          </div>
        </Modal>
    )
  }


export default ModalAdd



