import { render, screen } from '@testing-library/react'
import { it, vi } from 'vitest'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('@mui/material', () => ({
    Box: vi.fn(({ children }) => <div data-testid='addPhotoStepContainer'>{children}</div>)
}))

const prop = {
    btnsBox: <div data-testid='addPhotoStepBtns' />
}

beforeEach(() => {
    render(<AddPhotoStep {...prop} />)
})

describe('AddPhotoStep component', () => {
    it('renders container with the buttons passed in props', () => {
        const addPhotoStepBtns = screen.getByTestId('addPhotoStepBtns')
        expect(addPhotoStepBtns).toBeInTheDocument()
    })
})
