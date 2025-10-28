# 环境变量配置模板

## .env.example (后端)

将此文件复制为 `.env` 并填入真实的值

```env
# ==========================================
# 讯飞星辰 API 配置
# ==========================================

# API 基础地址
XINGCHEN_API_URL=http://{本地 IP 地址}/workflow/v1/chat/completions

# API 认证信息（从讯飞星辰开源平台获取）
XINGCHEN_API_KEY=your_api_key_here
XINGCHEN_API_SECRET=your_api_secret_here

# ==========================================
# 工作流配置
# ==========================================

# 工作流1：课程大纲生成器
WORKFLOW_1_ID=your_workflow_1_id_here

# 工作流2：模块详细内容生成器
WORKFLOW_2_ID=your_workflow_2_id_here

# ==========================================
# 服务配置
# ==========================================

# 后端服务端口
BACKEND_PORT=8000

# CORS 允许的前端地址（多个用逗号分隔）
# 开发环境
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
# 生产环境示例
# CORS_ORIGINS=https://your-frontend.vercel.app

# ==========================================
# 可选配置
# ==========================================

# 日志级别 (DEBUG/INFO/WARNING/ERROR)
LOG_LEVEL=INFO

# 请求超时时间（秒）
REQUEST_TIMEOUT=120

# API 调用重试次数
MAX_RETRIES=2
```

---

## .env.local (前端)

将此文件复制为 `.env.local` 并填入真实的值

```env
# ==========================================
# 后端 API 配置
# ==========================================

# 开发环境
VITE_API_BASE_URL=http://localhost:8000

# 生产环境示例
# VITE_API_BASE_URL=https://your-backend.railway.app
```

---

## 配置说明

### 环境变量的优先级

1. **后端（Python）**
   - 使用 `python-dotenv` 加载 `.env` 文件
   - 系统环境变量优先级更高

2. **前端（Vite）**
   - 使用 `.env.local` 文件
   - 变量名必须以 `VITE_` 开头才能在代码中访问

---

## 安全注意事项

### ⚠️ 重要提醒

1. **永远不要提交 .env 文件到 Git**
   ```bash
   # .gitignore 中添加
   .env
   .env.local
   ```

2. **不要在前端代码中直接使用 API Key**
   - API Key 和 Secret 只能在后端使用
   - 前端只需要知道后端 API 地址

3. **生产环境使用环境变量**
   - Vercel/Netlify：在部署设置中配置
   - Docker：使用 `-e` 参数或 docker-compose
   - 云服务器：配置系统环境变量

---

## 配置检查清单

### 后端配置检查

```bash
# 1. 检查 .env 文件是否存在
ls -la backend/.env

# 2. 检查环境变量是否加载
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('XINGCHEN_API_KEY'))"

# 3. 启动服务测试
cd backend
uvicorn main:app --reload
```

### 前端配置检查

```bash
# 1. 检查 .env.local 文件
ls -la frontend/.env.local

# 2. 启动开发服务器
cd frontend
npm run dev

# 3. 在浏览器控制台检查
console.log(import.meta.env.VITE_API_BASE_URL)
```

---

## 常见问题

### Q1: 后端提示 "API Key not found"
**A:** 检查 `.env` 文件是否在正确的位置，变量名是否拼写正确

### Q2: 前端无法连接后端
**A:** 检查 `VITE_API_BASE_URL` 是否正确，后端是否已启动

### Q3: CORS 错误
**A:** 检查后端 `CORS_ORIGINS` 是否包含前端地址

### Q4: 工作流调用失败
**A:** 
- 检查 API Key 和 Secret 是否正确
- 检查工作流 ID 是否正确
- 检查工作流是否已发布

---

## 部署时的环境变量配置

### Vercel (前端)

```bash
# 在 Vercel 项目设置中添加
VITE_API_BASE_URL=https://your-backend.railway.app
```

### Railway/Render (后端)

```bash
# 在平台设置中添加所有后端环境变量
XINGCHEN_API_URL=...
XINGCHEN_API_KEY=...
XINGCHEN_API_SECRET=...
WORKFLOW_1_ID=...
WORKFLOW_2_ID=...
CORS_ORIGINS=https://your-frontend.vercel.app
```

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    environment:
      - XINGCHEN_API_KEY=${XINGCHEN_API_KEY}
      - XINGCHEN_API_SECRET=${XINGCHEN_API_SECRET}
      - WORKFLOW_1_ID=${WORKFLOW_1_ID}
      - WORKFLOW_2_ID=${WORKFLOW_2_ID}
    env_file:
      - ./backend/.env
```

---

## 测试配置是否正确

### 测试后端

```bash
# 健康检查
curl http://localhost:8000/health

# 测试大纲生成（需要替换为真实数据）
curl -X POST http://localhost:8000/api/generate-outline \
  -H "Content-Type: application/json" \
  -d '{
    "textbook_content": "测试内容",
    "grade_level": "三年级",
    "subject": "语文",
    "module_count": 4
  }'
```

### 测试前端

```bash
# 启动开发服务器
npm run dev

# 访问
open http://localhost:5173
```

---

## 配置模板文件

### backend/.env.example

```env
XINGCHEN_API_URL=http://{本地 IP 地址}/workflow/v1/chat/completions
XINGCHEN_API_KEY=your_api_key_here
XINGCHEN_API_SECRET=your_api_secret_here
WORKFLOW_1_ID=your_workflow_1_id_here
WORKFLOW_2_ID=your_workflow_2_id_here
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### frontend/.env.example

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

**配置完成后，就可以开始开发了！🚀**
