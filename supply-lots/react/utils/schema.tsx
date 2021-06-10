import React from 'react'
import {
  IconDelete,
  IconExternalLinkMini,
  IconEdit,
  Tag,
  ButtonWithIcon,
} from 'vtex.styleguide'

export const schemaTable = {
  properties: {
    index: {
      title: 'Indice',
    },
    name: {
      title: 'Nome',
    },
    date: {
      title: 'Data de chegada',
    },
    total: {
      title: 'Total dos lotes',
    },
    keepSelling: {
      title: 'Permanecer vendendo',
    },
    color: {
      title: 'Status',
      cellRenderer: ({ teste }: any) => {
        return (
          <Tag color="#fff">
            <span className="nowrap"> teste </span>
          </Tag>
        )
      },
    },
    actions: {
      title: 'Ações',
      cellRenderer: () => {
        return (
          <>
            <ButtonWithIcon
              icon={<IconEdit />}
              variation="tertiary"
            ></ButtonWithIcon>
            <ButtonWithIcon
              icon={<IconDelete />}
              variation="tertiary"
            ></ButtonWithIcon>
            <ButtonWithIcon
              icon={<IconExternalLinkMini />}
              variation="tertiary"
            ></ButtonWithIcon>
          </>
        )
      },
    },
  },
}
