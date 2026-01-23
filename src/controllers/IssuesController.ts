import axios, { AxiosResponse } from 'axios';
import { config } from '../config/env';
import { Issue, IssuesList, CreateIssue, IssueSchema, IssuesListSchema, CreateIssueSchema } from '../types/Issue';

export class IssuesController {
    private baseURL = config.API_URL;
    private headers = {
        'Authorization': config.API_TOKEN,
        'Content-Type': 'application/json',
    };

    async getIssue(issueId: number): Promise<Issue> {
        try {
            const response: AxiosResponse = await axios.get(
                `${this.baseURL}/api/rest/issues/${issueId}`,
                { headers: this.headers }
            );

            // Extract issue from the response (API returns { "issues": [issue] })
            const issueData = response.data.issues?.[0] || response.data;
            return IssueSchema.parse(issueData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get issue: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    async getIssues(page = 1, pageSize = 50, filterId?: number): Promise<IssuesList> {
        /*
        axios.interceptors.request.use(request => {
            console.log('Starting Request:', JSON.stringify(request, null, 2));
            return request;
        });

        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2));
            return response;
        }, error => {
            console.error('Request Error:', JSON.stringify(error, null, 2));
            return Promise.reject(error);
        });
        */
        try {
            const params: any = { page, page_size: pageSize };
            if (filterId !== undefined) {
                params.filter_id = filterId;
            }
            
            const response: AxiosResponse = await axios.get(
                `${this.baseURL}/api/rest/issues`,
                {
                    headers: this.headers,
                    params
                }
            );
            return IssuesListSchema.parse(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get issues: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    async getProjectIssues(project_id: number, page = 1, pageSize = 50, filterId?: number): Promise<IssuesList> {
        try {
            const params: any = { project_id, page, page_size: pageSize };
            if (filterId !== undefined) {
                params.filter_id = filterId;
            }
            
            const response: AxiosResponse = await axios.get(
                `${this.baseURL}/api/rest/issues`,
                {
                    headers: this.headers,
                    params
                }
            );
            return IssuesListSchema.parse(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to get issues: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    async createIssue(issueData: CreateIssue): Promise<Issue> {
        try {
            // Validate input
            const validatedData = CreateIssueSchema.parse(issueData);

            const response: AxiosResponse = await axios.post(
                `${this.baseURL}/api/rest/issues/`,
                validatedData,
                { headers: this.headers }
            );

            // Extract issue from the response
            const newIssue = response.data.issue || response.data;
            return IssueSchema.parse(newIssue);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to create issue: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    async updateIssue(issueId: number, issueData: Partial<CreateIssue>): Promise<Issue> {
        try {
            const response: AxiosResponse = await axios.patch(
                `${this.baseURL}/api/rest/issues/${issueId}`,
                issueData,
                { headers: this.headers }
            );

            const updatedIssue = response.data.issue || response.data;
            return IssueSchema.parse(updatedIssue);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to update issue: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }

    async deleteIssue(issueId: number): Promise<void> {
        try {
            await axios.delete(
                `${this.baseURL}/api/rest/issues/${issueId}`,
                { headers: this.headers }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to delete issue: ${error.response?.data?.message || error.message}`);
            }
            throw error;
        }
    }
}
