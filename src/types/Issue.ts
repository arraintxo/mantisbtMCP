import { z } from 'zod';
import type { paths } from './api';

// Extract types from the generated API types
export type IssueResponse = paths['/api/rest/issues/{issue_id}']['get']['responses']['200']['content']['application/json'];
export type IssuesListResponse = paths['/api/rest/issues']['get']['responses']['200']['content']['application/json'];

// Zod schemas for validation
export const IssueSchema = z.object({
  id: z.number(),
  summary: z.string(),
  description: z.string().optional(),
  project: z.object({
    id: z.number(),
    name: z.string(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }).optional(),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
    real_name: z.string().optional(),
    email: z.string().optional(),
  }),
  status: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
    color: z.string().optional(),
  }),
  resolution: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  priority: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  severity: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const IssuesListSchema = z.object({
  issues: z.array(IssueSchema),
});

export const CreateIssueSchema = z.object({
  summary: z.string().min(1),
  description: z.string().optional(),
  project: z.object({
    id: z.number(),
  }),
  category: z.object({
    id: z.number(),
  }).optional(),
  priority: z.object({
    id: z.number(),
  }).optional(),
  severity: z.object({
    id: z.number(),
  }).optional(),
  status: z.object({
    id: z.number(),
  }).optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
export type IssuesList = z.infer<typeof IssuesListSchema>;
export type CreateIssue = z.infer<typeof CreateIssueSchema>;
