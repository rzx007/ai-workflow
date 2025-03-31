import { Mastra } from "@mastra/core";

// 初始化 Mastra 实例
export const mastra = new Mastra({
  llm: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4-turbo-preview",
  },
  memory: {
    type: "libsql",
    url: process.env.DATABASE_URL,
  },
  observability: {
    provider: "langfuse",
    apiKey: process.env.LANGFUSE_API_KEY,
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  },
});

// 创建一个工作流代理
export const workflowAgent = mastra.getAgent("workflowAgent", {
  description: "一个帮助用户设计和执行工作流的AI助手",
  tools: [
    {
      name: "createWorkflow",
      description: "创建新的工作流",
      parameters: {
        name: { type: "string", description: "工作流名称" },
        description: { type: "string", description: "工作流描述" },
      },
    },
    {
      name: "addWorkflowStep",
      description: "添加工作流步骤",
      parameters: {
        workflowId: { type: "string", description: "工作流ID" },
        stepType: { type: "string", description: "步骤类型" },
        config: { type: "object", description: "步骤配置" },
      },
    },
  ],
});
