import { Controller, Get, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { QueryPageDto } from './theme.dto';
import { ThemeService } from './theme.service';


@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) { }

  @Get()
  async getTheme(@Res() response, @Query() query: QueryPageDto) {
    return this.themeService.getThemes(response, query.page)
  }

}
