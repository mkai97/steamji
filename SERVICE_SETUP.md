# Steamji 服务启动配置

本项目采用混合部署方式：
- **Strapi**: 使用 PM2 在本地运行（便于开发和调试）
- **PostgreSQL**: 使用 Docker 容器运行
- **ASF**: 使用 Docker 容器运行

## 环境要求

- Node.js (>=14.19.1 <=16.x.x)
- Docker & Docker Compose
- PM2 (已自动安装)

## 快速启动

### 1. 启动所有服务
```bash
./start-services.sh
```

### 2. 停止所有服务
```bash
./stop-services.sh
```

### 3. 重启所有服务
```bash
./restart-services.sh
```

## 服务详情

### Strapi 服务 (PM2)
- **端口**: 1337
- **启动方式**: PM2 进程管理
- **日志位置**: `./logs/` 目录
- **环境变量**: 从 `server/.env` 读取

### PostgreSQL 服务 (Docker)
- **端口**: 5432
- **数据库**: steamji
- **用户名**: steamji
- **密码**: 123456

### ASF 服务 (Docker)
- **端口**: 1242
- **IPC 密码**: rjeaoirtbafaa90a2-57af-ax-1.4

## 管理命令

### PM2 管理
```bash
# 查看服务状态
pm2 status

# 查看 Strapi 日志
pm2 logs steamji-strapi

# 重启 Strapi 服务
pm2 restart steamji-strapi

# 停止 Strapi 服务
pm2 stop steamji-strapi

# 删除 Strapi 服务
pm2 delete steamji-strapi
```

### Docker 管理
```bash
# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs postgres
docker-compose logs asf

# 重启特定服务
docker-compose restart postgres
docker-compose restart asf
```

## 环境变量配置

所有服务都使用 `server/.env` 文件中的环境变量配置。

## 故障排除

1. **端口冲突**: 检查 1337、5432、1242 端口是否被占用
2. **数据库连接失败**: 确保 PostgreSQL 容器已启动并运行正常
3. **PM2 服务无法启动**: 检查 Node.js 版本和依赖包是否安装正确

## 开发说明

- Strapi 运行在开发模式，支持热重载
- 数据库和 ASF 使用容器化部署，确保环境一致性
- 所有服务都使用相同的环境变量配置，便于管理