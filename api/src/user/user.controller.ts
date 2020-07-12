import { Controller, Post, Body, UseFilters, Get, UseGuards, Req, HttpCode, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
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

    return await this.userService.getUserById(request.user.user_id);
  }

  @Put()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  async updateUser(@Req() request, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(request.user.user_id, user);
  }

}
