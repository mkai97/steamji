#!/bin/bash

# Steamji Docker Compose 停止脚本

set -e

echo "🛑 停止 Steamji 云挂卡系统..."

# 进入 docker 目录
cd "$(dirname "$0")"

# 停止服务
docker-compose down

echo "✅ Steamji 系统已停止"

# 可选：清理数据（谨慎使用）
if [ "$1" = "--clean" ]; then
    echo "🧹 清理数据卷..."
    docker volume rm steamji_postgres_data 2>/dev/null || true
    docker volume rm steamji_strapi_data 2>/dev/null || true
    docker volume rm steamji_strapi_uploads 2>/dev/null || true
    docker volume rm steamji_asf_config 2>/dev/null || true
    echo "✅ 数据卷已清理"
fi