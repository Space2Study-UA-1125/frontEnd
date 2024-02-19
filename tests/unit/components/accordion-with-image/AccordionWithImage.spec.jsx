import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import MapLogo from '~/assets/img/guest-home-page/map.svg'

vi.mock('~/components/accordion/Accordions', () => ({
  __esModule: true,
  default: function ({ items, activeIndex, onChange }) {
    return (
      <div>
        {items.map((item, index) => (
          <button key={index} onClick={() => onChange(index)}>
            {item.title}
          </button>
        ))}
        <div>{items[activeIndex].description}</div>
      </div>
    )
  }
}))

describe('AccordionWithImage test', () => {
  const items = [
    { title: 'Title 1', description: 'Description 1', image: MapLogo },
    { title: 'Title 2', description: 'Description 2', image: MapLogo }
  ]

  it('should not render Description 2 before click', () => {
    const { queryByText } = render(<AccordionWithImage items={items} />)
    expect(queryByText('Description 2')).not.toBeInTheDocument()
  })

  it('should open content on title click', () => {
    const { getByText, queryByText } = render(
      <AccordionWithImage items={items} />
    )

    fireEvent.click(getByText('Title 2'))
    expect(getByText('Description 2')).toBeInTheDocument()
    expect(queryByText('Description 1')).not.toBeInTheDocument()
  })
})
