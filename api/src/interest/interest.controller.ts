import { Controller, Post, Get, Delete } from '@nestjs/common';

@Controller('interest')
export class InterestController {

  @Post()
  createInterest() {
    return null
  }

  @Get()
  getInterestByUser() {
    return null;
  }

  @Delete(':id')
  deleteInterest() {
    return null;
  }

}
