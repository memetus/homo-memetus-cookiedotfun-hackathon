import { registerAs } from '@nestjs/config';

export default registerAs('ai-agent', async () => {
  return {
    openai: process.env.OPENAI_API_KEY,
    rpcUrl: process.env.RPC_URL,
    solanaKey: process.env.SOLANA_PRIVATE_KEY,
        
  };
});
