// 扩展@xyflow/react的类型定义

import '@xyflow/react';

declare module '@xyflow/react' {
  export type BackgroundVariant = 'dots' | 'lines' | 'cross';

  export interface NodeProps<T = any> {
    id: string;
    data: T;
    selected?: boolean;
    dragging?: boolean;
    zIndex?: number;
    type?: string;
    xPos?: number;
    yPos?: number;
    targetPosition?: Position;
    sourcePosition?: Position;
    isConnectingStart?: boolean;
    isConnectingEnd?: boolean;
    dragHandle?: boolean | string;
  }

  export interface NodeComponentProps<T = any> {
    id: string;
    data: T;
    selected?: boolean;
    type?: string;
    isConnectingStart?: boolean;
    isConnectingEnd?: boolean;
    zIndex?: number;
    targetPosition?: Position;
    sourcePosition?: Position;
  }

  // 扩展自定义节点的数据类型
  export interface AgentNodeData {
    label: string;
    name: string;
    model: string;
    description: string;
  }

  export interface ToolNodeData {
    label: string;
    name: string;
    description: string;
  }

  export interface ConditionNodeData {
    label: string;
    name: string;
    condition: string;
    description: string;
  }
} 