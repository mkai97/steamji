# Steamji Docker 故障排除指南

## 常见问题及解决方案

### 1. Docker 未安装
**症状**：`docker: command not found`
**解决方案**：
- 参考 `install-docker.md` 安装 Docker Desktop
- 确保 Docker Desktop 正在运行

### 2. Strapi 数据库连接失败
**症状**：`The server does not support SSL connections`
**解决方案**：
- 确保数据库连接字符串包含 `?ssl=false` 参数
- 检查数据库配置是否正确

### 3. 端口冲突
**症状**：`Bind for 0.0.0.0:5432 failed: port is already allocated`
**解决方案**：
- 修改 `.env` 文件中的端口配置
- 或停止占用端口的其他服务

### 4. 镜像构建失败
**症状**：`npm install` 失败或依赖问题
**解决方案**：
```bash
# 清理缓存并重新构建
docker system prune
docker-compose build --no-cache
```

### 5. 服务启动后立即退出
**症状**：服务启动后状态为 `Exited`
**解决方案**：
```bash
# 查看详细日志
docker-compose logs strapi

# 检查环境变量配置
cat .env
```

### 6. 数据库连接超时
**症状**：`Connection timed out`
**解决方案**：
- 确保 PostgreSQL 容器已完全启动
- 检查健康检查配置
- 增加启动等待时间

### 7. 权限问题
**症状**：`Permission denied` 或文件访问错误
**解决方案**：
```bash
# 检查文件权限
ls -la

# 修复权限
chmod +x *.sh
```

## 调试步骤

### 1. 检查服务状态
```bash
docker-compose ps
docker-compose logs
```

### 2. 检查网络连接
```bash
docker network ls
docker network inspect steamji_network
```

### 3. 进入容器调试
```bash
docker-compose exec strapi sh
# 在容器内检查环境变量和配置文件
```

### 4. 验证数据库连接
```bash
docker-compose exec postgres psql -U steamji -d steamji
```

## 环境变量检查清单

确保 `.env` 文件中包含以下关键配置：
- `POSTGRES_PASSWORD`：数据库密码
- `APP_KEYS`：Strapi应用密钥（使用 `generate-secrets.sh` 生成）
- `ASF_IPC_PASSWORD`：ASF IPC密码

## 重置环境

如果问题无法解决，可以重置整个环境：
```bash
# 停止并删除所有容器和卷
docker-compose down -v

# 重新构建和启动
docker-compose up --build
```

## 获取帮助

如果以上方法都无法解决问题：
1. 查看详细错误日志：`docker-compose logs --tail=100`
2. 检查系统资源：`docker system df`
3. 验证Docker安装：`docker version`