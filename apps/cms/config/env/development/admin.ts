export default ({ env }) => ({
  url: 'http://localhost:1337/admin',
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    cookie: {
      name: 'strapi-session',
      httpOnly: true,
      secure: false, // localhost doesn't use HTTPS
      sameSite: 'lax',
      domain: undefined, // No domain restriction for localhost
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
