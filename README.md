# AI 工作流编排平台

基于 Next.js、Mastra 和@xyflow/react 构建的 AI 工作流编排平台，类似 Dify。

## 功能特点

- 使用 Mastra 作为 AI Agent 框架
- 使用@xyflow/react (ReactFlow)实现可视化流程编排
- 使用 shadcn/ui 作为 UI 组件库
- 支持 AI 代理、工具节点和条件节点
- 可视化工作流编辑器

## 开发环境

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

### 构建应用

```bash
npm run build
# 或
pnpm build
# 或
yarn build
```

## 项目结构

```
src/
├── app/                   # Next.js应用目录
│   ├── dashboard/         # 仪表板页面
│   │   ├── agents/        # 代理管理页面
│   │   └── workflows/     # 工作流管理页面
├── components/            # 组件目录
│   ├── ui/                # UI组件
│   └── workflow/          # 工作流相关组件
│       ├── nodes/         # 自定义节点组件
│       └── workflow-editor.tsx  # 工作流编辑器
├── lib/                   # 工具库
│   └── mastra/            # Mastra相关代码
└── types/                 # 类型定义
```

## 开发指南

### Cursor IDE 配置

本项目包含`.cursorrules`文件，用于配置 Cursor IDE 的行为。该配置文件定义了:

- 编辑器设置（缩进、格式化等）
- AI 辅助功能的上下文文件范围
- 自定义组件别名
- 导入替换规则

### VSCode 配置

如果您使用 VSCode，项目包含`.vscode/settings.json`文件，配置了与 Cursor 一致的编辑体验。

### 自定义 ReactFlow 节点

项目中包含三种自定义节点：

- `AgentNode`: AI 代理节点
- `ToolNode`: 工具节点
- `ConditionNode`: 条件节点

每种节点都有不同的视觉样式和功能。

### Mastra 集成

项目使用 Mastra 作为 AI Agent 框架，提供了以下功能：

- Agent 创建和管理
- 工作流定义和执行
- 工具集成

## 页面导航

- `/dashboard`: 仪表板主页
- `/dashboard/workflows`: 工作流列表
- `/dashboard/workflows/create`: 创建工作流
- `/dashboard/workflows/example`: ReactFlow 示例
- `/dashboard/agents`: 代理列表
- `/dashboard/agents/create`: 创建代理

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
