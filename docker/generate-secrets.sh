#!/bin/bash

# Steamji 安全密钥生成脚本

set -e

echo "🔐 生成 Steamji 安全密钥..."

# 检查是否安装了 openssl
if ! command -v openssl &> /dev/null; then
    echo "❌ openssl 未安装，无法生成安全密钥"
    exit 1
fi

echo ""
echo "📋 生成的安全密钥："
echo ""

# 生成 APP_KEYS (4个32字节的base64密钥)
echo "APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"

# 生成 API_TOKEN_SALT
echo "API_TOKEN_SALT=$(openssl rand -base64 32)"

# 生成 ADMIN_JWT_SECRET
echo "ADMIN_JWT_SECRET=$(openssl rand -base64 32)"

# 生成 JWT_SECRET
echo "JWT_SECRET=$(openssl rand -base64 32)"

# 生成 AES_KEY
echo "AES_KEY=$(openssl rand -base64 32)"

# 生成 ASF_IPC_PASSWORD (随机密码)
echo "ASF_IPC_PASSWORD=$(openssl rand -base64 24 | tr -d '/+' | cut -c1-20)"

echo ""
echo "📝 使用方法："
echo "1. 复制上面的密钥到 .env 文件中"
echo "2. 替换原有的示例密钥"
echo "3. 确保妥善保管这些密钥"
echo ""
echo "⚠️  安全提示："
echo "- 这些密钥一旦生成，不要随意更改"
echo "- 生产环境必须使用强随机密钥"
echo "- 定期备份 .env 文件"