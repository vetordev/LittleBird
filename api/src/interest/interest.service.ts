import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entity/interest.entity';
import { GetInterestDto } from "./interest.dto";
import { Theme } from '../theme/entity/theme.entity';


@Injectable()
export class InterestService {
  constructor (
    @InjectRepository(Interest) private readonly interestRespository: Repository<Interest>,
    @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>
  ) {}

  // TODO LIDAR COM O ERRO DE FK (THEME_ID NÃO EXISTIR)
  // TODO Não permitir a criação de dois interesses iguais
  async createInterest(user_id: number, theme_id: number): Promise<void> {
    await this.interestRespository.createQueryBuilder('interest')
      .insert()
      .into('interest').values({
        user_id,
        theme_id
      })
      .execute();
  }

  async getInterestByUser(user_id: number): Promise<any> {
    // const interests = await this.interestRespository.createQueryBuilder('interest')
    //   .select('interest.interest_id')
    //   .addSelect('interest.theme_id')
    //   .where('interest.user_id = :user_id', { user_id })
    //   .getMany();

    // const themes = await this.themeRepository.createQueryBuilder('theme')
    // .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
    // .where('theme.theme_id IN (:...ids)', { ids: interests.map((interest) => interest.theme_id) })
    // .getMany();

    // const themes_interests = [];
    // for(let i = 0; i <= themes.length; i++) {
    //   themes_interests.push({
    //     ...themes[i],
    //     ...interests[i]
    //   });
    // }

    const themes_interests = await this.interestRespository.createQueryBuilder('interest')
      .innerJoinAndSelect('interest.theme_id', 'theme')
      .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
      .where('interest.user_id = :user_id', { user_id })
      .getMany();

    return themes_interests;

  }

  async deleteInterest(interest_id: number): Promise<void> {
    await this.interestRespository.createQueryBuilder('interest')
      .delete()
      .where('interest_id = :interest_id', { interest_id })
      .execute();

  }
}
