'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

interface ConditionNodeData {
  label: string;
  name: string;
  condition: string;
  description: string;
}

export const ConditionNode = memo(({ data }: NodeProps<ConditionNodeData>) => {
  return (
    <div className="rounded-lg border-2 border-orange-500 bg-white p-3 shadow-md w-60">
      <div className="font-semibold text-orange-700 pb-1 border-b">{data.label}</div>
      <div className="mt-2">
        <div className="text-sm font-medium">{data.name}</div>
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
        <div className="mt-2 text-xs bg-orange-50 p-1 rounded text-orange-700">
          条件: {data.condition}
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-orange-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-orange-500" />
      <Handle type="source" position={Position.Right} id="true" className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Left} id="false" className="w-3 h-3 bg-red-500" />
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode'; 