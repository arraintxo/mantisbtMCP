import { z } from 'zod';

// Zod schemas for validation
export const IssueNoteSchema = z.object({
  id: z.number(),
  text: z.string(),
  view_state: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  reporter: z.object({
    id: z.number(),
    name: z.string(),
    real_name: z.string().optional(),
    email: z.string().optional(),
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  time_tracking: z.object({
    duration: z.string(),
  }).optional(),
});

export const IssueNotesListSchema = z.object({
  notes: z.array(IssueNoteSchema),
});

export const CreateIssueNoteSchema = z.object({
  text: z.string().min(1),
  view_state: z.object({
    id: z.number(),
  }).optional(),
  time_tracking: z.object({
    duration: z.string(),
  }).optional(),
});

export type IssueNote = z.infer<typeof IssueNoteSchema>;
export type IssueNotesList = z.infer<typeof IssueNotesListSchema>;
export type CreateIssueNote = z.infer<typeof CreateIssueNoteSchema>;
