export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  offersCategoryName: {
    route: 'categories/:categoryName/:offers',
    path: '/categories'
  },
  chat: { route: 'chat', path: '/chat' },
  userProfile: { route: 'user/:id', path: '/user' },
  findOffers: {
    route: 'categories/offers',
    path: '/categories/offers'
  },
  offerDetails: { route: 'offer-details/:id', path: '/offer-details' },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/my-profile' },
    myCooperations: {
      route: 'my-cooperations',
      path: '/my-cooperations'
    },
    myOffers: {
      route: 'my-offers',
      path: '/my-offers'
    },
    logout: { route: 'logout', path: '/logout' }
  },
  editProfile: {
    route: 'my-profile/edit',
    path: '/my-profile/edit'
  }
}
