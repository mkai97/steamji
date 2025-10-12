# Docker 环境安装指南

## 检测到系统未安装 Docker

### 在 macOS 上安装 Docker

**方法一：使用 Homebrew（推荐）**
```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Docker Desktop
brew install --cask docker

# 启动 Docker Desktop
open /Applications/Docker.app
```

**方法二：直接下载安装包**
1. 访问 https://www.docker.com/products/docker-desktop
2. 下载 Docker Desktop for Mac
3. 双击安装包进行安装
4. 启动 Docker Desktop

### 验证安装
```bash
docker --version
docker compose version
```

### 配置 Docker Compose
Docker Desktop 已经包含了 Docker Compose，无需额外安装。

### 启动 Steamji 项目
安装完成后，在 docker 目录下运行：
```bash
# 配置环境变量
cp .env.example .env
# 编辑 .env 文件配置参数

# 启动服务
./start.sh
```

### 常见问题解决

**1. 权限问题**
```bash
# 将用户添加到 docker 组
sudo dscl . append /Groups/docker GroupMembership $(whoami)
```

**2. 端口冲突**
如果端口被占用，修改 `.env` 文件中的端口配置：
```env
POSTGRES_EXTERNAL_PORT=5433
STRAPI_EXTERNAL_PORT=1338
ASF_EXTERNAL_PORT=2223
```

**3. 内存不足**
在 Docker Desktop 设置中增加内存分配（建议至少 4GB）