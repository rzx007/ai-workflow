'use client';

// 基于Mastra官方API的Workflow实现

// 步骤类型
export type StepType = 'agent' | 'tool' | 'condition' | 'input' | 'output' | 'custom';

// 步骤结果
export type StepResult = any;

// 步骤状态
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

// 步骤上下文接口
export interface StepContext {
  variables: Record<string, any>;
  stepResults: Record<string, StepResult>;
  currentStepId?: string;
  metadata?: Record<string, any>;
}

// 步骤选项接口
export interface StepOptions {
  id: string;
  name: string;
  description?: string;
  timeout?: number;
  retries?: number;
  condition?: StepCondition;
  metadata?: Record<string, any>;
}

// 步骤条件函数类型
export type StepCondition = (context: StepContext) => boolean | Promise<boolean>;

// 步骤处理函数类型
export type StepHandler = (input: any, context: StepContext) => Promise<StepResult>;

// 步骤接口
export interface Step {
  id: string;
  type: StepType;
  name: string;
  description?: string;
  handler: StepHandler;
  condition?: StepCondition;
  timeout?: number;
  retries?: number;
  metadata?: Record<string, any>;
}

// 工作流状态
export type WorkflowStatus = 'idle' | 'running' | 'completed' | 'failed' | 'suspended';

// 工作流运行记录
export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: WorkflowStatus;
  context: StepContext;
  startTime: Date;
  endTime?: Date;
  steps: Record<string, {
    status: StepStatus;
    startTime?: Date;
    endTime?: Date;
    result?: StepResult;
    error?: Error;
  }>;
  error?: Error;
}

// 工作流接口
export interface WorkflowOptions {
  id: string;
  name: string;
  description?: string;
  metadata?: Record<string, any>;
}

// 工作流类
export class Workflow {
  id: string;
  name: string;
  description: string;
  metadata: Record<string, any>;
  
  private steps: Map<string, Step> = new Map();
  private edges: Map<string, string[]> = new Map();
  private entryPoints: string[] = [];
  private runs: Map<string, WorkflowRun> = new Map();

  constructor(options: WorkflowOptions) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description || '';
    this.metadata = options.metadata || {};
  }

  // 添加步骤
  step(options: StepOptions, handler: StepHandler): this {
    const step: Step = {
      id: options.id,
      type: 'custom',
      name: options.name,
      description: options.description,
      handler,
      condition: options.condition,
      timeout: options.timeout,
      retries: options.retries,
      metadata: options.metadata
    };

    this.steps.set(options.id, step);
    
    // 如果这是第一个步骤，将其设为入口点
    if (this.steps.size === 1) {
      this.entryPoints.push(options.id);
    }
    
    return this;
  }

  // 设置步骤后的下一步
  after(stepId: string, nextStepId: string): this {
    const edges = this.edges.get(stepId) || [];
    if (!edges.includes(nextStepId)) {
      edges.push(nextStepId);
      this.edges.set(stepId, edges);
    }
    return this;
  }

  // 链式添加下一步
  then(options: StepOptions, handler: StepHandler): this {
    // 添加新步骤
    this.step(options, handler);
    
    // 找到最后添加的非当前步骤
    const lastStepId = Array.from(this.steps.keys())
      .filter(id => id !== options.id)
      .pop();
    
    // 如果有上一步，将当前步骤设为其后继
    if (lastStepId) {
      this.after(lastStepId, options.id);
    } else {
      // 如果没有上一步，当前步骤为入口点
      this.entryPoints.push(options.id);
    }
    
    return this;
  }

  // 添加条件步骤
  if(condition: StepCondition): this {
    // 条件由步骤的condition属性处理
    // 返回this允许链式调用
    return this;
  }

  // 添加循环步骤
  while(condition: StepCondition, stepsBuilder: (workflow: Workflow) => void): this {
    // 实际应用中会实现循环逻辑
    // 这里为简化版
    return this;
  }

  // 创建运行实例
  createRun(initialVariables?: Record<string, any>): WorkflowRun {
    const runId = `run-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const run: WorkflowRun = {
      id: runId,
      workflowId: this.id,
      status: 'idle',
      context: {
        variables: initialVariables || {},
        stepResults: {}
      },
      startTime: new Date(),
      steps: {}
    };

    this.runs.set(runId, run);
    return run;
  }

  // 执行工作流
  async execute(input: Record<string, any> = {}, runId?: string): Promise<any> {
    // 获取或创建运行实例
    let run: WorkflowRun;
    if (runId && this.runs.has(runId)) {
      run = this.runs.get(runId)!;
    } else {
      run = this.createRun(input);
    }

    // 设置运行状态为运行中
    run.status = 'running';
    run.context.variables = { ...run.context.variables, ...input };

    try {
      // 找到入口点
      if (this.entryPoints.length === 0) {
        throw new Error('工作流没有入口点');
      }

      // 从入口点开始执行
      const entryPointId = this.entryPoints[0];
      const result = await this.executeStep(entryPointId, run);

      // 工作流执行完成
      run.status = 'completed';
      run.endTime = new Date();
      return result;
    } catch (error) {
      // 工作流执行失败
      run.status = 'failed';
      run.endTime = new Date();
      run.error = error as Error;
      throw error;
    }
  }

  // 执行步骤
  private async executeStep(stepId: string, run: WorkflowRun): Promise<any> {
    const step = this.steps.get(stepId);
    if (!step) {
      throw new Error(`找不到ID为${stepId}的步骤`);
    }

    // 如果步骤有条件，先评估条件
    if (step.condition) {
      const shouldRun = await step.condition(run.context);
      if (!shouldRun) {
        // 跳过此步骤
        run.steps[stepId] = {
          status: 'skipped',
          startTime: new Date(),
          endTime: new Date()
        };
        
        // 找下一步骤执行
        const nextSteps = this.edges.get(stepId) || [];
        if (nextSteps.length > 0) {
          return this.executeStep(nextSteps[0], run);
        }
        return undefined;
      }
    }

    // 更新当前执行的步骤ID
    run.context.currentStepId = stepId;
    
    // 记录步骤开始执行
    run.steps[stepId] = {
      status: 'running',
      startTime: new Date()
    };

    try {
      // 执行当前步骤
      const result = await step.handler(run.context.variables, run.context);

      // 记录步骤执行成功
      run.steps[stepId].status = 'completed';
      run.steps[stepId].endTime = new Date();
      run.steps[stepId].result = result;

      // 存储步骤结果
      run.context.stepResults[stepId] = result;

      // 找到下一步骤
      const nextSteps = this.edges.get(stepId) || [];
      
      // 如果有下一步，继续执行
      if (nextSteps.length > 0) {
        return this.executeStep(nextSteps[0], run);
      }
      
      // 如果没有下一步，返回当前步骤结果
      return result;
    } catch (error) {
      // 记录步骤执行失败
      run.steps[stepId].status = 'failed';
      run.steps[stepId].endTime = new Date();
      run.steps[stepId].error = error as Error;
      
      // 重新抛出错误
      throw error;
    }
  }

  // 暂停工作流
  suspend(runId: string): boolean {
    const run = this.runs.get(runId);
    if (run && run.status === 'running') {
      run.status = 'suspended';
      return true;
    }
    return false;
  }

  // 恢复工作流
  async resume(runId: string, input: Record<string, any> = {}): Promise<any> {
    const run = this.runs.get(runId);
    if (!run || run.status !== 'suspended') {
      throw new Error(`找不到ID为${runId}的暂停的工作流运行实例`);
    }
    
    // 更新输入变量
    run.context.variables = { ...run.context.variables, ...input };
    
    // 从当前步骤继续执行
    const currentStepId = run.context.currentStepId;
    if (!currentStepId || !this.steps.has(currentStepId)) {
      throw new Error('无法确定要恢复的步骤');
    }
    
    // 设置状态为运行中
    run.status = 'running';
    
    try {
      // 继续执行当前步骤
      const result = await this.executeStep(currentStepId, run);
      
      // 工作流执行完成
      run.status = 'completed';
      run.endTime = new Date();
      return result;
    } catch (error) {
      // 工作流执行失败
      run.status = 'failed';
      run.endTime = new Date();
      run.error = error as Error;
      throw error;
    }
  }

  // 获取工作流运行状态
  getRunStatus(runId: string): WorkflowStatus | undefined {
    const run = this.runs.get(runId);
    return run?.status;
  }
  
  // 获取工作流运行实例
  getRun(runId: string): WorkflowRun | undefined {
    return this.runs.get(runId);
  }
  
  // 获取所有步骤
  getSteps(): Step[] {
    return Array.from(this.steps.values());
  }
}

// 创建工作流的辅助函数
export function createWorkflow(options: WorkflowOptions): Workflow {
  return new Workflow(options);
} 