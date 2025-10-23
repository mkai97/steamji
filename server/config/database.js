// const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  // 构建时使用默认配置，运行时使用环境变量
  let connectionConfig;
  
  if (process.env.DATABASE_URL) {
    // 运行时：使用环境变量
    const { host, port, database, user, password } = parse(process.env.DATABASE_URL);
    connectionConfig = {
      host,
      port,
      database,
      user,
      password,
    };
  } else {
    // 构建时：使用默认配置或env参数
    connectionConfig = {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'steamji'),
      user: env('DATABASE_USERNAME', 'steamji'),
      password: env('DATABASE_PASSWORD', '123456'),
    };
  }

  return {
    connection: {
      client: 'postgres',
      connection: connectionConfig,
      debug: false,
    },
  };
};
