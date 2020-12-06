import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserImg } from './entity/user-img.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from '../auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, UserImg ]),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: { }
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
