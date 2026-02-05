import dotenv from 'dotenv';

dotenv.config();

export const config = {
  API_URL: process.env.API_URL || '',
  API_TOKEN: process.env.API_TOKEN || '',
  // Transport mode: 'stdio' or 'httpStream' (default: 'stdio')
  TRANSPORT_MODE: process.env.TRANSPORT_MODE || 'stdio',
  // HTTP Stream settings (only used when TRANSPORT_MODE is 'httpStream')
  HTTP_PORT: parseInt(process.env.HTTP_PORT || '8088', 10),
  HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
} as const;

if (!config.API_URL) {
  throw new Error('API_URL environment variable is required');
}

if (!config.API_TOKEN) {
  throw new Error('API_TOKEN environment variable is required');
}
