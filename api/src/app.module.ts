import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThemeModule } from './theme/theme.module';

// TODO Transferir essa lógica para outro arquivo
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const connection: TypeOrmModuleOptions = {
  type: process.env.TYPE as any,
  database: String(process.env.DATABASE),
  autoLoadEntities: Boolean(process.env.AUTO_LOAD_ENTITIES),
  synchronize: Boolean(process.env.SYNCHRONIZE)
}
//

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    UserModule,
    AuthModule,
    ThemeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
