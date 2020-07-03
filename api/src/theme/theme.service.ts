import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theme } from './entity/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetThemeDto } from "@theme/theme.dto";

@Injectable()
export class ThemeService {
  constructor ( @InjectRepository(Theme) private readonly themeRepository: Repository<Theme> ) {}

  // TODO Tipar com GetThemeDto
  async getThemes(): Promise<Theme[]> {
    const themes = await this.themeRepository.createQueryBuilder("theme")
      //Traz os dados de theme_img e não só o id
      .innerJoinAndSelect("theme.theme_img_id", "theme_img")
      .getMany();

    console.log(themes);

    return themes;

  }

}
