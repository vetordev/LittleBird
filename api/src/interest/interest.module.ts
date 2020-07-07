import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entity/interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Interest ])],
  controllers: [InterestController],
  providers: [InterestService]
})
export class InterestModule {}
