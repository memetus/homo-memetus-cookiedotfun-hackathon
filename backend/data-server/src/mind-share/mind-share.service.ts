import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { MindShare } from 'src/common/schema/mind-share.schema';

@Injectable()
export class MindShareService {
  private readonly apiClient: any;

  constructor(
    @InjectModel('MindShare')
    private mindShareModel: Model<MindShare>,

    private readonly configService: ConfigService,
  ) {
    this.apiClient = axios.create({
      baseURL: 'https://api.cookie.fun/v2',
      headers: {
        'x-api-key': this.configService.get<string>('ai-agent.cookieService'),
      },
    });
  }

  async getAgentsPaged() {
    const pageSize = 25;
    const interval = '_7Days';
    let page = 1;
    let hasMoreData = true;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let processedPages = 0;

    try {
      while (hasMoreData) {
        try {
          const response = await this.apiClient.get('/agents/agentsPaged', {
            params: {
              interval,
              page,
              pageSize,
            },
          });

          if (response.data.ok.data.length === 0) {
            hasMoreData = false;
            continue;
          }

          const agents = Array.isArray(response.data?.ok)
            ? response.data?.ok
            : response.data?.ok
              ? [response.data.ok]
              : [];

          await Promise.all(
            agents.flatMap((agent) =>
              agent.data.map(async (agentData) => {
                const solanaContract = agentData.contracts?.find(
                  (contract) => contract.chain === -2,
                );

                if (!solanaContract) {
                  return;
                }

                const transformedAgent = {
                  agentName: agentData.agentName,
                  address: solanaContract?.contractAddress || '',
                  twitterUsernames: agentData.twitterUsernames,
                  mindshare: agentData.mindshare,
                  mindshareDeltaPercent: agentData.mindshareDeltaPercent,
                  marketCap: agentData.marketCap,
                  marketCapDeltaPercent: agentData.marketCapDeltaPercent,
                  price: agentData.price,
                  priceDeltaPercent: agentData.priceDeltaPercent,
                  liquidity: agentData.liquidity,
                  volume24Hours: agentData.volume24Hours,
                  volume24HoursDeltaPercent:
                    agentData.volume24HoursDeltaPercent,
                  holdersCount: agentData.holdersCount,
                  holdersCountDeltaPercent: agentData.holdersCountDeltaPercent,
                  averageImpressionsCount: agentData.averageImpressionsCount,
                  averageImpressionsCountDeltaPercent:
                    agentData.averageImpressionsCountDeltaPercent,
                  averageEngagementsCount: agentData.averageEngagementsCount,
                  averageEngagementsCountDeltaPercent:
                    agentData.averageEngagementsCountDeltaPercent,
                  followersCount: agentData.followersCount,
                  smartFollowersCount: agentData.smartFollowersCount,
                  topTweets: agentData.topTweets,
                };

                const existingAgent = await this.mindShareModel.findOne({
                  agentName: agentData.agentName,
                });

                const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

                if (existingAgent) {
                  await this.mindShareModel.updateOne(
                    { agentName: agentData.agentName },
                    {
                      $set: { ...transformedAgent, updatedAt: new Date() },
                      $push: {
                        mindshareHistory: {
                          mindshare: agentData.mindshare,
                          timestamp: new Date(),
                        },
                      },
                      $pull: {
                        mindshareHistory: {
                          timestamp: { $lt: twoHoursAgo },
                        },
                      },
                    },
                  );
                } else {
                  const newAgent = new this.mindShareModel({
                    ...transformedAgent,
                    updatedAt: new Date(),
                    mindshareHistory: [
                      { mindshare: agentData.mindshare, timestamp: new Date() },
                    ],
                  });
                  await newAgent.save();
                }
              }),
            ),
          );

          processedPages++;
          page++;

          // Wait for 1 second after every 20 pages
          if (processedPages % 20 === 0) {
            console.log(
              `Processed ${processedPages} pages. Waiting 1 seconds...`,
            );
            await delay(1000);
          } else {
            // Waiting for 0.1 seconds between each page request
            await delay(100);
          }
        } catch (error) {
          //  If rate limit error (429) occurs and some pages were processed, treat as success
          if (error.response?.status === 429 && processedPages > 0) {
            console.log(
              `Rate limit reached after processing ${processedPages} pages. Ending process...`,
            );
            return {
              success: true,
              message: `Successfully processed ${processedPages} pages before rate limit.`,
            };
          }
          throw error;
        }
      }
      return {
        success: true,
        message: `All agents data has been updated. Total pages: ${processedPages}`,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch and save agents: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTop10MindshareIncreases() {
    const currentMindshares = await this.mindShareModel.find({});

    const mindshareIncreases = currentMindshares.map((current) => {
      const sortedHistory = current.mindshareHistory.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
      );
      const pastMindshare = sortedHistory[1]?.mindshare;

      return {
        agentName: current.agentName,
        address: current.address,
        mindshareIncrease: pastMindshare
          ? current.mindshare - pastMindshare
          : 0,
      };
    });

    mindshareIncreases.sort(
      (a, b) => b.mindshareIncrease - a.mindshareIncrease,
    );

    return mindshareIncreases.slice(0, 10);
  }

  async getAgentByContract(contractAddress: string) {
    const interval: string = '_7Days';
    try {
      const response = await this.apiClient.get(
        `/agents/contractAddress/${contractAddress}`,
        {
          params: { interval },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch agent by contract address: ${error.message}`,
      );
    }
  }
}
