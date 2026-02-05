import { FastMCP } from 'fastmcp';
import { getIssueTool } from './tools/getIssueTool';
import { getIssuesTool } from './tools/getIssuesTool';
import { getProjectIssuesTool } from './tools/getProjectIssuesTool';
import { createIssueTool } from './tools/createIssueTool';
import { updateIssueTool } from './tools/updateIssueTool';
import { getProjectTool } from './tools/getProjectTool';
import { getProjectsTool } from './tools/getProjectsTool';
import { getUserTool } from './tools/getUserTool';
import { getCurrentUserTool } from './tools/getCurrentUserTool';
import { createIssueNoteTool } from './tools/createIssueNoteTool';
import { config } from './config/env';
import axios from 'axios';


const server = new FastMCP({
  name: 'mantisbt-mcp-server',
  version: '1.0.0',
});

// Add all tools to the server
server.addTool(getIssueTool);
server.addTool(getIssuesTool);
server.addTool(getProjectIssuesTool);
server.addTool(createIssueTool);
server.addTool(updateIssueTool);
server.addTool(getProjectTool);
server.addTool(getProjectsTool);
//server.addTool(getUserTool);
//server.addTool(getCurrentUserTool);
server.addTool(createIssueNoteTool);

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})
    
axios.interceptors.response.use(response => {
  console.log('Response:', response.data)
  return response
})

// Start the server
async function main() {
  try {
    const transportMode = config.TRANSPORT_MODE;
    
    if (transportMode === 'stdio') {
      // Start in stdio mode (for Claude Desktop and other MCP clients)
      await server.start({
        transportType: 'stdio',
      });
      console.error('MantisBT MCP Server started successfully in stdio mode');
    } else if (transportMode === 'httpStream') {
      // Start in HTTP stream mode (for SSE connections)
      await server.start({
        transportType: 'httpStream',
        httpStream: {
          port: config.HTTP_PORT,
          host: config.HTTP_HOST,
        },
      });
      console.error(`MantisBT MCP Server started successfully in httpStream mode on ${config.HTTP_HOST}:${config.HTTP_PORT}`);
    } else {
      throw new Error(`Invalid TRANSPORT_MODE: ${transportMode}. Must be 'stdio' or 'httpStream'`);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await server.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await server.stop();
  process.exit(0);
});

if (require.main === module) {
  main().catch(console.error);
}
