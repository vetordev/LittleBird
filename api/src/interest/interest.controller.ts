import { Controller, Post, Get, Delete, Req, Body, Param, UseGuards, HttpCode, Res, UseFilters, Query } from '@nestjs/common';
import { CreateInterestDto, DeleteInterestDto, QueryPageDto } from './interest.dto';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { response, Response } from 'express';
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

  @Delete(':interest_id')
  @UseGuards(JwtAuthGuard)
  deleteInterest(@Res() response: Response, @Param() params: DeleteInterestDto) {
    return this.interestService.deleteInterest(params.interest_id, response)
  }

}
