import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';
import { InterestModule } from './interest/interest.module';
import { connection } from "../config/connection";
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    UserModule,
    AuthModule,
    ThemeModule,
    InterestModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
