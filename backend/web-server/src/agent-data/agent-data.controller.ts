import { Controller, Get, Param, Query } from '@nestjs/common';
import { AgentDataService } from './agent-data.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { FundIdReqDto, PageReqDto } from 'src/common/dto/req.dto';
import { SortOrderReqDto, SortQueryReqDto } from './dto/req.dto';

@ApiTags('AgentData')
@Controller('agent-data')
export class AgentDataController {
  constructor(private readonly agentDataService: AgentDataService) {}

  @Public()
  @Get('agent-dashboard')
  getAiDashboard(
    @Query() { sort }: SortQueryReqDto,
    @Query() { sortOrder }: SortOrderReqDto,
    @Query() { page }: PageReqDto,
    @Query() { pageSize }: PageReqDto,
  ) {
    return this.agentDataService.getAiDashboard(
      page,
      pageSize,
      sort,
      sortOrder,
    );
  }

  @Public()
  @Get('agent-metadata/:fundId')
  getAiMetaData(@Param() { fundId }: FundIdReqDto) {
    return this.agentDataService.getAiMetaData(fundId);
  }

  @Public()
  @Get('agent-stat/:fundId')
  getAgentStatByFundId(@Param() { fundId }: FundIdReqDto) {
    return this.agentDataService.getAgentStatByFundId(fundId);
  }

  @Public()
  @Get('portfolio/activity/:fundId')
  getActivityByFundId(
    @Param() { fundId }: FundIdReqDto,
    @Query() { page }: PageReqDto,
    @Query() { pageSize }: PageReqDto,
  ) {
    return this.agentDataService.getActivityByFundId(fundId, page, pageSize);
  }

  @Public()
  @Get('portfolio/holdings/:fundId')
  getHoldingsByFundId(
    @Param() { fundId }: FundIdReqDto,
    @Query() { sort }: SortQueryReqDto,
    @Query() { sortOrder }: SortOrderReqDto,
    @Query() { page }: PageReqDto,
    @Query() { pageSize }: PageReqDto,
  ) {
    return this.agentDataService.getHoldingsByFundId(
      fundId,
      page,
      pageSize,
      sort,
      sortOrder,
    );
  }
}
