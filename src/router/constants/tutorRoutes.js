import { authRoutes } from '~/router/constants/authRoutes'

export const tutorRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    findOffers: { route: 'findOffers', path: authRoutes.findOffers.path }
  }
}
