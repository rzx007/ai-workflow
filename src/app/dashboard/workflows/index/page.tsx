'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WorkflowIndexPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">工作流导航</h1>
        <p className="text-muted-foreground">选择要查看的工作流页面</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/workflows" className="block">
          <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium">工作流列表</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              查看所有已创建的工作流
            </p>
          </div>
        </Link>
        
        <Link href="/dashboard/workflows/create" className="block">
          <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium">创建工作流</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              使用工作流编辑器创建新的工作流
            </p>
          </div>
        </Link>
        
        <Link href="/dashboard/workflows/example" className="block">
          <div className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-medium">ReactFlow示例</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              查看最新版@xyflow/react的示例
            </p>
          </div>
        </Link>
      </div>
      
      <div className="rounded-md border p-4 bg-muted/10">
        <h3 className="font-medium mb-2">注意</h3>
        <p className="text-sm">
          我们已更新ReactFlow库至最新版本：<code className="px-1 py-0.5 bg-muted rounded text-sm font-mono">@xyflow/react</code>。
          新版本提供了更好的性能和更多功能。
        </p>
      </div>
    </div>
  );
} 