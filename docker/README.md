# Steamji Docker 部署指南

## 项目结构

```
steamji/
├── docker/                    # Docker 部署文件
│   ├── docker-compose.yaml    # 服务编排配置
│   ├── Dockerfile.strapi      # Strapi 镜像构建文件
│   ├── .env.example          # 环境变量示例
│   ├── start.sh              # 一键启动脚本
│   ├── init-scripts/          # 初始化脚本
│   └── asf-config/           # ASF 配置文件目录
├── miniapp/                   # 小程序前端
├── server/                    # Strapi 后端
└── figma/                     # 设计资源
```

## 快速开始

### 1. 环境准备
确保系统已安装：
- Docker 20.10+
- Docker Compose 2.0+

### 2. 配置环境变量
```bash
cd docker
cp .env.example .env
# 编辑 .env 文件，配置您的环境变量
```

### 3. 一键启动
```bash
chmod +x start.sh
./start.sh
```

### 4. 访问服务
- **Strapi 管理后台**: http://localhost:1337/admin
- **ASF 控制面板**: http://localhost:2222
- **数据库**: localhost:5432

## 服务架构

### 容器服务
1. **postgres**: PostgreSQL 14 数据库
2. **strapi**: Strapi 4.3.8 API 服务
3. **asf**: ArchiSteamFarm 挂卡服务

### 网络配置
- 使用自定义桥接网络 `steamji_network`
- 服务间通过容器名进行通信

### 数据持久化
- **postgres_data**: 数据库数据
- **strapi_data**: Strapi 临时文件
- **asf_config**: ASF 配置文件

## 环境变量说明

### 数据库配置
```env
POSTGRES_DB=steamji
POSTGRES_USER=steamji
POSTGRES_PASSWORD=your_password
```

### Strapi 配置
```env
STRAPI_PORT=1337
APP_KEYS=your_keys
# ... 其他安全密钥
```

### ASF 配置
```env
ASF_PORT=2222
ASF_IPC_PASSWORD=your_password
```

## 管理命令

### 查看服务状态
```bash
docker-compose ps
```

### 查看日志
```bash
docker-compose logs -f strapi    # Strapi 日志
docker-compose logs -f asf       # ASF 日志
```

### 停止服务
```bash
docker-compose down
```

### 重启服务
```bash
docker-compose restart
```

### 更新服务
```bash
docker-compose pull
docker-compose up -d
```

## 故障排除

### 服务启动失败
1. 检查端口是否被占用
2. 查看详细日志：`docker-compose logs`
3. 验证环境变量配置

### 数据库连接问题
1. 检查 PostgreSQL 服务状态
2. 验证数据库连接字符串
3. 检查网络连接

### ASF 配置问题
1. 检查 ASF 配置文件权限
2. 验证 IPC 密码配置
3. 查看 ASF 日志输出

## 安全建议

1. **修改默认密码**: 所有环境变量中的默认值
2. **使用 HTTPS**: 生产环境建议配置 SSL
3. **防火墙配置**: 限制不必要的端口访问
4. **定期备份**: 重要数据定期备份

## 开发模式

如需开发模式，可修改 `docker-compose.yaml` 中的 Strapi 服务：

```yaml
strapi:
  command: npm run develop
  volumes:
    - ../server:/app
    - /app/node_modules
```

## 支持与贡献

如有问题请提交 Issue 或联系项目维护者。