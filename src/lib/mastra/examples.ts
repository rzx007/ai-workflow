'use client';

// Mastra集成示例

import { getAgent, createTool } from './agent';
import { createWorkflow } from './workflow';

// 1. 创建一个简单的代理示例
export async function createSimpleAgent() {
  // 创建一个基本的OpenAI代理
  const agent = getAgent({
    name: '客服助手',
    description: '处理客户咨询的AI助手',
    provider: 'openai',
    model: 'gpt-4',
    systemPrompt: '你是一个友好的客服助手，专注于回答用户的产品相关问题。'
  });

  // 创建一个新的对话线程
  const thread = agent.createThread({
    source: '网站聊天',
    userId: 'user123'
  });
  
  // 生成回复
  const response = await agent.generate(thread.id, '你们的退货政策是什么？');
  console.log('AI回复:', response);
  
  return {
    agent,
    thread,
    response
  };
}

// 2. 创建带工具的代理示例
export async function createAgentWithTool() {
  // 定义一个查询产品工具
  const searchProductTool = createTool(
    'search_product',
    '搜索产品信息',
    {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: '产品搜索查询词'
        },
        category: {
          type: 'string',
          description: '产品类别（可选）'
        }
      },
      required: ['query']
    },
    async (args) => {
      // 模拟产品搜索
      console.log(`搜索产品: ${args.query}, 类别: ${args.category || '所有'}`);
      return {
        products: [
          { id: 'p1', name: '示例产品', price: 99.99, description: '这是一个示例产品' }
        ]
      };
    }
  );

  // 创建代理并添加工具
  const agent = getAgent({
    name: '产品助手',
    description: '帮助用户查找产品的AI助手',
    provider: 'openai',
    model: 'gpt-4',
    systemPrompt: '你是一个产品专家，帮助用户查找商品。使用search_product工具来查询产品信息。',
    tools: [searchProductTool]
  });

  // 创建对话线程并生成回复
  const thread = agent.createThread();
  const response = await agent.generate(thread.id, '我想找一款手机');
  
  return {
    agent,
    thread,
    response
  };
}

// 3. 创建简单工作流示例
export async function createSimpleWorkflow() {
  // 创建工作流
  const workflow = createWorkflow({
    id: 'customer_service_workflow',
    name: '客户服务工作流',
    description: '处理客户请求的工作流'
  });

  // 添加工作流步骤
  workflow
    .step(
      {
        id: 'input_step',
        name: '输入分类',
        description: '分析用户输入并分类'
      },
      async (input, context) => {
        console.log('处理用户输入:', input.message);
        // 模拟分类
        const category = input.message.toLowerCase().includes('退款')
          ? 'refund'
          : 'general';
        return { category, input: input.message };
      }
    )
    .then(
      {
        id: 'agent_step',
        name: 'AI助手回复',
        description: '使用AI助手生成回复'
      },
      async (input, context) => {
        // 创建临时代理
        const agent = getAgent({
          name: '客服助手',
          provider: 'openai',
          model: 'gpt-4',
          systemPrompt: `你是客服助手，专注于${input.category === 'refund' ? '退款问题' : '一般咨询'}`
        });
        
        // 创建线程并生成回复
        const thread = agent.createThread();
        const response = await agent.generate(thread.id, input.input);
        
        return { response, category: input.category };
      }
    )
    .then(
      {
        id: 'output_step',
        name: '输出格式化',
        description: '格式化输出结果'
      },
      async (input, context) => {
        // 格式化返回结果
        return {
          message: input.response,
          category: input.category,
          timestamp: new Date().toISOString()
        };
      }
    );

  // 执行工作流
  const result = await workflow.execute({
    message: '我想了解如何申请退款'
  });
  
  console.log('工作流执行结果:', result);
  
  return {
    workflow,
    result
  };
}

// 4. 条件分支工作流示例
export async function createConditionalWorkflow() {
  // 创建工作流
  const workflow = createWorkflow({
    id: 'content_moderation_workflow',
    name: '内容审核工作流',
    description: '审核用户提交的内容'
  });

  // 添加带条件分支的工作流
  workflow
    .step(
      {
        id: 'analyze_content',
        name: '内容分析',
        description: '分析用户提交的内容'
      },
      async (input, context) => {
        console.log('分析内容:', input.content);
        // 模拟内容分析
        const hasSensitiveContent = input.content.toLowerCase().includes('敏感');
        return {
          content: input.content,
          hasSensitiveContent,
          length: input.content.length
        };
      }
    )
    .then(
      {
        id: 'content_check',
        name: '内容检查',
        condition: (context) => !context.stepResults.analyze_content.hasSensitiveContent,
        description: '检查内容是否合规'
      },
      async (input, context) => {
        console.log('内容合规，继续处理');
        return {
          status: 'approved',
          content: input.content
        };
      }
    )
    .then(
      {
        id: 'content_moderation',
        name: '内容审核',
        condition: (context) => context.stepResults.analyze_content.hasSensitiveContent,
        description: '处理敏感内容'
      },
      async (input, context) => {
        console.log('检测到敏感内容，进行审核');
        // 模拟内容审核
        const moderatedContent = `[已审核] ${input.content.replace(/敏感/g, '***')}`;
        return {
          status: 'moderated',
          content: moderatedContent
        };
      }
    )
    .then(
      {
        id: 'finalize',
        name: '完成处理',
        description: '完成内容处理'
      },
      async (input, context) => {
        // 获取之前步骤的结果
        const checkResult = context.stepResults.content_check;
        const moderationResult = context.stepResults.content_moderation;
        
        // 合并结果
        const result = checkResult || moderationResult;
        console.log('最终处理结果:', result);
        
        return {
          ...result,
          processedAt: new Date().toISOString()
        };
      }
    );

  // 执行工作流 - 正常内容
  const normalResult = await workflow.execute({
    content: '这是一个正常的内容'
  });
  
  // 执行工作流 - 敏感内容
  const sensitiveResult = await workflow.execute({
    content: '这是一个包含敏感词汇的内容'
  });
  
  return {
    workflow,
    normalResult,
    sensitiveResult
  };
} 