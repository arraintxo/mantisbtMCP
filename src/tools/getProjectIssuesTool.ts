import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const getProjectIssuesTool: Tool<any> = {
  name: 'getProjectIssues',
  description: 'Get a list of issues from a specific project in MantisBT. You can filter by status using filterId: 10=new, 20=feedback, 30=acknowledged, 40=confirmed, 50=assigned, 80=resolved, 90=closed',
  parameters: z.object({
    project_id: z.number().describe('ID of the project'),
    page: z.number().optional().describe('Page number (default: 1)'),
    pageSize: z.number().optional().describe('Number of issues per page (default: 50)'),
    filterId: z.number().optional().describe('Filter by status ID (10=new, 20=feedback, 30=acknowledged, 40=confirmed, 50=assigned, 80=resolved, 90=closed)'),
  }),
  execute: async (args, context) => {
    const { project_id, page, pageSize, filterId } = args as { project_id: number; page?: number; pageSize?: number; filterId?: number };
    const controller = new IssuesController();
    const issues = await controller.getProjectIssues(project_id, page, pageSize, filterId);
    return JSON.stringify(issues);
  },
};
