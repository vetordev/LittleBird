import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeImg } from './entity/theme-img.entity';
import { Theme } from './entity/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, ThemeImg])],
  controllers: [ThemeController],
  providers: [ThemeService]
})
export class ThemeModule {}
