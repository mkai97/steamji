#!/bin/bash

# Steamji Docker Compose 启动脚本

set -e

echo "🚀 启动 Steamji 云挂卡系统..."

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 进入 docker 目录
cd "$(dirname "$0")"

# 检查环境变量文件
if [ ! -f .env ]; then
    echo "⚠️  未找到 .env 文件，使用示例配置"
    cp .env.example .env
    echo "📝 请编辑 .env 文件配置您的环境变量"
    echo "   然后重新运行此脚本"
    exit 1
fi

# 加载环境变量
source .env

# 创建必要的目录
mkdir -p asf-config
mkdir -p config

# 初始化 ASF 配置文件
if [ ! -f asf-config/ASF.json ]; then
    echo "📋 初始化 ASF 配置文件..."
    cat > asf-config/ASF.json << EOF
{
  "CurrentCulture": "zh-CN",
  "IPCPassword": "${ASF_IPC_PASSWORD:-rjeaoirtbafaa90a2-57af-ax-1.3}"
}
EOF
fi

# 启动服务
echo "🔧 启动 Docker 服务..."
docker-compose up -d

echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

echo ""
echo "✅ Steamji 系统启动完成！"
echo ""
echo "📊 服务访问地址："
echo "   - Strapi 管理后台: http://localhost:${STRAPI_PORT:-1337}/admin"
echo "   - ASF 控制面板: http://localhost:${ASF_PORT:-2222}"
echo "   - 数据库: localhost:5432"
echo ""
echo "📝 使用以下命令管理服务："
echo "   - 查看日志: docker-compose logs -f"
echo "   - 停止服务: docker-compose down"
echo "   - 重启服务: docker-compose restart"