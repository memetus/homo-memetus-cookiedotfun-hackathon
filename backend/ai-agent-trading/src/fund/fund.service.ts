import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/req.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FundData } from 'src/common/schemas/fund-data.schema';

@Injectable()
export class FundService {
  constructor(
    @InjectModel('FundData')
    private fundDataModel: Model<FundData>,
  ) {}

  create(createFundDto: CreateFundDto) {
    const newFundData = {
      ...createFundDto,
      balance: createFundDto.initialBalance,
      portfolio: [],
    };

    return this.fundDataModel.create(newFundData);
  }

  findAll() {
    return `This action returns all fund`;
  }
}
