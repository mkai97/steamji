const { WALLET_CONTENT_TYPE, BOT_CONTENT_TYPE } = require("../../../constants/contentType");
const { isTimeExpire } = require("../../../utils");

module.exports = () => {
  return async (ctx, next) => {
    console.log("[CHECK VIP DEBUG]: Middleware started");
    try {
      // 检查用户信息
      if (!ctx.state.user || !ctx.state.user.id) {
        console.log("[CHECK VIP DEBUG]: No user found in context");
        ctx.body = {
          code: 401,
          message: '用户未认证',
        };
        return;
      }
      
      const uid = ctx.state.user.id;
      console.log("[CHECK VIP DEBUG]: User ID:", uid);
      
      // 检查钱包信息
      const wallet = await strapi.db.query(WALLET_CONTENT_TYPE).findOne({
        where: {
          users_permissions_user: uid,
        },
      });
      
      console.log("[CHECK VIP DEBUG]: Wallet found:", wallet ? 'yes' : 'no');
      
      // 如果没有钱包记录，允许通过（可能是新用户）
      if (!wallet) {
        console.log("[CHECK VIP DEBUG]: No wallet record, allowing access");
        await next();
        return;
      }
      
      console.log("[CHECK VIP DEBUG]: VIP expiration:", wallet.vip_expiration);
      const isExpire = isTimeExpire(wallet.vip_expiration);
      console.log("[CHECK VIP DEBUG]: Is VIP expired:", isExpire);
      
      if (isExpire) {
        console.log("[CHECK VIP DEBUG]: VIP expired, checking if bot operation");
        const url = ctx.request.url;
        // 只有特定的bot操作需要停止bot
        if (url.indexOf('pause') > -1 || url.indexOf('resume') > -1 || url.indexOf('stop') > -1) {
          console.log("[CHECK VIP DEBUG]: Stopping bot due to VIP expiration");
          await strapi.service(BOT_CONTENT_TYPE).stopBot(uid);
        }
        ctx.body = {
          code: 60001,
          message: 'VIP已过期, 请兑换VIP后再重新操作',
        };
        return;
      }
      
      console.log("[CHECK VIP DEBUG]: VIP check passed");
      await next();
    } catch (error) {
      console.error("[CHECK VIP DEBUG]: Error in middleware:", error);
      console.error("[CHECK VIP DEBUG]: Error stack:", error.stack);
      // 出错时允许通过，避免阻塞正常请求
      await next();
    }
  };
};
