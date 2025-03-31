'use client';

// 基于Mastra官方API的Agent实现
import { useState } from 'react';

// 模型类型
type ModelProvider = 'openai' | 'anthropic' | 'gemini';
type ModelName = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 'gemini-pro';

// 工具定义接口
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (args: Record<string, any>) => Promise<any>;
}

// Agent配置选项
export interface AgentOptions {
  name: string;
  description?: string;
  provider: ModelProvider;
  model: ModelName;
  temperature?: number;
  systemPrompt?: string;
  tools?: ToolDefinition[];
}

// 消息类型
export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface Message {
  role: MessageRole;
  content: string;
  toolCallId?: string;
  toolName?: string;
  timestamp?: Date;
}

// 线程接口
export interface Thread {
  id: string;
  messages: Message[];
  createdAt: Date;
  metadata?: Record<string, any>;
}

// Agent类
export class Agent {
  name: string;
  description: string;
  provider: ModelProvider;
  model: ModelName;
  temperature: number;
  systemPrompt: string;
  tools: ToolDefinition[];
  threads: Map<string, Thread>;

  constructor(options: AgentOptions) {
    this.name = options.name;
    this.description = options.description || '';
    this.provider = options.provider;
    this.model = options.model;
    this.temperature = options.temperature || 0.7;
    this.systemPrompt = options.systemPrompt || '';
    this.tools = options.tools || [];
    this.threads = new Map();
  }

  // 创建新线程
  createThread(metadata?: Record<string, any>): Thread {
    const threadId = `thread-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const thread: Thread = {
      id: threadId,
      messages: [],
      createdAt: new Date(),
      metadata
    };

    // 如果有系统提示，添加到线程
    if (this.systemPrompt) {
      thread.messages.push({
        role: 'system',
        content: this.systemPrompt,
        timestamp: new Date()
      });
    }

    this.threads.set(threadId, thread);
    return thread;
  }

  // 获取线程
  getThread(threadId: string): Thread | undefined {
    return this.threads.get(threadId);
  }

  // 生成响应
  async generate(threadId: string, message: string): Promise<string> {
    const thread = this.threads.get(threadId);
    if (!thread) {
      throw new Error(`找不到ID为${threadId}的线程`);
    }

    // 添加用户消息
    thread.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // 在实际应用中，这里将调用Mastra的API，现在简单模拟响应
    const response = `这是来自${this.provider}上的${this.model}模型的模拟响应。`;
    
    // 添加助手响应
    thread.messages.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });

    return response;
  }

  // 流式生成响应
  async stream(threadId: string, message: string): Promise<ReadableStream<string>> {
    const thread = this.threads.get(threadId);
    if (!thread) {
      throw new Error(`找不到ID为${threadId}的线程`);
    }

    // 添加用户消息
    thread.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // 模拟流式响应
    const encoder = new TextEncoder();
    const response = `这是来自${this.provider}上的${this.model}模型的模拟流式响应。`;
    
    // 结束后添加助手消息到线程
    setTimeout(() => {
      thread.messages.push({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });
    }, 1000);

    // 模拟流式返回
    return new ReadableStream({
      async start(controller) {
        for (let i = 0; i < response.length; i++) {
          controller.enqueue(response[i]);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        controller.close();
      }
    });
  }

  // 添加工具
  addTool(tool: ToolDefinition): this {
    this.tools.push(tool);
    return this;
  }

  // 查询线程历史
  queryMemory(threadId: string, query: string, options?: { limit?: number }): Message[] {
    const thread = this.threads.get(threadId);
    if (!thread) {
      return [];
    }

    // 在实际应用中，这将使用语义搜索找到相关消息
    // 这里简单返回最近的消息
    const limit = options?.limit || 5;
    return thread.messages
      .filter(msg => msg.role !== 'system')
      .slice(-limit);
  }

  // 清除线程历史但保留系统消息
  clearThread(threadId: string): boolean {
    const thread = this.threads.get(threadId);
    if (!thread) {
      return false;
    }

    // 保留系统消息
    thread.messages = thread.messages.filter(msg => msg.role === 'system');
    return true;
  }
}

// 创建Agent的辅助函数
export function getAgent(options: AgentOptions): Agent {
  return new Agent(options);
}

// 创建工具的辅助函数
export function createTool(
  name: string,
  description: string,
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  },
  handler: (args: Record<string, any>) => Promise<any>
): ToolDefinition {
  return {
    name,
    description,
    parameters,
    handler,
  };
} 