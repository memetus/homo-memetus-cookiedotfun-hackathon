import { registerAs } from '@nestjs/config';

export default registerAs('ai-agent', async () => {
  return {
    openai: process.env.OPENAI_API_KEY,
    coinGeckoService: process.env.COIN_GECKO_API_KEY,
    cookieService: process.env.COOKIE_API_KEY,
  };
});
