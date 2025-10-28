# AI 课程生成系统

一款基于讯飞星辰 Agent 开源平台构建的 AI 教育工具，旨在帮助教师快速从课本内容获取到清晰的的课程大纲和高质量的教学内容。

## 项目简介

本工具使用讯飞星辰 Agent 开源平台，实现：
- 📚 接收课本文本内容
- 🎯 自动生成结构化的课程大纲
- 📝 为每个模块生成详细的教学计划、案例和练习题
- 💡 为教师提供教学建议

## 效果展示

### 首页 - 输入课本内容
![首页效果图](demo/home.png)

### 课程大纲展示
![课程大纲](demo/course-outline.png)

### 模块详细内容
![模块详情](demo/module-content.png)

## 技术架构

### 后端
- **框架**: FastAPI (Python 3.10+)
- **HTTP 客户端**: httpx (异步)
- **数据验证**: Pydantic
- **AI 平台**: 讯飞星辰 Agent 开源平台

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 库**: Ant Design 5
- **HTTP 客户端**: Axios

## 快速开始

### 前提条件

在开始之前，请确保你已经：

✅ 安装了 Python 3.10 或更高版本
✅ 安装了 Node.js 16 或更高版本
✅ 在本地成功部署了讯飞星辰 Agent 开发平台
✅ 在讯飞星辰 Agent 平台创建了工作流并发布

### 1. 克隆项目

```bash
git clone <repository-url>
cd ai-course-generator
```

### 2. 配置后端

```bash
cd backend

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的讯飞星辰 API 凭证和工作流 ID

# 启动后端服务
uvicorn main:app --reload
```

后端将在 `http://localhost:8000` 启动。

### 3. 配置前端

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量（可选，默认连接 localhost:8000）
cp .env.example .env.local

# 启动开发服务器
npm run dev
```

前端将在 `http://localhost:5173` 启动。

### 4. 访问应用

浏览器打开 `http://localhost:5173`，开始使用！

## 使用指南

### 生成课程大纲

1. 在首页输入框中粘贴或输入课本文本内容
2. （可选）填写年级、学科和期望的模块数量
3. 点击"生成课程大纲"按钮
4. 等待 AI 处理，查看生成的大纲

### 查看模块详情

1. 在大纲页面，点击任意模块的"查看详情"按钮
2. 系统将生成该模块的详细教学内容
3. 查看教学计划、案例、练习题和教学建议

## 项目结构

```
ai-course-generator/
├── backend/                 # 后端服务
│   ├── main.py             # FastAPI 主应用
│   ├── config.py           # 配置管理
│   ├── models.py           # 数据模型
│   ├── workflow_client.py  # 工作流客户端
│   ├── requirements.txt    # Python 依赖
│   ├── .env               # 环境变量配置
│   └── README.md          # 后端文档
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── services/      # API 服务
│   │   ├── types/         # 类型定义
│   │   ├── App.tsx        # 主应用
│   │   └── main.tsx       # 入口文件
│   ├── package.json       # 前端依赖
│   └── README.md          # 前端文档
├── docs/                   # 项目文档
└── README.md              # 本文件
```

## API 文档

后端启动后，访问以下地址查看 API 文档：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 环境变量配置

### 后端 (.env)

```env
# 本地星辰 Agent 平台创建的应用信息
XINGCHEN_API_KEY=your_api_key
XINGCHEN_API_SECRET=your_api_secret

# 工作流 ID
WORKFLOW_1_ID=your_workflow_1_id  # 课程大纲生成
WORKFLOW_2_ID=your_workflow_2_id  # 模块详情生成

# 服务器配置
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 前端 (.env.local)

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 开发进度

- [x] 后端基础框架
- [x] 工作流客户端封装
- [x] 数据模型定义
- [x] API 端点实现
- [x] 前端项目搭建
- [x] UI 组件开发
- [x] API 集成
- [x] 测试和优化
- [x] 部署文档

## 注意事项

1. **API 凭证**: 需要有效的讯飞星辰 API 凭证才能使用
2. **工作流**: 需要在本地讯飞星辰Agent平台预先创建并配置工作流
3. **超时设置**: API 调用超时时间为 120 秒
4. **文本长度**: 建议单次输入的课本内容不超过 10000 字

## 常见问题

### 1. 后端启动失败
- 检查 Python 版本是否 >= 3.10
- 确认 .env 文件中的环境变量已正确配置
- 查看终端错误信息

### 2. 前端无法连接后端
- 确认后端服务已启动
- 检查 .env.local 中的 API 地址是否正确
- 查看浏览器控制台的网络请求

### 3. 生成失败
- 检查讯飞星辰 API 凭证是否有效
- 确认工作流 ID 是否正确
- 查看后端日志了解详细错误

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发团队。

---

**开发文档**: 查看 `docs/` 目录获取更多详细信息

**快速启动清单**: `docs/Quick Start Checklist - Claude.md`

**产品需求文档**: `docs/RPD.md`
