// 直接配置数据库连接，禁用SSL
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