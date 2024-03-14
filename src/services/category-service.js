import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'

export const categoryService = {
  getCategories: (params) => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: () => {
    return axiosClient.get(URLs.categories.getNames)
  },
  getOffersByCategoryName: (categoryName, params) => {
    const category = createUrlPath(URLs.categories.get, categoryName)
    return axiosClient.get(`${category}${URLs.offers.get}`, { params })
  }
}
