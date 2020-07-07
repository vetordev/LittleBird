import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entity/interest.entity';
import { GetInterestDto } from "./interest.dto";


@Injectable()
export class InterestService {
  constructor (
    @InjectRepository(Interest) private readonly interestRespository: Repository<Interest>
  ) {}

  async createInterest(): Promise<void> {
    console.log();
  }

  async getInterestByUser(): Promise<GetInterestDto[]> {
    console.log();
  }

  async deleteInterest(): Promise<void> {
    console.log()
  }
}
