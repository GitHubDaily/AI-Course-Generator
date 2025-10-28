# AI 课程生成系统 - 前端

基于 React + TypeScript + Ant Design 的课程生成前端界面。

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 4. 构建生产版本

```bash
npm run build
```

构建结果在 `dist/` 目录。

## 项目结构

```
frontend/src/
├── components/          # React 组件
│   ├── TextInput.tsx    # 文本输入组件
│   ├── CourseOutline.tsx  # 课程大纲展示
│   ├── ModuleDetail.tsx   # 模块详情展示
│   └── Loading.tsx      # 加载组件
├── services/            # API 服务
│   └── api.ts          # API 调用封装
├── types/               # TypeScript 类型定义
│   └── course.ts       # 课程相关类型
├── App.tsx             # 主应用组件
├── App.css             # 应用样式
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 功能特性

- 📝 文本输入：支持直接输入课本内容
- 🎯 大纲生成：AI 自动生成结构化课程大纲
- 📚 模块详情：查看每个模块的详细教学内容
- 🎨 美观界面：基于 Ant Design 的现代化 UI
- 📱 响应式：支持手机、平板和桌面端

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 库**: Ant Design 5
- **HTTP 客户端**: Axios
- **状态管理**: React Hooks

## 开发注意事项

- 确保后端服务已启动（默认 http://localhost:8000）
- 修改 API 地址请编辑 `.env.local` 文件
- 组件支持热更新，修改后自动刷新
