import { Controller, Post, Body, UseFilters, Get, UseGuards, Req, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { QueryFailedExceptionFilter, InternalServerErrorFilter } from './http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(InternalServerErrorFilter, QueryFailedExceptionFilter)
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  // TODO Tipar o parâmetro request
  async getUser(@Req() request ) {
    return this.userService.getUserById(request.user.id as number);
  }

}
