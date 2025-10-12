#!/bin/bash

# Steamji Docker Compose 数据备份脚本

set -e

echo "💾 备份 Steamji 系统数据..."

# 进入 docker 目录
cd "$(dirname "$0")"

# 创建备份目录
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📁 备份目录: $BACKUP_DIR"

# 备份 PostgreSQL 数据库
echo "🗄️  备份 PostgreSQL 数据库..."
docker-compose exec -T postgres pg_dump -U steamji steamji > "$BACKUP_DIR/database.sql"

# 备份 Strapi 上传文件
echo "📎 备份 Strapi 上传文件..."
docker-compose exec -T strapi tar -czf - /app/public/uploads > "$BACKUP_DIR/uploads.tar.gz" 2>/dev/null || true

# 备份 ASF 配置文件
echo "⚙️  备份 ASF 配置文件..."
docker-compose exec -T asf tar -czf - /app/config > "$BACKUP_DIR/asf-config.tar.gz" 2>/dev/null || true

# 创建备份信息文件
cat > "$BACKUP_DIR/backup.info" << EOF
备份时间: $(date)
服务版本:
- PostgreSQL: $(docker-compose exec -T postgres postgres --version 2>/dev/null | head -1 || echo "未知")
- Strapi: $(docker-compose exec -T strapi node --version 2>/dev/null || echo "未知")
- ASF: $(docker-compose exec -T asf dotnet --version 2>/dev/null || echo "未知")

备份内容:
- 数据库: database.sql
- 上传文件: uploads.tar.gz
- ASF配置: asf-config.tar.gz
EOF

echo ""
echo "✅ 备份完成！"
echo "📊 备份文件大小:"
du -h "$BACKUP_DIR"/*

echo ""
echo "📝 恢复说明:"
echo "   1. 停止服务: ./stop.sh"
echo "   2. 恢复数据库: docker-compose exec -T postgres psql -U steamji steamji < database.sql"
echo "   3. 恢复文件: tar -xzf uploads.tar.gz -C /"
echo "   4. 启动服务: ./start.sh"