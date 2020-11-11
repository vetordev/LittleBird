import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto, EmailExistsDto, GetUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';
import hashPassword from "./utils/hash.password";
import { UserImg } from './entity/user-img.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserImg) private readonly userImgRepository: Repository<UserImg>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ){}

  async createUser(user: CreateUserDto): Promise<object> {
    const created_user =  await this.userRepository.createQueryBuilder("tb_user")
      .insert()
      .into("tb_user")
      .values({
        email: user.email,
        user_pass: hashPassword(user.user_pass),
        username: user.username,
        born_in: user.born_in,
        user_img_id: user.user_img_id,
        fullname: user.fullname
      })
      .execute();

    const payload_user = { sub: created_user.identifiers[0].user_id, email: user.email };

    const token = (await this.authService.login(payload_user.sub, payload_user.email)).token;
    return { token };
  };

  async getUserByEmail(email: string): Promise<any | null> {
    const user = await this.userRepository.createQueryBuilder("tb_user")
      .select("tb_user.user_pass")
      .addSelect("tb_user.email")
      .addSelect("tb_user.user_id")
      .where('tb_user.email = :email', { email })
      .getOne();

    if (!user) {
      return null;
    }
    return {
      user_id: user.user_id,
      email: user.email,
      user_pass: user.user_pass
    };
  };

  async getUserImg(): Promise<UserImg[]> {
    const user_img = await this.userImgRepository.createQueryBuilder("user_img")
      .select(["user_img"])
      .orderBy('user_img.user_img_id', 'ASC')
      .getMany();

    return user_img;
  };

  async getUserById(user_id: number): Promise<GetUserDto> {
    const user = await this.userRepository.createQueryBuilder("tb_user")
      .select(['tb_user.user_id', 'tb_user.email', 'tb_user.username', 'tb_user.user_img_id', 'tb_user.fullname'])
      .innerJoinAndSelect('tb_user.user_img_id', 'user_img')
      .where('tb_user.user_id = :user_id', { user_id })
      .getOne();

    return user;
  };

  async updateUser(user_id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.createQueryBuilder("tb_user")
      .update()
      .set(user)
      .where("tb_user.user_id = :user_id", { user_id })
      .execute()
  };

  async emailExists(email: string): Promise<object> {
    const user = await this.userRepository.createQueryBuilder('tb_user')
      .select(['tb_user.email'])
      .where('tb_user.email = :email', { email })
      .getOne()

    if(!user) {
      return { email: false }
    }
    return { email: true }
  };
}
