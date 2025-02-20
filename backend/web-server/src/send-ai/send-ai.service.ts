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
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

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

    const tokenA = await agent.deployToken(
      tokenMetadata.name,
      tokenMetadata.uri,
      tokenMetadata.symbol,
      tokenMetadata.decimals,
      tokenMetadata.initialSupply,
    );

    return tokenA;
  }

  async deployTokenAndAMM(name: string, symbol: string) {
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

    const tokenA = await agent.deployToken(
      tokenMetadata.name,
      tokenMetadata.uri,
      tokenMetadata.symbol,
      tokenMetadata.decimals,
      tokenMetadata.initialSupply,
    );

    const tokenAPublicKey = new PublicKey(tokenA);

    const solPublicKey = new PublicKey(
      'So11111111111111111111111111111111111111112',
    );

    // 시장 생성 및 AMM 풀 생성 함수 호출
    const result = await this.createMarketAndAmmPool(
      agent,
      tokenAPublicKey,
      solPublicKey,
    );

    return {
      createToken: tokenA,
      createMarket: result.marketSignatures,
      createAmm: result.signature,
    };
  }

  async createMarketAndAmmPool(
    agent: any,
    tokenAPublicKey: PublicKey,
    solPublicKey: PublicKey,
  ) {
    // 시장 생성
    const marketSignatures = await agent.openbookCreateMarket(
      tokenAPublicKey, // Base token
      solPublicKey, // Quote token
      1, // Lot size
      0.01, // Tick size
    );

    const marketId = new PublicKey(marketSignatures[0]);

    // AMM 풀 생성
    const baseAmount = '1000000000';
    const quoteAmount = '1000000000';
    const startTime = '0';

    const signature = await agent.raydiumCreateAmmV4(
      marketId,
      new BN(baseAmount),
      new BN(quoteAmount),
      new BN(startTime),
    );

    console.log('Raydium AMM Pool Created:', signature);

    return {
      marketSignatures,
      signature,
    };
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
