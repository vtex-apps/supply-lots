import type { SyntheticEvent, FC } from 'react'
import React, { useContext } from 'react'
import { Button, Card, Divider, Input } from 'vtex.styleguide'

import WarehouseContext from '../Context/WarehouseContext'

const HomePage: FC = () => {
  const provider = useContext(WarehouseContext)

  return (
    <div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
      <Card>
        <div className="flex">
          <div className="w-40">
            <h2 className="mt0 mb6">SKU</h2>
            <Input
              placeholder="Insira o número do SKU"
              value={provider.sku.id}
              onChange={(event: { target: { value: string } }) => {
                provider.updateSku({ id: event.target.value })
              }}
            />
          </div>
          <div
            style={{ flexGrow: 1 }}
            className="flex items-stretch w-20 justify-center"
          >
            <Divider orientation="vertical" />
          </div>
          <div className="w-40">
            <h2 className="mt0 mb6">Estoque</h2>
            <Input
              placeholder="Insira o ID do Estoque"
              value={provider.warehouse.id}
              onChange={(event: { target: { value: string } }) => {
                provider.updateWarehouse({ id: event.target.value })
              }}
            />
          </div>

          <div className="mt10">
            <Button
              size="small"
              collapseRight
              onClick={(event: SyntheticEvent) => provider.checkValues(event)}
            >
              Submeter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HomePage
