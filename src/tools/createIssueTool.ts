import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const createIssueTool: Tool<any> = {
  name: 'createIssue',
  description: 'Create a new issue in MantisBT',
  parameters: z.object({
    summary: z.string().describe('Issue summary'),
    description: z.string().optional().describe('Issue description'),
    projectId: z.number().describe('Project ID'),
    categoryId: z.number().optional().describe('Category ID'),
    priorityId: z.number().optional().describe('Priority ID'),
    severityId: z.number().optional().describe('Severity ID'),
    handlerId: z.number().optional().describe('Handler/Assignee user ID'),
  }),
  execute: async (args, context) => {
    const { summary, description, projectId, categoryId, priorityId, severityId, handlerId } = args as {
      summary: string;
      description?: string;
      projectId: number;
      categoryId?: number;
      priorityId?: number;
      severityId?: number;
      handlerId?: number;
    };
    
    const controller = new IssuesController();
    const issueData = {
      summary,
      description,
      project: { id: projectId },
      ...(categoryId && { category: { id: categoryId } }),
      ...(priorityId && { priority: { id: priorityId } }),
      ...(severityId && { severity: { id: severityId } }),
      ...(handlerId && { handler: { id: handlerId } }),
    };
    
    const newIssue = await controller.createIssue(issueData);
    return JSON.stringify(newIssue, null, 2);
  },
};
