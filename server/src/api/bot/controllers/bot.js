'use strict';
const { BOT_CONTENT_TYPE } = require("../../../constants/contentType");

/**
 * bot controller
 */

module.exports = {
  async createOrUpdateBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).createOrUpdateBot(uid, ctx.request.body);
  },
  async findBot(ctx) {
    try {
      console.log('[BOT CONTROLLER DEBUG]: findBot called');
      const uid = ctx.state.user.id;
      console.log('[BOT CONTROLLER DEBUG]: User ID:', uid);
      
      const result = await strapi.service(BOT_CONTENT_TYPE).findBot(uid);
      console.log('[BOT CONTROLLER DEBUG]: Service result:', JSON.stringify(result, null, 2));
      
      // 处理服务层返回的错误码
      if (result.code && result.code !== 10000) {
        console.log('[BOT CONTROLLER DEBUG]: Error code detected:', result.code);
        if (result.code === 20002) {
          // bot不存在，返回404
          return ctx.notFound(result.message || "Bot not found");
        } else {
          // 其他错误，返回500
          return ctx.internalServerError(result.message || "Internal Server Error");
        }
      }
      
      // 正常返回数据
      console.log('[BOT CONTROLLER DEBUG]: Returning success response');
      ctx.body = result;
    } catch (error) {
      console.error('[BOT CONTROLLER DEBUG]: Error in findBot controller:', error);
      console.error('[BOT CONTROLLER DEBUG]: Error stack:', error.stack);
      return ctx.internalServerError("Internal Server Error");
    }
  },
  async stopBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).stopBot(uid);
  },
  async startBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).startBot(uid);
  },
  async pauseBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).pauseBot(uid);
  },
  async resumeBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).resumeBot(uid);
  },
  async inputBot(ctx) {
    const uid = ctx.state.user.id;
    ctx.body = await strapi.service(BOT_CONTENT_TYPE).inputBot(uid, ctx.request.body);
  },
};
