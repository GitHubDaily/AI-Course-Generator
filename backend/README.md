# AI 课程生成系统 - 后端

基于 FastAPI 的课程生成后端服务。

## 快速开始

### 1. 安装依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入您的配置：

```bash
cp .env.example .env
```

需要配置的环境变量：
- `XINGCHEN_API_KEY`: 本地星辰 Agent 平台创建的 API Key
- `XINGCHEN_API_SECRET`: 本地星辰 Agent 平台创建的 API Secret
- `WORKFLOW_1_ID`: 课程大纲生成工作流ID
- `WORKFLOW_2_ID`: 模块详情生成工作流ID

### 3. 启动服务

```bash
# 开发模式（自动重载）
uvicorn main:app --reload

# 或者直接运行
python main.py
```

服务将在 `http://localhost:8000` 启动。

### 4. 查看 API 文档

浏览器访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API 端点

### 健康检查

```
GET /health
```

### 生成课程大纲

```
POST /api/generate-outline
```

请求体：
```json
{
  "textbook_content": "课本文本内容...",
  "grade_level": "三年级",
  "subject": "语文",
  "module_count": 4
}
```

### 生成模块详细内容

```
POST /api/generate-detail
```

请求体：
```json
{
  "module_info": {
    "module_id": "M001",
    "title": "模块标题",
    ...
  },
  "textbook_content": "课本文本内容...",
  "detail_level": "standard",
  "exercise_count": 5
}
```

## 项目结构

```
backend/
├── main.py              # FastAPI 主应用
├── config.py            # 配置管理
├── models.py            # 数据模型定义
├── workflow_client.py   # 工作流调用客户端
├── requirements.txt     # Python 依赖
├── .env                 # 环境变量配置
├── .env.example         # 环境变量示例
└── README.md            # 本文件
```

## 注意事项

1. 确保已安装 Python 3.10+
2. 需要有效的讯飞星辰 API 凭证
3. 工作流需要在讯飞星辰平台预先创建并测试
4. 调用工作流时超时时间设置为 120 秒
