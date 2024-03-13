import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import { StepProvider } from '~/context/step-context'
import {
  dragStyles,
  dragStylesWithBorder
} from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.styles'

const file = new File(
  [new Blob([`data:image/jpeg;base64,/9j/`])],
  'example.jpg',
  { type: 'image/jpeg' }
)
const failFileResponse = {
  files: [file],
  error: ''
}

vi.mock('~/context/step-context', () => ({
  useStepContext: () => {
    const [stepData, setStepData] = useState({ photo: '' })
    const [photoName, setPhotoName] = useState(null)
    return {
      handleStepData: vi.fn((_, newValue) => {
        setStepData({ photo: newValue })
      }),
      handlePhotoName: vi.fn((_, fileName) => {
        setPhotoName(fileName)
      }),
      stepData,
      photoName
    }
  },
  StepProvider: vi.fn(({ children }) => <div>{children}</div>)
}))

const failFileResponseWithError = {
  error: 'testError'
}
const props = {
  btnsBox: <div>Stepper buttons</div>,
  stepLabel: 'photo'
}

vi.mock('~/hooks/use-file-uploading', () => {
  return {
    default: () => {
      const sendFile = async () => {
        return 'mockedImageUrl'
      }

      return { sendFile }
    }
  }
})

vi.mock('@mui/material', () => ({
  Box: vi.fn(({ children }) => <div data-testid='boxMui'>{children}</div>),
  Typography: vi.fn(({ children }) => (
    <div data-testid='typographyMui'>{children}</div>
  )),
  Button: vi.fn(({ children, onClick }) => (
    <button data-testid='buttonMui' onClick={onClick}>
      {children}
    </button>
  ))
}))

vi.mock('~/components/file-uploader/FileUploader', () => {
  return {
    default: function ({ children, emitter, initialError }) {
      return (
        <div data-testid='file-uploader'>
          <button onClick={() => emitter(failFileResponse)}>
            Simulate file upload
          </button>
          <button onClick={() => emitter(failFileResponseWithError)}>
            Simulate file error
          </button>
          {initialError ? <div>error message</div> : null}
          {children}
        </div>
      )
    }
  }
})

vi.mock('~/components/drag-and-drop/DragAndDrop', () => {
  return {
    default: function ({ children, style }) {
      return (
        <div data-testid='drag-and-drop' style={style.root}>
          {children}
        </div>
      )
    }
  }
})

describe('AddPhotoStep component', () => {
  beforeEach(() => {
    render(
      <StepProvider>
        <AddPhotoStep {...props} />
      </StepProvider>
    )
  })

  it('renders container with the buttons passed in props', () => {
    const stepperButtons = screen.getByText('Stepper buttons')
    expect(stepperButtons).toBeInTheDocument()
  })

  it('should display border in dragndrop dropzone', () => {
    const dragNDrop = screen.getByTestId('drag-and-drop')
    expect(dragNDrop).toHaveStyle(dragStylesWithBorder.root)
  })

  it('should display border in dragndrop dropzone', () => {
    const dragNDrop = screen.getByTestId('drag-and-drop')
    expect(dragNDrop).toHaveStyle(dragStylesWithBorder.root)
  })

  it('should display an error if the file does not pass validation', () => {
    const simulateErrorButton = screen.getByText('Simulate file error')
    userEvent.click(simulateErrorButton)

    const textError = screen.getByText('error message')
    expect(textError).toBeInTheDocument()
  })

  describe('when the image is loaded', () => {
    beforeEach(() => {
      const simulateImageUpload = screen.getByText('Simulate file upload')
      userEvent.click(simulateImageUpload)
    })

    afterEach(() => {
      const clearButton = screen.getByTestId('buttonMui')
      userEvent.click(clearButton)
    })

    it('should display the image', () => {
      const uploadedImage = screen.getByAltText('becomeTutor.photo.imageAlt')
      expect(uploadedImage).toBeInTheDocument()
    })

    it('should not display border in dragndrop dropzone', () => {
      const dragNDrop = screen.getByTestId('drag-and-drop')
      expect(dragNDrop).toHaveStyle(dragStyles.root)
    })
  })
})
