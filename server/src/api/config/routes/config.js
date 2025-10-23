'use strict';

/**
 * config router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::config.config', {
  config: {
    find: {
      auth: false, // 允许公开访问配置
    },
    findOne: {
      auth: false, // 允许公开访问单个配置
    }
  }
});
