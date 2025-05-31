module.exports = ({ env }) => ({
  // Enable i18n plugin for multilingual content
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'ar'],
    },
  },
  // GraphQL plugin for API queries
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  // Users & Permissions plugin
  'users-permissions': {
    enabled: true,
  },
});