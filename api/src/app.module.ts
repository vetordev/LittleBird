import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';
import { InterestModule } from './interest/interest.module';
import { connection } from "../config/connection";

@Module({
  imports: [
    TypeOrmModule.forRoot(
    {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgre",
      database: "little_bird_test",
      autoLoadEntities: true,
      synchronize: true

    }
    ),

    UserModule,
    AuthModule,
    ThemeModule,
    InterestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
