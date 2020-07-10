import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entity/interest.entity';
import { Response } from 'express';


@Injectable()
export class InterestService {
  constructor (
    @InjectRepository(Interest) private readonly interestRespository: Repository<Interest>,
  ) {}

  // TODO LIDAR COM O ERRO DE FK (THEME_ID NÃO EXISTIR)
  async createInterest(user_id: number, theme_id: number): Promise<void> {
    const interest = await this.interestRespository.createQueryBuilder('interest')
      .select('interest.interest_id')
      .where('interest.user_id = :user_id', { user_id })
      .andWhere('interest.theme_id = :theme_id', { theme_id })
      .getOne();

    if(!interest)
      await this.interestRespository.createQueryBuilder('interest')
        .insert()
        .into('interest').values({
          user_id,
          theme_id
        })
        .execute();
  }

  async getInterestByUser(user_id: number): Promise<Interest[]> {
    const themes_interests = await this.interestRespository.createQueryBuilder('interest')
      .innerJoinAndSelect('interest.theme_id', 'theme')
      .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
      .where('interest.user_id = :user_id', { user_id })
      .getMany();

    return themes_interests;

  }

  async deleteInterest(interest_id: number, response: Response): Promise<Response> {
    const interest = await this.interestRespository.createQueryBuilder('interest')
      .select('interest.interest_id')
      .where('interest.interest_id = :interest_id', { interest_id })
      .getOne();

    if (!interest)
      return response.status(404).json({ error: "O interesse não foi encontrado no servidor" });

    await this.interestRespository.createQueryBuilder('interest')
      .delete()
      .where('interest_id = :interest_id', { interest_id })
      .execute();

    return response.status(204).send();
  }
}
