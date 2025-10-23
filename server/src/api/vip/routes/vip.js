'use strict';

/**
 * vip router
 */

module.exports = {
  prefix: '/vips',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: 'vip.find',
      config: {
        auth: false, // 允许公开访问 VIP 列表
      },
    },
    {
      method: 'POST',
      path: '/exchange',
      handler: 'vip.exchange',
      config: {
        auth: false, // 暂时关闭认证用于测试
      },
    },
  ],
};
