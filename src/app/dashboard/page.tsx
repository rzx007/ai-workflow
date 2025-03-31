import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "仪表板 | AI工作流平台",
};

export default function DashboardPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">工作流</h2>
          <p className="text-gray-600 mb-4">
            创建和管理AI工作流，通过可视化编辑器连接不同的节点构建复杂的AI应用逻辑。
          </p>
          <div className="space-y-2">
            <Link
              href="/dashboard/workflows"
              className="block text-blue-600 hover:underline"
            >
              查看所有工作流
            </Link>
            <Link
              href="/dashboard/workflows/create"
              className="block text-blue-600 hover:underline"
            >
              创建新工作流
            </Link>
            <Link
              href="/dashboard/workflows/example"
              className="block text-blue-600 hover:underline"
            >
              ReactFlow示例
            </Link>
          </div>
        </div>

        <div className="aspect-video rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">代理</h2>
          <p className="text-gray-600 mb-4">
            创建和管理AI代理，配置提示词模板、工具集和其他参数。
          </p>
          <div className="space-y-2">
            <Link
              href="/dashboard/agents"
              className="block text-blue-600 hover:underline"
            >
              查看所有代理
            </Link>
            <Link
              href="/dashboard/agents/create"
              className="block text-blue-600 hover:underline"
            >
              创建新代理
            </Link>
          </div>
        </div>

        <div className="aspect-video rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">文档</h2>
          <p className="text-gray-600 mb-4">
            查看使用指南和API文档，了解如何使用平台的各项功能。
          </p>
          <div className="space-y-2">
            <Link
              href="/docs/workflow-editor"
              className="block text-blue-600 hover:underline"
            >
              工作流编辑器使用指南
            </Link>
            <Link
              href="https://github.com/example/mastra"
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              Mastra框架文档
            </Link>
            <Link
              href="https://xyflow.com/react-flow"
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              ReactFlow (@xyflow/react) 文档
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">AI工作流平台</h1>
        <p className="text-sm text-gray-500">
          基于Next.js、Mastra和@xyflow/react构建的AI工作流编排平台
        </p>
      </div>
    </>
  );
}
