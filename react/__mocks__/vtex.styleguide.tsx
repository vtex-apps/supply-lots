import React from 'react'

export const Table = ({
  items,
  schema,
  totalizer,
  sort,
}: {
  items: []
  schema: []
  totalizer: []
  sort: string
}) => {
  return (
    <div data-testid="container">
      {totalizer.map((element, index) => (
        <p className="totalizer" key={`totalizer${index}`}>
          {element}
        </p>
      ))}
      {schema.map((element, index) => (
        <div className="col" key={`col${index}`}>
          {element}
        </div>
      ))}
      {items.map((element, index) => (
        <div className="line" key={`line${index}`}>
          {element}
        </div>
      ))}

      <div data-testid="styleguide-table"> {sort} </div>
    </div>
  )
}

export const PageHeader = ({
  title,
  link,
}: {
  title: string
  link: string
}) => {
  return <div data-testid={link}> {`${title}`} </div>
}

export const PageBlock = () => {
  return <div data-testid="styleguide-pageblock"> PageBlock </div>
}

export const Modal = ({ title }: { title: string }) => {
  return <div data-testid="styleguide-modal"> {title} </div>
}

export const Dropdown = () => {
  return <div data-testid="styleguide-dropdown"> Dropdown </div>
}

export const DatePicker = () => {
  return <div data-testid="styleguide-datepicker"> DatePicker </div>
}

export const Button = () => {
  return <div data-testid="styleguide-button"> Button </div>
}

export const Input = () => {
  return <div data-testid="styleguide-input"> Input </div>
}
