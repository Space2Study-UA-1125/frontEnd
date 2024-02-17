import { render, screen } from '@testing-library/react'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

describe('InputWithIcon component', () => {
    const propsWithValue = {
        startIcon: <div data-testid='startIcon' />,
        value: 'value'
    }

    const propsWithoutValue = {
        startIcon: <div data-testid='startIcon' />,
        value: ''
    }

    it('renders container', () => {
        render(<InputWithIcon {...propsWithValue} />)
        const inputWithIconContainer = screen.getByTestId('inputWithIconContainer')
        expect(inputWithIconContainer).toBeInTheDocument()
    })

    it('renders start icon that is passed in props', () => {
        render(<InputWithIcon {...propsWithValue} />)
        const startIcon = screen.getByTestId('startIcon')
        expect(startIcon).toBeInTheDocument()
    })

    it('renders inputBase', () => {
        render(<InputWithIcon {...propsWithValue} />)
        const inputBase = screen.getByRole('textbox')
        expect(inputBase).toBeInTheDocument()
    })

    it('renders clear icon when input value is not empty', () => {
        render(<InputWithIcon {...propsWithValue} />)
        const clearIcon = screen.getByTestId('clearIcon')
        expect(clearIcon).toBeInTheDocument()
    })

    it('does not render clear icon when input value is empty', () => {
        render(<InputWithIcon {...propsWithoutValue} />)
        const clearIcon = screen.queryByTestId('clearIcon')
        expect(clearIcon).not.toBeInTheDocument()
    })
})