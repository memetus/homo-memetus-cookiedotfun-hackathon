import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MindShareService {
  private readonly apiClient: any;

  constructor(private readonly configService: ConfigService) {
    this.apiClient = axios.create({
      baseURL: 'https://api.cookie.fun/v2',
      headers: {
        'x-api-key': this.configService.get<string>('ai-agent.cookieService'),
      },
    });
  }

  async getAgentsPaged() {
    const interval = '_3Days';
    const page = 1;
    const pageSize = 10;

    try {
      const response = await this.apiClient.get('/agents/agentsPaged', {
        params: {
          interval,
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new HttpException(
          'Cookie API request timeout',
          HttpStatus.GATEWAY_TIMEOUT,
        );
      }
      if (error.response) {
        // API 서버가 응답은 했지만 2xx 범위가 아닌 상태 코드를 보낸 경우
        throw new HttpException(
          `Cookie API request failed: ${error.response.data.message || 'Unknown error'}`,
          HttpStatus.BAD_GATEWAY,
        );
      }
      // 요청 설정이 잘못되었거나 요청을 보낼 수 없는 경우
      throw new HttpException(
        'Failed to communicate with Cookie API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getAgentByContract(contractAddress: string) {
    const interval: string = '_3Days';
    try {
      const response = await this.apiClient.get(
        `/agents/contractAddress/${contractAddress}`,
        {
          params: { interval },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`컨트랙트 주소로 에이전트 조회 실패: ${error.message}`);
    }
  }
}
