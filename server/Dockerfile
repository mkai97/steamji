FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制应用代码
COPY . .

# 设置构建时的环境变量
ENV DATABASE_HOST=localhost
ENV DATABASE_PORT=5432
ENV DATABASE_NAME=steamji
ENV DATABASE_USERNAME=steamji
ENV DATABASE_PASSWORD=123456

# 构建 Strapi 应用
RUN npm run build

# 暴露端口
EXPOSE 1337

# 启动命令
CMD ["npm", "start"]