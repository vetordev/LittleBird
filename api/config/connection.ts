import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

export const connection: TypeOrmModuleOptions = {
  type: process.env.TYPE as any,
  host: String(process.env.HOST),
  port: Number(process.env.PORTDB),
  username: String(process.env.USERDB),
  password: String(process.env.PASSWORD),
  database: String(process.env.DATABASE),
  autoLoadEntities: Boolean(process.env.AUTO_LOAD_ENTITIES),
  synchronize: Boolean(process.env.SYNCHRONIZE),
  ssl: {
    rejectUnauthorized: false
  }
}
