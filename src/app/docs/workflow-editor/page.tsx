import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "工作流编辑器文档",
  description: "如何使用AI工作流编辑器",
};

export default function WorkflowEditorDocPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">工作流编辑器使用指南</h1>

      <div className="prose max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">介绍</h2>
          <p>
            工作流编辑器是一个基于@xyflow/react
            (ReactFlow)的可视化编辑器，用于创建和管理AI工作流。
            它允许您通过可视化界面连接不同类型的节点，构建复杂的AI工作流逻辑。
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">节点类型</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-xl font-medium mb-2">代理节点 (Agent)</h3>
              <p>代表AI助手，可以处理用户输入并生成响应。</p>
              <ul className="list-disc pl-5 mt-2">
                <li>可以配置提示词模板</li>
                <li>可以设置模型类型</li>
                <li>支持多种输出类型</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="text-xl font-medium mb-2">工具节点 (Tool)</h3>
              <p>代表可以执行特定功能的工具。</p>
              <ul className="list-disc pl-5 mt-2">
                <li>支持各种API调用</li>
                <li>可以处理文件上传/下载</li>
                <li>可以集成外部服务</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="text-xl font-medium mb-2">条件节点 (Condition)</h3>
              <p>基于条件判断决定工作流的执行路径。</p>
              <ul className="list-disc pl-5 mt-2">
                <li>支持基于变量的条件判断</li>
                <li>可以创建复杂的逻辑分支</li>
                <li>允许多个输出路径</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">基本操作</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">添加节点</h3>
              <p>
                点击侧边栏中的节点类型，然后点击画布空白处放置节点。或者从节点面板拖拽节点到画布上。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">创建连接</h3>
              <p>
                点击节点的输出锚点，然后拖拽到目标节点的输入锚点创建连接。连接表示数据流动的路径。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">编辑节点</h3>
              <p>点击节点打开节点编辑面板，可以配置节点的各种属性和参数。</p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">删除元素</h3>
              <p>
                选中节点或连接，然后按Delete键删除。或者右键点击选择"删除"选项。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">高级功能</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">组合节点</h3>
              <p>
                可以选择多个节点，右键选择"组合"将它们组合成一个节点组，方便管理复杂工作流。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">条件路由</h3>
              <p>
                使用条件节点创建基于输入数据的动态路由逻辑，实现复杂的决策树。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">导入/导出</h3>
              <p>支持将工作流导出为JSON格式，也可以导入已有的工作流定义。</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">快捷键</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                Delete
              </span>
              <span className="ml-4">删除选中的节点或连接</span>
            </div>

            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                Ctrl+Z
              </span>
              <span className="ml-4">撤销上一步操作</span>
            </div>

            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                Ctrl+Y
              </span>
              <span className="ml-4">重做操作</span>
            </div>

            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                Ctrl+S
              </span>
              <span className="ml-4">保存当前工作流</span>
            </div>

            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                Ctrl+A
              </span>
              <span className="ml-4">选择所有节点</span>
            </div>

            <div className="border rounded p-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                空格+拖拽
              </span>
              <span className="ml-4">平移画布</span>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">示例</h2>

          <div className="space-y-4">
            <p>查看示例工作流以了解如何构建不同类型的AI应用场景：</p>

            <ul className="list-disc pl-5">
              <li>
                <Link
                  href="/dashboard/workflows/example"
                  className="text-blue-600 hover:underline"
                >
                  基础ReactFlow示例
                </Link>
                - 展示基本的节点和连接操作
              </li>
              <li>
                <Link
                  href="/dashboard/workflows/create"
                  className="text-blue-600 hover:underline"
                >
                  创建新工作流
                </Link>
                - 从零开始构建工作流
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">常见问题</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">节点无法连接</h3>
              <p>
                确保你正在连接输出锚点到输入锚点，并且节点类型兼容。某些节点只能连接到特定类型的节点。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">工作流无法保存</h3>
              <p>
                检查是否填写了所有必要的字段，特别是工作流名称和描述。确保所有节点都已正确配置。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">画布操作不流畅</h3>
              <p>
                对于非常复杂的工作流，可能会出现性能问题。尝试使用节点组合功能减少可见节点数量，或者分割为多个子工作流。
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          返回仪表板
        </Link>
      </div>
    </div>
  );
}
