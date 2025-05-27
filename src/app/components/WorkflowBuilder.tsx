"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function WorkflowBuilder() {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDesc, setWorkflowDesc] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateWorkflow(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          name: workflowName,
          description: workflowDesc,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "创建工作流失败");
      }

      // 处理成功响应
      console.log("工作流创建成功:", data);
      setWorkflowName("");
      setWorkflowDesc("");
    } catch (error) {
      console.error("创建工作流错误:", error);
      // 这里可以添加错误提示UI
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCreateWorkflow} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          工作流名称
        </label>
        <Input
          id="name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          placeholder="输入工作流名称"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          工作流描述
        </label>
        <Textarea
          id="description"
          value={workflowDesc}
          onChange={(e) => setWorkflowDesc(e.target.value)}
          placeholder="描述这个工作流的用途..."
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "创建中..." : "创建工作流"}
      </Button>
    </form>
  );
}
