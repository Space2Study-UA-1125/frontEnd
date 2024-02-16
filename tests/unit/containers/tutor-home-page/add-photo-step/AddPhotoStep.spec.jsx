import { render, screen } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

describe('AddPhotoStep component', () => {
    const prop = {
        btnsBox: <div data-testid='addPhotoStepBtn' />
    }

    beforeEach(() => {
        render(<AddPhotoStep {...prop} />)
    })

    it('renders container', () => {
        const addPhotoStepContainer = screen.getByTestId('AddPhotoStepContainer')
        expect(addPhotoStepContainer).toBeInTheDocument()
    })

    it('renders button that is passed in props', () => {
        const addPhotoStepBtn = screen.getByTestId('addPhotoStepBtn')
        expect(addPhotoStepBtn).toBeInTheDocument()
    })
})