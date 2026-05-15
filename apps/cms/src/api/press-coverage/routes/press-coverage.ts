import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::press-coverage.press-coverage', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
