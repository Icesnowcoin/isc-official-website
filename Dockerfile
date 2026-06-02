# ISC 官网 Docker 构建文件 - 单阶段构建
FROM node:22-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package 文件
COPY package.json pnpm-lock.yaml* .pnpmrc* ./
COPY patches ./patches

# 安装所有依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用（前端输出到 dist/public，后端输出到 dist/index.js）
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# 启动应用
CMD ["node", "dist/index.js"]
