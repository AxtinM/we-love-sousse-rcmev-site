export default {
  routes: [
    {
      method: 'GET',
      path: '/announcements',
      handler: 'announcement.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/announcements/:id',
      handler: 'announcement.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
