'use strict';

module.exports = {
  prefix: '/logs',
  routes: [
    {
     method: 'GET',
     path: '/',
     handler: 'log.find',
     config: {
        auth: false, // 允许公开访问日志
     },
    },
    {
      method: 'POST',
      path: '/wechat',
      handler: 'log.wechat',
      config: {
        auth: false, // 允许公开提交微信日志
     },
    }
  ],
};
