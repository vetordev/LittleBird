import { Controller, Post, Body, UseFilters, Get, UseGuards, Req, HttpCode, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EmailExistsDto, UpdateUserDto } from './user.dto';
import { QueryFailedExceptionFilter } from './http-exception.filter';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(QueryFailedExceptionFilter)
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  };

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() request ) {
    return await this.userService.getUserById(request.user.user_id);
  };

  @Get('img')
  @HttpCode(200)
  async getUserImg() {
    return await this.userService.getUserImg();
  };

  @Put()
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryFailedExceptionFilter)
  async updateUser(@Req() request, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(request.user.user_id, user);
  };

  @Get('email')
  @UseFilters(QueryFailedExceptionFilter)
  async emailExists(@Query() query: EmailExistsDto) {
    return await this.userService.emailExists(query.email);
  };

}
