import { Controller, Post, Get, Delete, Req, Body, Param, UseGuards, HttpCode, Res, UseFilters } from '@nestjs/common';
import { CreateInterestDto, DeleteInterestDto } from './interest.dto';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { QueryFailedExceptionFilter } from './http-exception.filter';

@Controller('interest')
export class InterestController {

  constructor(private readonly interestService: InterestService) {}

  @Post()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  createInterest(@Req() request, @Body() body: CreateInterestDto) {
    return this.interestService.createInterest(request.user.user_id, body.theme_id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  getInterestByUser(@Req() request) {
    return this.interestService.getInterestByUser(request.user.user_id);
  }

  @Delete(':interest_id')
  @UseGuards(JwtAuthGuard)
  deleteInterest(@Res() response: Response, @Param() params: DeleteInterestDto) {
    return this.interestService.deleteInterest(params.interest_id, response)
  }

}
