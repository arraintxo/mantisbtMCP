import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const updateIssueTool: Tool<any> = {
  name: 'updateIssue',
  description: 'Update an existing issue in MantisBT',
  parameters: z.object({
    issueId: z.number().describe('Issue ID to update'),
    summary: z.string().optional().describe('Issue summary'),
    description: z.string().optional().describe('Issue description'),
    projectId: z.number().optional().describe('Project ID'),
    categoryId: z.number().optional().describe('Category ID'),
    priorityId: z.number().optional().describe('Priority ID'),
    severityId: z.number().optional().describe('Severity ID'),
    statusId: z.number().optional().describe('Status ID (10=new, 20=feedback, 30=acknowledged, 40=confirmed, 50=assigned, 80=resolved, 90=closed)'),
    handlerId: z.number().optional().describe('Handler/Assignee user ID'),
  }),
  execute: async (args, context) => {
    const { issueId, summary, description, projectId, categoryId, priorityId, severityId, statusId, handlerId } = args as {
      issueId: number;
      summary?: string;
      description?: string;
      projectId?: number;
      categoryId?: number;
      priorityId?: number;
      severityId?: number;
      statusId?: number;
      handlerId?: number;
    };
    
    const controller = new IssuesController();
    const issueData: any = {};
    
    if (summary) issueData.summary = summary;
    if (description) issueData.description = description;
    if (projectId) issueData.project = { id: projectId };
    if (categoryId) issueData.category = { id: categoryId };
    if (priorityId) issueData.priority = { id: priorityId };
    if (severityId) issueData.severity = { id: severityId };
    if (statusId) issueData.status = { id: statusId };
    if (handlerId) issueData.handler = { id: handlerId };
    
    const updatedIssue = await controller.updateIssue(issueId, issueData);
    return JSON.stringify(updatedIssue, null, 2);
  },
};
