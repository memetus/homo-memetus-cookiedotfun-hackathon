# Homo-Memetus X Cookiedotfun DEFAI Hackathon

> This is Homo Memetus X Cookiedotfun DEFAI Hackathon submission repository

👉🏻 [Project DEMO](https://homo-memetus-cookiedotfun-hackathon.vercel.app "HOMO MEMETUS Project DEMO")

👉🏻 [Article - Cookie Data Swarm API Capabilities, Suggested Use Cases, and What $HOMO is Building Using it](https://x.com/cto_memetus/status/1886345996340527508 "Cookie Data Swarm API Capabilities, Suggested Use Cases, and What $HOMO is Building Using it")

👉🏻 [Article - The @cookiedotfun #DeFAI Hackathon Dashboard is a true gem](https://x.com/cto_memetus/status/1887070393627980154 "The @cookiedotfun #DeFAI Hackathon Dashboard is a true gem")

👉🏻 [Article - Leveraging DeepSeek for $HOMO's COOKIE DeFAI Hackathon Architecture](https://x.com/cto_memetus/status/1883926659067453926 "Leveraging DeepSeek for $HOMO's  COOKIE DeFAI Hackathon Architecture")

### Detail

**FE DOCUMENTATION**
[HOMO MEMETUS FE DOCS](https://github.com/memetus/homo-memetus-cookiedotfun-hackathon/tree/main/frontend)

**BE DOCUMENTATION**
[HOMO MEMETUS BE DOCS](https://github.com/memetus/homo-memetus-cookiedotfun-hackathon/blob/main/backend/web-server/README.md)

### Demo User Flow

1. Connect wallet to start. You can go directly to the Dashboard by clicking 'Go To Dashboard' to see trading agents running.
2. If you want to prompt your strategy to tokenize it, do so on the main page. We are limiting access to prompt and tokenize strategies up to 5 times.
3. Prompt, confirm your strategy and enter the ticker. For this hackathon demo, you don't need to include an image, Twitter links, website, or other details yet.
4. Once the strategy is tokenized through the Solana Agent Kit, you can go to the Dashboard to see how the agent trades for you using Cookie Data Swarm API. It trades every hour, so you may not see its portfolio immediately after tokenization. Keep checking for updates!

### Technical Note

1. **AI and Natural Language Processing:**

- Langchain framework is utilized for building scalable AI/LLM applications.
- RAG: Retrieval is implemented using MongoDB Atlas vector search as the vector database. This allows for efficient semantic search and retrieval of relevant information. By using this approach so we could directly vectorize and use aggregated data for RAG without maintaining a separate vector database. This approach improves data consistency and reduces data duplication.
- LLM: GPT-4o with fine-tuning focused on cryptocurrency, AI agent and meme coin domains.
  - Hourly analysis of top 20 coins by mindshare, incorporating market data (price, market cap, etc.) while also integrating Cookie Data Swarm API.
  - Generates investment decisions based on user prompts and investment strategies.
  - Feedback loop: Continuously improves investment decisions by analyzing trading records and profitability, reinforcing learning to refine the model's performance over time.

2. **SendAI Solana Agent Kit:**

- Enables creation of SPL-tokens on Solana mainnet, representing AI Agent strategies.
- Implemented Raydium AMM Pool creation in code level (not deployed live to avoid confusion with ongoing projects)

3. **Cookie Data Swarm API:**

- **`GET /v2/agents/agentsPaged`**: This endpoint is used to fetch a paged list of AI agents, sorted by mindshare over a specified interval (7 days). We track 790 Solana tokens, identifying top 20 by mindshare growth hourly.
- **`GET /v2/agents/twitterUsername/{twitterUsername}` and `GET /v2/agents/contractAddress/{contractAddress}`**: These endpoints are used to gather detailed token information for projects. We obtain comprehensive data including market capitalization, price, liquidity, volume, holder counts, and social engagement metrics. T
- **`GET /v1/hackathon/search/{searchQuery}`**: This endpoint is used to analyze the sentiment surrounding the top 20 mindshare gaining coins we have sorted. We perform sentiment analysis to derive a sentiment score. This score is then integrated into our final investment decision-making process.

4. **Frontend Architecture**

- **Langchain & Langgraph Framework:** Enable users to input investment strategies as prompts, which are then refined and utilized by the AI. This facilitates user-friendly interaction and strategy tuning.
- **Tavily Web Search AI:** Used for gathering real-time token information and keyword-related insights for specific tokens, enhancing the AI's knowledge base and decision-making.
- **Next.js:** Employed as the base framework for the frontend, ensuring a performant, scalable, and modern user interface.
- **Rug Checker Module:** An AI-driven module utilizing Tavily Web Search to extract project descriptions based on token addresses. This information is then used to classify tokens and assign rug-check weights, enabling risk assessment.
  - Project analysis is performed using data from the Twitter API and GitHub API.
  - On-chain analysis is performed using the Helius API to track creator transfers, token sales, and liquidity distribution. This includes assessing the health of top holders and identifying potential risks.

5. **Backend Architecture:**

- NestJS framework: Provides a robust, scalable server-side application structure
  - AI agent trading server: Executes automated virtual trading based on AI strategies
  - Data server: Aggregates data from multiple sources
    - Cookie API integration:
      - Utilizes "Get Agents Paged" endpoint
      - Tracks 790 Solana tokens, identifying top 20 by mindshare growth hourly
      - Uses 7-day interval for trend analysis
    - CoinGecko API integration: Fetches comprehensive coin data: categories, metadata, market data, historical prices. This enhances price analysis done in Cookie API integration.
  - Web server: Implements RESTful API to serve data to the Web UI/UX

6. **Cloud Infrastructure and CI/CD:**

- AWS ECS (Elastic Container Service):
  - Enables containerized deployment with built-in scalability, to bring this project to a proper launch after the hackathon
- AWS Code Pipeline for CI/CD:
  - Integrates with GitHub repository for version control, using Docker for containerization
  - Leverages AWS ECR (Elastic Container Registry) for storing and managing container images
  - AWS CodeBuild and CodeDeploy automate the build and deployment processes

**Purpose and Significance:**

1. Advanced AI-driven crypto analysis:
   - The combination of RAG and fine-tuned GPT-4o provides highly accurate and context-aware investment insights
   - Real-time analysis of market trends and sentiment (mindshare) offers a competitive edge
2. Solana Agent Kit integration:
   - Tokenization of AI strategies creates a novel asset class
   - Potential for decentralized participation in AI-driven trading strategies
3. Scalable and robust backend:
   - NestJS provides a solid foundation for handling complex data processing and API serving
   - Modular architecture allows for easy expansion and maintenance
4. Cloud-native and DevOps-friendly infrastructure:
   - AWS ECS ensures high availability and scalability
   - CI/CD pipeline enables rapid iteration and deployment of new features

**Technical Achievements:**

1. AI Performance:
   - The RAG system, combined with fine-tuned GPT-4o, has demonstrated superior accuracy in crypto market analysis
   - Feedback loop continuously improves the model's performance, adapting to market changes
2. Data Integration:
   - Successfully aggregated and normalized data from multiple sources (Cookie API, CoinGecko)
   - Created a comprehensive dataset for AI analysis, covering both established and emerging tokens
3. Scalability and Reliability:
   - AWS ECS deployment ensures the system can handle increasing loads
   - Containerization allows for consistent development and production environments
4. Rapid Development Cycle:
   - CI/CD pipeline enables quick deployment of updates and new features
   - Containerization facilitates easy testing and rollback if needed
