import { Controller, Post, Get, Delete, Req, Body, Param, UseGuards, HttpCode, Res, UseFilters, Query } from '@nestjs/common';
import { CreateInterestDto, DeleteInterestDto, QueryPageDto } from './interest.dto';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('interest')
export class InterestController {

  constructor(private readonly interestService: InterestService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createInterest(@Req() request, @Body() body: CreateInterestDto) {
    return this.interestService.createInterest(request.user.user_id, body.themes);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getInterestByUser(@Res() response, @Req() request, @Query() query: QueryPageDto) {
    return this.interestService.getInterestByUser(response, request.user.user_id, query.page);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteInterest(@Res() response: Response, @Body() body: DeleteInterestDto) {
    return this.interestService.deleteInterest(body.interests, response)
  }

}
