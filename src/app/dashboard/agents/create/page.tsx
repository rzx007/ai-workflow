'use client';

import { useState } from "react";
import Link from "next/link";

// 模型选项
const modelOptions = [
  { provider: 'openai', models: ['gpt-4', 'gpt-3.5-turbo'] },
  { provider: 'anthropic', models: ['claude-3-opus', 'claude-3-sonnet'] },
  { provider: 'gemini', models: ['gemini-pro'] },
];

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4');
  const [systemPrompt, setSystemPrompt] = useState('');

  // 根据选择的提供商筛选模型
  const availableModels = modelOptions.find(opt => opt.provider === provider)?.models || [];

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvider = e.target.value;
    setProvider(newProvider);
    // 当提供商改变时，选择该提供商的第一个模型
    const models = modelOptions.find(opt => opt.provider === newProvider)?.models || [];
    if (models.length > 0) {
      setModel(models[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: agentName,
      description: agentDescription,
      provider,
      model,
      systemPrompt
    });
    // 在实际应用中，这里会创建真实的代理
    alert('代理创建成功！');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">创建AI代理</h1>
          <p className="text-muted-foreground">
            配置您的AI代理以便在工作流中使用
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/dashboard/agents"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            取消
          </Link>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            创建代理
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">代理名称</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入代理名称"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">描述</label>
            <input
              type="text"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="简单描述这个代理的用途"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">提供商</label>
            <select
              value={provider}
              onChange={handleProviderChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">模型</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              {availableModels.map((modelName) => (
                <option key={modelName} value={modelName}>
                  {modelName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">系统提示</label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={6}
            placeholder="输入系统指令，这将指导AI代理的行为..."
          />
        </div>

        <div className="border p-4 rounded-md bg-muted/20">
          <h3 className="font-medium mb-2">添加工具 (开发中)</h3>
          <p className="text-sm text-muted-foreground mb-3">在未来版本中，您可以为代理添加工具以增强其功能</p>
          <button 
            type="button"
            className="px-3 py-1 border rounded-md text-sm opacity-50 cursor-not-allowed"
            disabled
          >
            添加工具
          </button>
        </div>
      </form>
    </div>
  );
} 