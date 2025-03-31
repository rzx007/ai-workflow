'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 示例数据
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 25 },
    data: { label: '输入' },
  },
  {
    id: '2',
    position: { x: 100, y: 125 },
    data: { label: '处理节点 1' },
  },
  {
    id: '3',
    position: { x: 400, y: 125 },
    data: { label: '处理节点 2' },
  },
  {
    id: '4',
    type: 'output',
    position: { x: 250, y: 250 },
    data: { label: '输出' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

export default function ReactFlowExamplePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ReactFlow 示例</h1>
        <p className="text-muted-foreground">使用最新的@xyflow/react库</p>
      </div>

      <div className="border rounded-md h-[700px] w-full flex">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>

      <div className="rounded-md border p-4 bg-muted/10">
        <h3 className="font-medium mb-2">操作说明</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>拖动节点改变位置</li>
          <li>点击并拖动节点边缘可以创建连接</li>
          <li>使用右下角的控件可以缩放和调整视图</li>
          <li>使用右下角的小地图可以快速导航到图表的不同部分</li>
        </ul>
      </div>
    </div>
  );
} 