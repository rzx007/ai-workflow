"use client";

import {
  BookOpen,
  Bot,
  Database,
  FileText,
  GanttChart,
  Gauge,
  Hammer,
  Settings,
  Wrench,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// 自定义菜单数据
const data = {
  user: {
    name: "用户",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "AI工作流平台",
      logo: GanttChart,
      plan: "专业版",
    },
  ],
  navMain: [
    {
      title: "控制台",
      url: "/dashboard",
      icon: Gauge,
      isActive: true,
    },
    {
      title: "工作流管理",
      url: "/dashboard/workflows",
      icon: GanttChart,
      items: [
        {
          title: "全部工作流",
          url: "/dashboard/workflows",
        },
        {
          title: "创建工作流",
          url: "/dashboard/workflows/create",
        },
        {
          title: "工作流示例",
          url: "/dashboard/workflows/example",
        },
      ],
    },
    {
      title: "AI代理管理",
      url: "/dashboard/agents",
      icon: Bot,
      items: [
        {
          title: "全部代理",
          url: "/dashboard/agents",
        },
        {
          title: "创建代理",
          url: "/dashboard/agents/create",
        },
      ],
    },
    {
      title: "文档",
      url: "/docs/workflow-editor",
      icon: BookOpen,
      items: [
        {
          title: "工作流编辑器指南",
          url: "/docs/workflow-editor",
        },
        {
          title: "Mastra框架文档",
          url: "https://github.com/example/mastra",
        },
        {
          title: "ReactFlow文档",
          url: "https://xyflow.com/react-flow",
        },
      ],
    },
    {
      title: "数据与资源",
      url: "#",
      icon: Database,
      items: [
        {
          title: "知识库",
          url: "/dashboard/datasets",
        },
        {
          title: "工具管理",
          url: "/dashboard/tools",
        },
      ],
    },
    {
      title: "设置",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "文档资源",
      url: "/dashboard/docs",
      icon: FileText,
    },
    {
      name: "工具集",
      url: "/dashboard/tools",
      icon: Hammer,
    },
    {
      name: "API连接",
      url: "/dashboard/api",
      icon: Wrench,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
