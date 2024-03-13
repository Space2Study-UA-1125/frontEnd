import { renderWithProviders } from '~tests/test-utils'
import OfferCard from '~/components/offer-card/OfferCard'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLaptop: false
  })
}))

describe('OfferCard Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  const offer = {
    title: 'Test Offer',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      photo: 'path/to/photo.jpg',
      totalReviews: {
        student: 5,
        tutor: 10
      },
      averageRating: {
        student: 4,
        tutor: 5
      },
      professionalSummary: 'Professional summary text'
    },
    languages: ['English', 'French'],
    subject: {
      name: 'Mathematics'
    },
    proficiencyLevel: 'Intermediate',
    description: 'Offer description text',
    price: 20,
    authorRole: 'tutor'
  }

  it('renders offer card properly', () => {
    const { getByText } = renderWithProviders(<OfferCard offer={offer} />)
    expect(getByText('Test Offer')).toBeInTheDocument()
    expect(getByText('John D.')).toBeInTheDocument()
    expect(getByText('English, French')).toBeInTheDocument()
    expect(getByText('Offer description text')).toBeInTheDocument()
    expect(getByText('20 common.uah')).toBeInTheDocument()
  })

  it('displays mobile author name if on mobile', () => {
    useBreakpoints.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLaptop: false
    })
    const { getByText } = renderWithProviders(<OfferCard offer={offer} />)
    expect(getByText('John Doe')).toBeInTheDocument()
  })

  it('displays tablet author name if on tablet', () => {
    useBreakpoints.mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
      isLaptop: false
    })
    const { getByText } = renderWithProviders(<OfferCard offer={offer} />)
    expect(getByText('John Doe')).toBeInTheDocument()
  })
  it('truncates subject name to 15 characters and adds ellipsis if longer', () => {
    const longSubjectName = 'Very long subject name'
    offer.subject.name = longSubjectName
    const { getByText } = renderWithProviders(<OfferCard offer={offer} />)
    const truncatedSubject = getByText('Very long subje...')
    expect(truncatedSubject).toBeInTheDocument()
  })

  it('displays tutor rating if user is a tutor (desktop version)', () => {
    offer.authorRole = 'tutor'
    const { getByRole } = renderWithProviders(<OfferCard offer={offer} />)
    const rating = getByRole('img', { name: '5 Stars' })
    expect(rating).toBeInTheDocument()
  })

  it('displays student rating if user is a student (desktop version)', () => {
    offer.authorRole = 'student'
    const { getByRole } = renderWithProviders(<OfferCard offer={offer} />)
    const rating = getByRole('img', { name: '4 Stars' })
    expect(rating).toBeInTheDocument()
  })
  it('displays tutor rating if user is a tutor (mobile version)', () => {
    useBreakpoints.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLaptop: false
    })
    offer.authorRole = 'tutor'
    const { getByText } = renderWithProviders(<OfferCard offer={offer} />)
    const rating = getByText(offer.author.averageRating.tutor.toString())
    expect(rating).toBeInTheDocument()
  })

  it('displays student rating if user is a student (mobile version)', () => {
    useBreakpoints.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isLaptop: false
    })
    offer.authorRole = 'student'
    const { queryByText } = renderWithProviders(<OfferCard offer={offer} />)
    const rating = queryByText(offer.author.averageRating.student.toString())
    expect(rating).toBeInTheDocument()
  })
})
