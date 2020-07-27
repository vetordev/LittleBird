import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportType } from './entity/report-type.entity';
import { ReportReply } from './entity/report-reply.entity';
import { ReportComment } from './entity/report-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ ReportType, ReportReply, ReportComment ])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
