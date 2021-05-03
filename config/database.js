module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'development') {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client:  env('CLIENT', 'mysql'),
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 3306),
            database: env('DATABASE_NAME', ''),
            username: env('DATABASE_USERNAME', ''),
            password: env('DATABASE_PASSWORD', ''),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  } 
  if (env('NODE_ENV') === 'production') {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'mysql',
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('PROD_DATABASE_PORT', 3306),
            database: env('PROD_DATABASE_NAME', ''),
            username: env('PROD_DATABASE_USERNAME', ''),
            password: env('PROD_DATABASE_PASSWORD', ''),
            ssl: env.bool('PROD_DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  }
};
