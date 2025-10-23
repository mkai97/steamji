'use strict';

const { VIP_CONTENT_TYPE } = require('../../../constants/contentType');

/**
 * vip controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vip.vip', {
  async find(ctx) {
    try {
      console.log('VIP find controller called');
      const vipCards = await strapi.entityService.findMany(VIP_CONTENT_TYPE);
      return {
        code: 10000,
        data: vipCards,
      };
    } catch (error) {
      console.error('VIP find error:', error);
      return {
        code: 50000,
        message: '获取VIP信息失败',
        error: error.message,
      };
    }
  },

  async exchange(ctx) {
    const uid = ctx.state.user.id;
    const { id } = ctx.request.body;
    console.log('exchange id:', id);
    ctx.body = await strapi.service(VIP_CONTENT_TYPE).exchange(uid, id);
  },
});
