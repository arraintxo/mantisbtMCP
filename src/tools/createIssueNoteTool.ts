import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssueNotesController } from '../controllers/IssueNotesController';

export const createIssueNoteTool: Tool<any> = {
  name: 'createIssueNote',
  description: 'Create a note for an issue in MantisBT',
  parameters: z.object({
    issueId: z.number().describe('The ID of the issue to add note to'),
    text: z.string().describe('The note text'),
    viewStateId: z.number().optional().describe('View state ID for the note'),
    timeTracking: z.string().optional().describe('Time tracking value in hours (HH:MM)'),
  }),
  execute: async (args, context) => {
    const { issueId, text, viewStateId, timeTracking } = args as {
      issueId: number;
      text: string;
      viewStateId?: number;
      timeTracking?: string;
    };
    
    const controller = new IssueNotesController();
    const noteData = {
      text,
      ...(viewStateId && { view_state: { id: viewStateId } }),
      ...(timeTracking && { time_tracking: { duration: timeTracking } }),
    };
    
    const newNote = await controller.createIssueNote(issueId, noteData);
    return JSON.stringify(newNote, null, 2);
  },
};
