import { createClient } from '@blinkdotnew/sdk';

// Initialize Blink client with minimal configuration to prevent timeout issues
const blink = createClient({
  projectId: 'onebag-ai-studio-ptcjfa7a',
  authRequired: false // Static app, no auth needed
});

export default blink;