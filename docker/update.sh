#!/bin/bash

# Steamji Docker Compose 更新脚本

set -e

echo "🔄 更新 Steamji 云挂卡系统..."

# 进入 docker 目录
cd "$(dirname "$0")"

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "❌ 未找到 .env 文件，请先运行 ./start.sh 进行初始化"
    exit 1
fi

# 停止当前服务
echo "⏹️  停止当前服务..."
docker-compose down

# 拉取最新镜像
echo "📥 拉取最新镜像..."
docker-compose pull

# 重新启动服务
echo "🚀 启动更新后的服务..."
docker-compose up -d

echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

echo ""
echo "✅ Steamji 系统更新完成！"
echo ""
echo "📊 服务访问地址："
echo "   - Strapi 管理后台: http://localhost:${STRAPI_PORT:-1337}/admin"
echo "   - ASF 控制面板: http://localhost:${ASF_PORT:-2222}"
echo ""
echo "📝 使用以下命令查看日志："
echo "   - Strapi 日志: docker-compose logs -f strapi"
echo "   - ASF 日志: docker-compose logs -f asf"