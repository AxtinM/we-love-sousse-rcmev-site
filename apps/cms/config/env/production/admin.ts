export default ({ env }) => ({
  url: 'https://cms.rcmev.com/admin',
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    cookie: {
      name: 'strapi-session',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      domain: 'cms.rcmev.com',
      path: '/',
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
