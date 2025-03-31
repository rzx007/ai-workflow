import Link from "next/link";

// 模拟代理数据
const mockAgents = [
  {
    id: "agent1",
    name: "客服助手",
    description: "处理客户咨询的AI助手",
    model: "gpt-4",
    provider: "openai",
    updatedAt: "2023-09-15",
  },
  {
    id: "agent2",
    name: "内容创作助手",
    description: "帮助创建各种内容的AI助手",
    model: "claude-3-opus",
    provider: "anthropic",
    updatedAt: "2023-09-10",
  },
  {
    id: "agent3",
    name: "数据分析助手",
    description: "帮助分析数据并生成报告的AI助手",
    model: "gemini-pro",
    provider: "gemini",
    updatedAt: "2023-09-05",
  },
];

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI代理管理</h1>
          <p className="text-muted-foreground">创建和管理您的AI代理</p>
        </div>
        <Link
          href="/dashboard/agents/create"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          创建代理
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
          <div className="col-span-3">名称</div>
          <div className="col-span-4">描述</div>
          <div className="col-span-2">模型</div>
          <div className="col-span-1">提供商</div>
          <div className="col-span-2 text-right">操作</div>
        </div>
        <div className="divide-y">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="grid grid-cols-12 items-center px-4 py-3 text-sm"
            >
              <div className="col-span-3 font-medium">{agent.name}</div>
              <div className="col-span-4 text-muted-foreground">
                {agent.description}
              </div>
              <div className="col-span-2">
                {agent.model}
              </div>
              <div className="col-span-1">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    agent.provider === "openai"
                      ? "bg-blue-100 text-blue-700"
                      : agent.provider === "anthropic"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {agent.provider}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link
                  href={`/dashboard/agents/${agent.id}`}
                  className="text-blue-600 hover:underline"
                >
                  查看
                </Link>
                <Link
                  href={`/dashboard/agents/${agent.id}/edit`}
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