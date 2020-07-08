import { Controller, Post, Get, Delete, Req, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { CreateInterestDto, DeleteInterestDto } from './interest.dto';
import { InterestService } from './interest.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

//TODO Validar as rotas
@Controller('interest')
export class InterestController {

  constructor(private readonly interestService: InterestService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
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
  @HttpCode(204)
  deleteInterest(@Param() params: DeleteInterestDto) {
    return this.interestService.deleteInterest(params.interest_id)
  }

}
