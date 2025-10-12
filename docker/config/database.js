const { parse } = require('pg-connection-string');

module.exports = ({ env }) => {
  // 解析数据库连接字符串
  const connection = parse(env('DATABASE_URL'));
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: connection.host,
        port: connection.port,
        database: connection.database,
        user: connection.user,
        password: connection.password,
        ssl: env.bool('DATABASE_SSL', false),
      },
      debug: false,
    },
  };
};