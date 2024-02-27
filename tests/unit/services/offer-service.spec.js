import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { offerService } from '~/services/offer-service'

const offersDataMock = [
  {
    _id: '63ebc6fbd2f34037d0aba791',
    price: 111,
    proficiencyLevel: ['Beginner'],
    title: 'this is a new title for test purposes'
  },
  {
    _id: '63ebc6fbd2f34037d0aba792',
    price: 300,
    proficiencyLevel: ['Intermediate', 'Advanced'],
    title: 'this is a new title for test purposes'
  }
]

describe('offerService tests', () => {
  it('should return offers', async () => {
    mockAxiosClient.onGet(URLs.offers.get).reply(200, offersDataMock)

    const result = await offerService.getOffers()

    expect(result.data).toEqual(offersDataMock)
  })

  it('should return offer by id', async () => {
    const offerId = '63ebc6fbd2f34037d0aba791'
    const offerByIdDataMock = offersDataMock.filter(
      ({ _id }) => _id === offerId
    )

    mockAxiosClient
      .onGet(`${URLs.offers.get}/${offerId}`)
      .reply(200, offerByIdDataMock)

    const result = await offerService.getOfferById(offerId)

    expect(result.data).toEqual(offerByIdDataMock)
  })

  it('should create offer', async () => {
    const offerData = {
      _id: '63ebc6fbd2f34037d0aba773',
      price: 999,
      title: 'Test offer'
    }

    mockAxiosClient.onPost(URLs.offers.create).reply(201, offerData)

    const result = await offerService.createOffer(offerData)

    expect(result.data).toEqual(offerData)
  })

  it('should update offer', async () => {
    const offerId = '63ebc6fbd2f34037d0aba791'
    const updatedOfferData = {
      title: 'Updated test offer'
    }

    mockAxiosClient
      .onPatch(`${URLs.offers.get}/${offerId}`)
      .reply(200, updatedOfferData)

    const result = await offerService.updateOffer(offerId, updatedOfferData)

    expect(result.data).toEqual(updatedOfferData)
  })

  it('should delete offer', async () => {
    const offerId = '63ebc6fbd2f34037d0aba791'

    mockAxiosClient.onDelete(`${URLs.offers.get}/${offerId}`).reply(204)

    const result = await offerService.deleteOffer(offerId)

    expect(result.status).toEqual(204)
  })
})
