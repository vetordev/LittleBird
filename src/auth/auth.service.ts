import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";
import hashPassword from "../user/utils/hash.password";

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, user_pass: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.user_pass === hashPassword(user_pass)) {
      return { user_id: user.user_id, email: user.email }
    }
    return null;
  }

  //Gera o token JWT
  async login(user_id: number, email: string) {
    const user = await this.userService.getUserById(user_id)
    const payload = { sub: user_id, email: email };
    return {
      token: this.jwtService.sign(payload),
      ...user
    }
  }

}
