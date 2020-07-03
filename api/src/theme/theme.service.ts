import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theme } from './entity/theme.entity';

@Injectable()
export class ThemeService {
  constructor ( private readonly themeRepository: Repository<Theme> ) {}


}
