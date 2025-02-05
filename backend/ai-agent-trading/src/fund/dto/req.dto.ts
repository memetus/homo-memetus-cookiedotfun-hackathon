import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFundDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'test01',
    required: true,
  })
  name: string;

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
    example: '7Uuzh9JwqF8z3u6MWpQuQJbpD1u46xPDY6PGjwfwTh4o',
    required: true,
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    required: true,
  })
  initialBalance: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'Analyze COIN, a small cap in the AI AGENT category, and invest in it in a trend-following manner.',
    required: true,
  })
  strategyPrompt: string;
}
