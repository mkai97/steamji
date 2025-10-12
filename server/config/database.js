// 使用 PostgreSQL 数据库配置
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'postgres'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'steamji'),
      user: env('DATABASE_USERNAME', 'steamji'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: false,
    },
    debug: false,
  },
});

// const parse = require("pg-connection-string").parse;
// const { host, port, database, user, password } = parse(
//   process.env.DATABASE_URL
// );
// const host = '192.168.1.143';
// const database = 'postgres';
// const user = 'postgres';
// const password = 'Z0kESoAryLok';
// const port = 5432;

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host,
//       port,
//       database,
//       user,
//       password,
//     },
//     debug: false,
//   },
// });
