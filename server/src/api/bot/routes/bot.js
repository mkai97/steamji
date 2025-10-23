'use strict';

/**
 * bot router
 */

module.exports = {
  prefix: '/bots',
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: 'bot.findBot',
      config: {
        auth: false, // 临时关闭认证进行测试
      }
    },
    {
      method: 'POST',
      path: '/',
      handler: 'bot.createOrUpdateBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
    {
      method: 'POST',
      path: '/stop',
      handler: 'bot.stopBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
    {
      method: 'POST',
      path: '/start',
      handler: 'bot.startBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
    {
      method: 'POST',
      path: '/pause',
      handler: 'bot.pauseBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
    {
      method: 'POST',
      path: '/resume',
      handler: 'bot.resumeBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
    {
      method: 'POST',
      path: '/input',
      handler: 'bot.inputBot',
      config: {
        middlewares: [
          'api::bot.check-vip'
        ],
      }
    },
  ],
};
