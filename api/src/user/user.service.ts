import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ){}

  async createUser(user: CreateUserDto): Promise<object> {
    const created_user =  await this.userRepository.createQueryBuilder("tb_user").insert().into("tb_user").values(user).execute();

    const payload_user = { sub: created_user.identifiers[0].user_id, email: user.email };

    const token = this.authService.login(payload_user.sub, payload_user.email );
    return token;
  }

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
  }

  // TODO retornar o objeto user_img ao invés do user_img_id
  async getUserById(user_id: number): Promise<GetUserDto> {
    const user = await this.userRepository.createQueryBuilder("tb_user")
      .select('tb_user.email')
      .addSelect('tb_user.username')
      .addSelect('tb_user.user_img_id')
      .innerJoinAndSelect('tb_user.user_img_id', 'user_img')
      .where('tb_user.user_id = :user_id', { user_id })
      .getOne();

    return user;
  }

  async updateUser(user_id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.createQueryBuilder("tb_user")
      .update()
      .set(user)
      .where("tb_user.user_id = :user_id", { user_id })
      .execute()
  }
}
