import Link from "next/link";

// 模拟工作流数据
const mockWorkflows = [
  {
    id: "wf1",
    name: "客户服务助手",
    description: "自动回答客户常见问题的工作流",
    status: "active",
    updatedAt: "2023-09-15",
  },
  {
    id: "wf2",
    name: "文档摘要生成器",
    description: "自动为上传的文档生成摘要",
    status: "active",
    updatedAt: "2023-09-10",
  },
  {
    id: "wf3",
    name: "产品推荐引擎",
    description: "基于用户历史和偏好推荐产品",
    status: "draft",
    updatedAt: "2023-09-05",
  },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">工作流管理</h1>
          <p className="text-gray-600">管理您创建的所有AI工作流</p>
        </div>
        <Link
          href="/dashboard/workflows/create"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          创建工作流
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
          <div className="col-span-4">名称</div>
          <div className="col-span-4">描述</div>
          <div className="col-span-2">状态</div>
          <div className="col-span-2 text-right">操作</div>
        </div>
        <div className="divide-y">
          {mockWorkflows.map((workflow) => (
            <div
              key={workflow.id}
              className="grid grid-cols-12 items-center px-4 py-3 text-sm"
            >
              <div className="col-span-4 font-medium">{workflow.name}</div>
              <div className="col-span-4 text-gray-600">
                {workflow.description}
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    workflow.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {workflow.status === "active" ? "已激活" : "草稿"}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link
                  href={`/dashboard/workflows/${workflow.id}`}
                  className="text-blue-600 hover:underline"
                >
                  查看
                </Link>
                <Link
                  href={`/dashboard/workflows/${workflow.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  编辑
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
