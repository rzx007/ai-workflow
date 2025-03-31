'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WorkflowEditor } from '@/components/workflow/workflow-editor';

export default function CreateWorkflowPage() {
  const [workflowName, setWorkflowName] = useState('新工作流');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const handleSave = () => {
    // 保存工作流逻辑
    console.log('保存工作流', { name: workflowName, description: workflowDescription });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">创建工作流</h1>
          <p className="text-muted-foreground">
            使用可视化编辑器设计您的AI工作流
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/dashboard/workflows"
            className="rounded-md border px-4 py-2 text-sm font-medium"
          >
            取消
          </Link>
          <button
            onClick={handleSave}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            保存工作流
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">工作流名称</label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="输入工作流名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">描述</label>
            <input
              type="text"
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="简要描述这个工作流的用途"
            />
          </div>
        </div>

        <div className="pt-4">
          <WorkflowEditor />
        </div>
      </div>
      
      <div className="rounded-md border p-4 bg-muted/10">
        <h3 className="font-medium mb-2">提示</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>您可以添加不同类型的节点（代理、工具、条件）</li>
          <li>通过点击并拖动节点的底部连接点来创建连接</li>
          <li>点击节点可以在右侧面板中编辑其属性</li>
          <li>条件节点可以根据条件表达式决定工作流的执行路径</li>
        </ul>
        <div className="mt-3">
          <Link 
            href="/dashboard/workflows/example" 
            className="text-sm text-blue-600 hover:underline"
          >
            查看ReactFlow示例
          </Link>
        </div>
      </div>
    </div>
  );
} 