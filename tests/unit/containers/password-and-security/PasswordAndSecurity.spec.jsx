import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import PasswordAndSecurity from '~/containers/password-and-security/PasswordAndSecurity'

vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockReturnValue({ userId: 'mockUserId' })
}))

vi.mock('~/services/user-service', () => ({
  updateUser: vi.fn()
}))

vi.mock('~/hooks/use-axios', () => ({
  __esModule: true,
  default: vi.fn(({ service, onResponseError }) => ({
    fetchData: vi.fn(async (newPassword) => {
      try {
        const response = await service(newPassword)
        return response
      } catch (error) {
        onResponseError(error)
        throw error
      }
    }),
    fetchOnMount: false,
    defaultResponse: null
  }))
}))

vi.mock('~/hooks/use-form', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    handleSubmit: vi.fn(),
    handleInputChange: vi.fn(),
    data: {},
    errors: {}
  }))
}))

vi.mock('~/hooks/use-input-visibility', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    inputVisibility: {},
    showInputText: vi.fn()
  }))
}))

vi.mock('~/components/app-card/AppCard', () => ({
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: vi.fn(({ title, description }) => (
    <div>
      <h5>{title}</h5>
      <span>{description}</span>
    </div>
  ))
}))

vi.mock('@mui/material/Box', () => ({
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('@mui/material/Typography', () => ({
  default: vi.fn(({ children }) => <span>{children}</span>)
}))

vi.mock('~/components/app-text-field/AppTextField', () => ({
  default: vi.fn(({ label }) => (
    <label>
      {label}
      <input />
    </label>
  ))
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: vi.fn(({ children }) => <button>{children}</button>)
}))

describe('PasswordAndSecurity container', () => {
  it('should render without errors', () => {
    render(<PasswordAndSecurity />)
  })

  it('should update password field value when input changes', () => {
    const { getByLabelText } = render(<PasswordAndSecurity />)
    const passwordInput = getByLabelText(
      'settingsPage.passwordAndSecurityBlock.labels.newPassword'
    )
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } })
    expect(passwordInput.value).toBe('newPassword123')
  })

  it('should update confirmPassword field value when input changes', () => {
    const { getByLabelText } = render(<PasswordAndSecurity />)
    const confirmPasswordInput = getByLabelText(
      'settingsPage.passwordAndSecurityBlock.labels.ReTypeNewPassword'
    )
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newPassword123' }
    })
    expect(confirmPasswordInput.value).toBe('newPassword123')
  })

  it('should call handleSubmit when the form is submitted with valid data', () => {
    const { getByText, getByLabelText } = render(<PasswordAndSecurity />)
    const saveButton = getByText(
      'settingsPage.passwordAndSecurityBlock.saveButton'
    )
    const passwordInput = getByLabelText(
      'settingsPage.passwordAndSecurityBlock.labels.newPassword'
    )
    const confirmPasswordInput = getByLabelText(
      'settingsPage.passwordAndSecurityBlock.labels.ReTypeNewPassword'
    )

    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'newPassword123' }
    })
    fireEvent.click(saveButton)
  })
})
