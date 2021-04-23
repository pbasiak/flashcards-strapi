module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'development') {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'dbstrapi'),
            username: env('DATABASE_USERNAME', 'dbuser'),
            password: env('DATABASE_PASSWORD', 'test241'),
            ssl: env.bool('DATABASE_SSL', false),
          },
          options: {}
        },
      },
    }
  } else {
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
            ssl: env.bool('PROD_DATABASE_SSL', true),
          },
          options: {}
        },
      },
    }
  }
};
