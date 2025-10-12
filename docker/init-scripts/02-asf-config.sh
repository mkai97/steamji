#!/bin/bash
# ASF 配置文件初始化脚本

echo "正在初始化 ASF 配置文件..."

# 复制默认配置文件到 ASF 配置目录
cp /tmp/asf-config/* /app/config/ 2>/dev/null || true

# 设置正确的文件权限
chmod 644 /app/config/*.json 2>/dev/null || true

echo "ASF 配置文件初始化完成"