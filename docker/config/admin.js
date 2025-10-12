module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'your-secret-key'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});