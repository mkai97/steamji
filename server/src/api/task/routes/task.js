module.exports = {
  prefix: '/tasks',
  routes: [
    {
     method: 'POST',
     path: '/finish/share',
     handler: 'task.finishShareTask',
     config: {
        auth: false, // 允许公开完成任务
     },
    },
  ],
};
