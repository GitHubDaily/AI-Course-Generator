# 快速启动指南

本文档帮助你快速启动和运行 AI 课程生成系统。

## 前提条件

在开始之前，请确保你已经：

1. ✅ 安装了 Python 3.10 或更高版本
2. ✅ 安装了 Node.js 16 或更高版本
3. ✅ 在本地成功部署了讯飞星辰 Agent 平台
4. ✅ 在本地讯飞星辰 Agent 平台创建了工作流并发布

## 第一步：配置后端

### 1. 安装 Python 依赖

```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

编辑 `backend/.env` 文件，填入你的配置：

```env
# 填写本地讯飞星辰绑定了工作流的应用 API 凭证（必填）
XINGCHEN_API_KEY=你的API_KEY
XINGCHEN_API_SECRET=你的API_SECRET

# 工作流 ID（必填）
WORKFLOW_1_ID=你的工作流1_ID
WORKFLOW_2_ID=你的工作流2_ID

# 可选配置
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**重要提示**：
- 请先本地部署讯飞星辰 Agent 平台
- 工作流1用于生成课程大纲（必需）
- 工作流2用于生成模块详情（必需）
- 将构建好的工作流发布并绑定应用
- 获取到相关的 API 凭证信息

### 3. 启动后端服务

```bash
# 在 backend 目录下
python main.py

# 或使用 uvicorn
uvicorn main:app --reload
```

如果启动成功，你会看到：

```
🚀 AI 课程生成系统 - 后端服务启动
✅ 配置验证通过
✅ 服务器配置:
   - 端口: 8000
   - CORS 允许的源: ['http://localhost:3000', 'http://localhost:5173']
   - 工作流1 ID: 7388113512793067522...
```

访问 http://localhost:8000/health 检查服务是否正常。

当后面修改配置文件 .env，需要重启后端服务才能使新的环境变量生效。

方法一：使用 python main.py 启动的

  1. 停止服务：
    - 在运行后端的终端窗口按 Ctrl + C
  2. 重新启动：
  cd backend
  python main.py

方法二：使用 uvicorn 启动的

1. 停止服务：
   - 在运行后端的终端窗口按 Ctrl + C
2. 重新启动：
cd backend
uvicorn main:app --reload

注意：如果使用了 --reload 参数，uvicorn 会自动监听代码变化并重启，但 .env 文件的修改不会自动重启，需要手动重启。

## 第二步：配置前端

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动前端服务

```bash
npm run dev
```

如果启动成功，你会看到：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 第三步：使用系统

1. **打开浏览器**：访问 http://localhost:5173

2. **输入课本内容**：
   - 可以点击"加载示例文本"查看示例
   - 或者直接粘贴你的课本文本

3. **配置参数**（可选）：
   - 年级：如"三年级"
   - 学科：如"语文"
   - 模块数量：2-6个

4. **生成大纲**：
   - 点击"生成课程大纲"按钮
   - 等待10-60秒（取决于内容长度）
   - 查看生成的课程大纲

5. **查看详情**（如果配置了工作流2）：
   - 点击任意模块的"查看详情"按钮
   - 等待10-30秒
   - 查看教学计划、案例、练习题等

## 常见问题

### 1. 后端启动报错："缺少必需的环境变量"

**原因**：`.env` 文件中的配置不完整

**解决**：
- 检查 `XINGCHEN_API_KEY` 是否已填写
- 检查 `XINGCHEN_API_SECRET` 是否已填写
- 检查 `WORKFLOW_1_ID` 是否已填写

### 2. 前端无法连接后端

**原因**：后端服务未启动或端口不匹配

**解决**：
- 确认后端服务已启动（访问 http://localhost:8000/health）
- 检查浏览器控制台的网络请求
- 确认 `.env.local` 中的 API 地址正确

### 3. 生成大纲失败："工作流调用失败"

**可能原因**：
- API 凭证无效
- 工作流 ID 错误
- 网络问题
- 讯飞星辰 API 限额不足

**解决**：
- 检查后端控制台的详细错误信息
- 确认 API 凭证有效
- 确认工作流 ID 正确
- 访问讯飞星辰平台检查配额

### 4. 生成超时

**原因**：内容太长或网络慢

**解决**：
- 减少输入文本的长度
- 检查网络连接
- 等待更长时间（最多2分钟）

## 下一步

现在你已经成功启动了系统！接下来你可以：

1. **测试不同的内容**：尝试不同学科和年级的课本内容
2. **优化工作流**：在讯飞星辰平台调整工作流的 Prompt
3. **自定义界面**：修改前端组件的样式和布局
4. **添加功能**：参考文档添加新功能

## 获取帮助

如果遇到问题：

1. 查看 `README.md` 了解更多信息
2. 查看 `docs/` 目录下的详细文档
3. 提交 Issue 到 GitHub

## 技术支持

- **后端 API 文档**：http://localhost:8000/docs
- **快速启动清单**：`docs/Quick Start Checklist - Claude.md`
- **产品需求文档**：`docs/RPD.md`

祝你使用愉快！🎉
