import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entity/interest.entity';
import { Response } from 'express';
import { convertToArray } from "./utils/convert.array";
import { arrayContains } from 'class-validator';

@Injectable()
export class InterestService {
  constructor (
    @InjectRepository(Interest) private readonly interestRespository: Repository<Interest>,
  ) {}

  async createInterest(user_id: number, themes: string): Promise<Interest[]> {

    const themesArray = convertToArray(themes);
    let interestArray: Array<number> = [];

    for (const theme_id of themesArray) {
      const interest = await this.interestRespository.createQueryBuilder('interest')
      .select('interest.interest_id')
      .where('interest.user_id = :user_id', { user_id })
      .andWhere('interest.theme_id = :theme_id', { theme_id })
      .getOne();

      if(!interest){

        const createdInterest = await this.interestRespository.createQueryBuilder('interest')
          .insert()
          .into('interest').values({
            user_id,
            theme_id
          })
          .execute();

          interestArray.push(createdInterest.identifiers[0].interest_id);
        }
    };
    const interests = await this.interestRespository.createQueryBuilder('interest')
      .innerJoinAndSelect('interest.theme_id', 'theme')
      .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
      .where('interest.interest_id IN(:...interestArray)', { interestArray: interestArray[0] != undefined ? interestArray : [0]})
      .orderBy('interest.interest_id', 'DESC')
      .getMany();

    return interests;

  }
  async getInterestByUser(response: Response, user_id: number, page: number): Promise<Response> {
    const themes_interests = await this.interestRespository.createQueryBuilder('interest')
      .innerJoinAndSelect('interest.theme_id', 'theme')
      .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
      .where('interest.user_id = :user_id', { user_id })
      .offset((page - 1) * 4)
      .limit(4)
      .orderBy('interest.interest_id', 'DESC')
      .getManyAndCount();

    const count: any = themes_interests[1];

    return response.status(200).header('x-total-count', count).json(themes_interests[0]);

  }

  async deleteInterest(interests: string, response: Response): Promise<Response> {
    /*
    const interest = await this.interestRespository.createQueryBuilder('interest')
      .select('interest.interest_id')
      .where('interest.interest_id = :interest_id', { interest_id })
      .getOne();

    if (!interest)
      return response.status(404).json({ error: "O interesse não foi encontrado no servidor" });
    */

    const interestsArray = convertToArray(interests);
    await this.interestRespository.createQueryBuilder('interest')
      .delete()
      .where('interest_id IN(:...interestsArray)', { interestsArray: interestsArray[0] != undefined ? interestsArray : [0] })
      .execute();

    return response.status(204).send();
  }
}
