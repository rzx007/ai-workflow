'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface AgentNodeData {
  label: string;
  name: string;
  model: string;
  description: string;
}

export const AgentNode = memo(({ data }: NodeProps<AgentNodeData>) => {
  return (
    <div className="rounded-lg border-2 border-blue-500 bg-white p-3 shadow-md w-60">
      <div className="font-semibold text-blue-700 pb-1 border-b">{data.label}</div>
      <div className="mt-2">
        <div className="text-sm font-medium">{data.name}</div>
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
        <div className="mt-2 text-xs bg-blue-50 p-1 rounded text-blue-700">
          模型: {data.model || 'gpt-4'}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
});

AgentNode.displayName = 'AgentNode'; 