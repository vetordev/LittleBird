import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theme } from './entity/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';

@Injectable()
export class ThemeService {
  constructor ( @InjectRepository(Theme) private readonly themeRepository: Repository<Theme> ) {}

  async getThemes(response: Response, page: number): Promise<Response> {
    const themes = await this.themeRepository.createQueryBuilder("theme")
      .innerJoinAndSelect("theme.theme_img_id", "theme_img")
      .orderBy('theme.theme_name', 'ASC')
      .offset((page - 1) * 4)
      .limit(4)
      .getManyAndCount();

    const count: any = themes[1]

    return response.status(200).header('x-total-count', count).json(themes[0])

  }

}
