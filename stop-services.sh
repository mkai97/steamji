#!/bin/bash

# 停止 PM2 服务
echo "正在停止 Strapi 服务..."
pm2 stop ecosystem.config.js

# 停止 Docker 服务
echo "正在停止 Docker 服务..."
docker-compose down

echo "所有服务已停止！"