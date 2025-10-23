#!/bin/bash

# 创建日志目录
mkdir -p logs

# 启动 Docker 服务（数据库和 ASF）
echo "正在启动 Docker 服务..."
docker-compose up -d postgres asf

# 等待数据库服务启动
echo "等待数据库服务启动..."
sleep 15

# 检查数据库连接（使用更通用的方法）
echo "检查数据库连接..."
until docker exec steamji_postgres pg_isready -U steamji -d steamji; do
    echo "等待数据库连接..."
    sleep 3
done

# 启动 Strapi 服务（使用 PM2）
echo "正在启动 Strapi 服务..."
pm2 start ecosystem.config.js

# 显示服务状态
echo "服务启动完成！"
echo "=================="
echo "服务状态："
echo "- PostgreSQL: 运行在 localhost:5432"
echo "- Strapi: 运行在 localhost:1337"
echo "- ASF: 运行在 localhost:1242"
echo "=================="
echo "PM2 状态："
pm2 status

echo "Docker 服务状态："
docker-compose ps