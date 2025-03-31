import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 text-5xl font-bold">
          <span className="mr-2">🔮</span>
          <span>AI工作流编排平台</span>
        </div>
        <p className="mb-10 text-xl text-gray-600">
          基于Next.js、Mastra和@xyflow/react构建的AI工作流编排平台，
          <br />
          简化AI代理和复杂工作流的构建与部署。
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-base">
              进入仪表板
            </Button>
          </Link>
          <Link href="/docs/workflow-editor">
            <Button variant="outline" size="lg" className="px-8 py-6 text-base">
              查看文档
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 text-2xl">🤖</div>
          <h3 className="mb-2 text-xl font-semibold">强大的AI代理</h3>
          <p className="text-gray-600">
            基于Mastra框架构建复杂AI代理，支持多模型、工具集成和条件决策。
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 text-2xl">🔄</div>
          <h3 className="mb-2 text-xl font-semibold">可视化工作流</h3>
          <p className="text-gray-600">
            使用@xyflow/react可视化构建和管理复杂AI工作流，无需编写代码。
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 text-2xl">🚀</div>
          <h3 className="mb-2 text-xl font-semibold">快速部署</h3>
          <p className="text-gray-600">
            一键部署AI应用，支持多种集成方式，如API、Widget和嵌入式集成。
          </p>
        </div>
      </div>

      <footer className="mt-20 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} AI工作流编排平台 |
          基于Next.js、Mastra和@xyflow/react构建
        </p>
      </footer>
    </div>
  );
}
