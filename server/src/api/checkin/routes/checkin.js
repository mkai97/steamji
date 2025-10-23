'use strict';

module.exports = {
  prefix: '/checkins',
  routes: [
    {
      method: 'GET',
      path: '/:name',
      handler: 'checkin.findOne',
      config: {
        auth: false, // 允许公开访问签到信息
      },
    },
    {
      method: 'POST',
      path: '/',
      handler: 'checkin.checkin',
      config: {
        auth: false, // 允许公开签到
      },
    },
  ],
};
