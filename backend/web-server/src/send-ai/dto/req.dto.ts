import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFundDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'tst01',
    required: true,
  })
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Analyze COIN, a small cap in the AI AGENT category, and invest in it in a trend-following manner.',
    required: true,
  })
  strategyPrompt: string;
}
