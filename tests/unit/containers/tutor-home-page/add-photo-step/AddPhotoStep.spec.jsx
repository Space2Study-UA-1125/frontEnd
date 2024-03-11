import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import {
  dragStyles,
  dragStylesWithBorder
} from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.styles'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

const file = new File(
  [new Blob([`data:image/jpeg;base64,/9j/`])],
  'example.jpg',
  { type: 'image/jpeg' }
)
const failFileResponse = {
  files: [file],
  error: ''
}
const props = {
  btnsBox: <div>Stepper buttons</div>,
  onFileUpload: vi.fn()
}

vi.mock('~/hooks/use-file-reader', () => {
  let fileDataURL = null
  const readFileAsDataURL = vi.fn(() => {
    fileDataURL = 'testPath'
  })
  const resetFileDataURL = vi.fn(() => {
    fileDataURL = null
  })

  return {
    default: vi.fn(() => ({
      fileDataURL,
      readFileAsDataURL,
      resetFileDataURL
    }))
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
    default: function ({ children, emitter }) {
      return (
        <div data-testid='file-uploader'>
          <button onClick={() => emitter(failFileResponse)}>
            Simulate file upload
          </button>
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
    render(<AddPhotoStep {...props} />)
  })

  it('renders container with the buttons passed in props', () => {
    const stepperButtons = screen.getByText('Stepper buttons')
    expect(stepperButtons).toBeInTheDocument()
  })

  it('should display border in dragndrop dropzone', () => {
    const dragNDrop = screen.getByTestId('drag-and-drop')
    expect(dragNDrop).toHaveStyle(dragStylesWithBorder.root)
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

    it('calls the onFileupload function', () => {
      expect(props.onFileUpload).toHaveBeenCalled()
    })
  })

  describe('when you click the image cleanup button', () => {
    beforeEach(() => {
      const simulateImageUpload = screen.getByRole('button', {
        name: 'Simulate file upload'
      })
      userEvent.click(simulateImageUpload)
      const clearButton = screen.getByTestId('buttonMui')
      userEvent.click(clearButton)
    })

    it('should display the image', () => {
      const uploadedImage = screen.queryByAltText('becomeTutor.photo.imageAlt')
      expect(uploadedImage).not.toBeInTheDocument()
    })

    it('should display border in dragndrop dropzone', () => {
      const dragNDrop = screen.getByTestId('drag-and-drop')
      expect(dragNDrop).toHaveStyle(dragStylesWithBorder.root)
    })
  })
})
