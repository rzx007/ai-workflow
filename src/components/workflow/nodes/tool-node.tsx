'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface ToolNodeData {
  label: string;
  name: string;
  description: string;
}

export const ToolNode = memo(({ data }: NodeProps<ToolNodeData>) => {
  return (
    <div className="rounded-lg border-2 border-green-500 bg-white p-3 shadow-md w-60">
      <div className="font-semibold text-green-700 pb-1 border-b">{data.label}</div>
      <div className="mt-2">
        <div className="text-sm font-medium">{data.name}</div>
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </div>
  );
});

ToolNode.displayName = 'ToolNode'; 