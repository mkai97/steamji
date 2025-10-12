// 使用环境变量 DATABASE_URL 直接配置数据库
// Strapi会自动解析 DATABASE_URL 环境变量
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: false,
    },
    debug: false,
  },
});