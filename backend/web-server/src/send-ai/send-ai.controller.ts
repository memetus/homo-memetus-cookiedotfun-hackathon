import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendAiService } from './send-ai.service';
import { CreateFundDto } from './dto/req.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, UserAfterAuth } from 'src/common/decorator/user.decorator';

@ApiTags('Fund')
@Controller('send-ai')
export class SendAiController {
  constructor(private readonly sendAiService: SendAiService) {}

  @ApiBearerAuth()
  @Post('create-fund')
  createFund(
    @Body() createFundDto: CreateFundDto,
    @User() user: UserAfterAuth,
  ) {
    return this.sendAiService.createFund(createFundDto, user.id);
  }

  @ApiBearerAuth()
  @Get('number-of-create-by-user')
  getNumberOfCreateByUser(@User() user: UserAfterAuth) {
    return this.sendAiService.getNumberOfCreateByUser(user.id);
  }

  @ApiBearerAuth()
  @Post('test-create-token')
  deployAgentToken(@Body() createFundDto: CreateFundDto) {
    const symbol = createFundDto.symbol;
    return this.sendAiService.deployAgentToken(symbol, symbol);
  }
}
