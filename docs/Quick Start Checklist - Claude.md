# 🚀 快速启动清单

## 给 Claude Code 的开发指引

---

## ✅ 开发前准备（10分钟）

### 1. 确认已完成的工作

- [x] 工作流1（课程大纲生成器）已创建并测试
- [x] 工作流2（模块详细内容生成器）已创建并测试
- [x] 有测试用的课本内容
- [x] 有工作流1的实际输出示例

### 2. 收集必要信息

需要从用户获取：

| 信息项 | 用途 | 示例 |
|--------|------|------|
| API Key | 讯飞星辰认证 | `abc123...` |
| API Secret | 讯飞星辰认证 | `xyz789...` |
| 工作流1 ID | 调用大纲生成器 | `7388113512793067522` |
| 工作流2 ID | 调用详情生成器 | `待测试完成` |

### 3. 确认技术栈

**后端：**
- Python 3.10+
- FastAPI
- httpx
- pydantic
- python-dotenv

**前端：**
- React 18
- TypeScript
- Ant Design 5
- Axios
- Vite

---

## 📋 开发步骤（按顺序执行）

### 阶段1：后端基础（1小时）

#### 1.1 创建项目结构

```
ai-course-generator/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── models.py
│   ├── workflow_client.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    └── (后续创建)
```

#### 1.2 安装依赖

```bash
cd backend
pip install fastapi uvicorn[standard] httpx pydantic python-dotenv
pip freeze > requirements.txt
```

#### 1.3 配置环境变量

创建 `backend/.env`：
```env
XINGCHEN_API_URL=http://{本地 IP 地址}/workflow/v1/chat/completions
XINGCHEN_API_KEY=从用户获取
XINGCHEN_API_SECRET=从用户获取
WORKFLOW_1_ID=从用户获取
WORKFLOW_2_ID=从用户获取
BACKEND_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### 1.4 实现核心功能

**要实现的文件：**

1. **config.py** - 配置管理
   - 从环境变量加载配置
   - 验证必需的配置项

2. **workflow_client.py** - 工作流调用客户端
   - 封装讯飞星辰 API 调用
   - 实现两个函数：
     - `call_workflow_1(textbook_content, grade_level, subject, module_count)`
     - `call_workflow_2(module_info, textbook_content, detail_level, exercise_count)`

3. **models.py** - 数据模型
   - 使用 Pydantic 定义请求和响应模型
   - `GenerateOutlineRequest`
   - `GenerateDetailRequest`
   - `ApiResponse`

4. **main.py** - FastAPI 应用
   - 配置 CORS
   - 实现两个端点：
     - `POST /api/generate-outline`
     - `POST /api/generate-detail`
   - 实现健康检查：`GET /health`

#### 1.5 测试后端

```bash
# 启动服务
uvicorn main:app --reload

# 测试健康检查
curl http://localhost:8000/health

# 使用 Postman 测试 API
# 或使用提供的测试数据
```

**测试检查清单：**
- [ ] 服务能正常启动
- [ ] 健康检查返回 200
- [ ] 工作流调用成功
- [ ] 返回正确的 JSON 格式
- [ ] 错误处理正常

---

### 阶段2：前端基础（1.5小时）

#### 2.1 创建 React 项目

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install antd axios
```

#### 2.2 配置环境变量

创建 `frontend/.env.local`：
```env
VITE_API_BASE_URL=http://localhost:8000
```

#### 2.3 创建项目结构

```
frontend/src/
├── components/
│   ├── TextInput.tsx
│   ├── CourseOutline.tsx
│   ├── ModuleDetail.tsx
│   └── Loading.tsx
├── services/
│   └── api.ts
├── types/
│   └── course.ts
├── App.tsx
└── main.tsx
```

#### 2.4 实现组件

**要实现的文件：**

1. **types/course.ts** - TypeScript 类型定义
   - 定义所有数据类型
   - CourseModule, CourseOutline, ModuleDetail 等

2. **services/api.ts** - API 调用封装
   - 使用 axios
   - 封装两个函数：
     - `generateOutline(params)`
     - `generateDetail(params)`
   - 统一错误处理

3. **components/TextInput.tsx** - 文本输入组件
   - 多行文本框
   - 可选参数（年级、学科、模块数）
   - 生成按钮
   - 加载状态

4. **components/CourseOutline.tsx** - 大纲展示组件
   - 卡片式展示
   - 模块列表
   - 查看详情按钮

5. **components/ModuleDetail.tsx** - 详情展示组件
   - 教学计划展示
   - 案例展示
   - 练习题展示（答案可折叠）
   - 教学建议展示

6. **components/Loading.tsx** - 加载组件
   - Spin 组件
   - 提示文字

7. **App.tsx** - 主应用
   - 状态管理
   - 页面切换逻辑
   - 组件组合

#### 2.5 测试前端

```bash
npm run dev
```

**测试检查清单：**
- [ ] 页面正常显示
- [ ] 可以输入文本
- [ ] 点击生成显示加载
- [ ] 成功后显示大纲
- [ ] 可以查看模块详情
- [ ] 返回按钮正常工作

---

### 阶段3：联调测试（30分钟）

#### 3.1 启动服务

```bash
# 终端1：启动后端
cd backend
uvicorn main:app --reload

# 终端2：启动前端
cd frontend
npm run dev
```

#### 3.2 端到端测试

使用测试数据完整测试流程：

1. **输入文本**
   - 复制 `sample_textbook_simple.md` 的内容
   - 粘贴到文本框

2. **生成大纲**
   - 点击"生成课程大纲"
   - 等待加载
   - 检查返回的大纲

3. **查看详情**
   - 点击第一个模块的"查看详情"
   - 等待加载
   - 检查详细内容

4. **返回大纲**
   - 点击"返回"
   - 查看另一个模块

**联调检查清单：**
- [ ] 前后端能正常通信
- [ ] CORS 配置正确
- [ ] 数据格式匹配
- [ ] 错误提示正常
- [ ] 加载状态正确

---

### 阶段4：优化完善（1小时）

#### 4.1 UI 优化

- [ ] 响应式布局
- [ ] 美化样式
- [ ] 添加过渡动画
- [ ] 优化加载提示

#### 4.2 错误处理

- [ ] 网络错误提示
- [ ] 超时处理
- [ ] 输入验证
- [ ] 友好的错误消息

#### 4.3 用户体验

- [ ] 添加示例文本按钮
- [ ] 添加使用说明
- [ ] 优化交互反馈
- [ ] 添加复制功能（可选）

---

## 🔍 关键实现要点

### 后端：工作流调用

```python
# 关键代码结构（伪代码）

async def call_xingchen_workflow(flow_id, parameters):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}:{API_SECRET}"
    }
    
    data = {
        "flow_id": flow_id,
        "uid": "user_123",
        "parameters": parameters,
        "stream": False
    }
    
    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(API_URL, json=data, headers=headers)
        result = response.json()
        
        # 解析 output 字段（可能是字符串化的 JSON）
        if "output" in result:
            return json.loads(result["output"])
        
        return result
```

### 前端：API 调用

```typescript
// 关键代码结构（伪代码）

export const generateOutline = async (params) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/generate-outline`,
      params,
      { timeout: 60000 }
    );
    return response.data;
  } catch (error) {
    // 错误处理
    throw error;
  }
};
```

### 前端：状态管理

```typescript
// 关键代码结构（伪代码）

const [view, setView] = useState<'input' | 'outline' | 'detail'>('input');
const [outline, setOutline] = useState<CourseOutline | null>(null);
const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
const [loading, setLoading] = useState(false);

// 生成大纲
const handleGenerate = async (textbookContent: string) => {
  setLoading(true);
  try {
    const result = await generateOutline({ textbook_content: textbookContent });
    setOutline(result.data);
    setView('outline');
  } catch (error) {
    // 错误处理
  } finally {
    setLoading(false);
  }
};
```

---

## 📊 测试数据

### 测试输入（课本内容）

使用文件：`sample_textbook_simple.md`

简短版本：
```
第1课 春天来了

春天来了，春天来了！
小草从地下探出头来，那是春天的眉毛吧？
早开的野花一朵两朵，那是春天的眼睛吧？
...
```

### 预期输出（工作流1）

参考之前用户提供的实际输出：
```json
{
  "course_title": "三年级语文·春天主题单元：感知自然之美",
  "modules": [...]
}
```

---

## 🚨 常见问题和解决方案

### 问题1：CORS 错误

**现象：** 浏览器控制台显示 CORS 错误

**解决：**
```python
# 在 FastAPI 中正确配置 CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 问题2：工作流返回格式异常

**现象：** 后端解析 JSON 失败

**解决：**
- 检查工作流的 output 字段
- 可能需要 `json.loads(result["output"])`
- 添加 try-catch 处理解析错误

### 问题3：超时

**现象：** 请求超时

**解决：**
- 增加超时时间到 120 秒
- 添加超时提示
- 提供重试功能

### 问题4：环境变量未加载

**现象：** 提示 API Key 未找到

**解决：**
- 确认 .env 文件位置正确
- 使用 `python-dotenv` 加载
- 检查变量名拼写

---

## ✅ 完成检查清单

### 功能完整性

- [ ] 可以输入课本文本
- [ ] 可以生成课程大纲
- [ ] 可以查看模块详情
- [ ] 可以返回大纲页面
- [ ] 错误提示友好
- [ ] 加载状态清晰

### 代码质量

- [ ] 代码结构清晰
- [ ] 函数职责单一
- [ ] 有必要的注释
- [ ] 错误处理完善
- [ ] 类型定义完整（TypeScript）

### 用户体验

- [ ] UI 美观
- [ ] 交互流畅
- [ ] 响应式布局
- [ ] 加载提示明确
- [ ] 错误信息清楚

---

## 📦 交付物

### 代码

```
ai-course-generator/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── models.py
│   ├── workflow_client.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── README.md
```

### 文档

- [ ] README.md（如何运行）
- [ ] API 文档
- [ ] 环境变量说明
- [ ] 部署指南（可选）

---

## 🎯 预计时间

| 阶段 | 时间 |
|------|------|
| 后端基础 | 1小时 |
| 前端基础 | 1.5小时 |
| 联调测试 | 0.5小时 |
| 优化完善 | 1小时 |
| **总计** | **4小时** |

---

## 🚀 开始开发！

**准备好了就按照这个清单一步步实现吧！**

有问题随时反馈，我会帮助解决。

**重要提醒：**
1. 先实现核心功能，再优化细节
2. 多用 console.log 和打印调试
3. 遇到问题先看错误信息
4. 保持代码整洁

**祝开发顺利！** 🎉
