#!/bin/bash

# 重启服务脚本
echo "正在重启服务..."

# 先停止服务
./stop-services.sh

# 等待一下
sleep 3

# 再启动服务
./start-services.sh