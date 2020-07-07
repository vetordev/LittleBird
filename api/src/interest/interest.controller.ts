 import { Controller, Post, Get, Delete, Req, Body, Param } from '@nestjs/common';
import { request } from 'http';

@Controller('interest')
//TODO Validar as rotas
export class InterestController {

  @Post()
  createInterest(@Req() request, @Body('theme_id') theme_id: number) {
    return null
  }

  @Get()
  getInterestByUser(@Req() request) {
    return null;
  }

  @Delete(':id')
  deleteInterest(@Req() request, @Param('interest_id') interest_id) {
    return null;
  }

}
