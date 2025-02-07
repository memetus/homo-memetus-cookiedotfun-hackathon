import { Injectable } from '@nestjs/common';
import { SolanaAgentKit, createSolanaTools } from 'solana-agent-kit';
import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FundData } from 'src/common/schemas/fund-data.schema';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/common/schemas/users.schema';

@Injectable()
export class SendAiService {
  constructor(
    @InjectModel('FundData')
    private fundDataModel: Model<FundData>,
    @InjectModel('Users')
    private usersModel: Model<Users>,
    private configService: ConfigService,
  ) {}

  async createFund(createFundDto: any, userId: string) {
    const userInfo = await this.usersModel.findById(userId);

    const name = createFundDto.symbol;
    const symbol = createFundDto.symbol;

    const response = await this.deployAgentToken(name, symbol);

    const newFundData = {
      ...createFundDto,
      userWallet: userInfo.wallet,
      balance: 100,
      initialBalance: 100,
      name: createFundDto.symbol,
      address: response,
      portfolio: [],
    };

    return this.fundDataModel.create(newFundData);
  }

  async initializeAgent() {
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
    });

    const solanaKit = new SolanaAgentKit(
      this.configService.get<string>('ai-agent.solanaKey'),
      this.configService.get<string>('ai-agent.rpcUrl'),
      {
        OPENAI_API_KEY: this.configService.get<string>('ai-agent.openai'),
      },
    );

    const tools = createSolanaTools(solanaKit);
    const memory = new MemorySaver();
    const config = { configurable: { thread_id: 'Solana Agent Kit!' } };

    return createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
    });
  }

  async runChat() {
    const agent = await this.initializeAgent();
    const config = { configurable: { thread_id: 'Solana Agent Kit!' } };

    // Example: Send a command to the agent
    const stream = await agent.stream(
      {
        messages: [new HumanMessage('Check my wallet balance')],
      },
      config,
    );

    // Handle the response
    for await (const chunk of stream) {
      if ('agent' in chunk) {
        console.log(chunk.agent.messages[0].content);
      } else if ('tools' in chunk) {
        console.log(chunk.tools.messages[0].content);
      }
      console.log('-------------------');
    }
  }

  async deployAgentToken(name: string, symbol: string) {
    // const agent = await this.initializeAgent();

    const agent = new SolanaAgentKit(
      this.configService.get<string>('ai-agent.solanaKey'),
      this.configService.get<string>('ai-agent.rpcUrl'),
      {
        OPENAI_API_KEY: this.configService.get<string>('ai-agent.openai'),
      },
    );

    const tokenMetadata = {
      name,
      symbol,
      uri: '',
      decimals: 9,
      initialSupply: 100_000_000,
    };

    const result = await agent.deployToken(
      tokenMetadata.name,
      tokenMetadata.uri,
      tokenMetadata.symbol,
      tokenMetadata.decimals,
      tokenMetadata.initialSupply,
    );

    return result.mint.toString();
  }

  async getNumberOfCreateByUser(userId: string) {
    const userInfo = await this.usersModel.findById(userId);

    const createdNumber = await this.fundDataModel.countDocuments({
      userWallet: userInfo.wallet,
    });

    return {
      createdNumber: createdNumber,
    };
  }
}
