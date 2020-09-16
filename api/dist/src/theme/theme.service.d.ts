import { Repository } from 'typeorm';
import { Theme } from './entity/theme.entity';
import { GetThemeDto } from "@theme/theme.dto";
export declare class ThemeService {
    private readonly themeRepository;
    constructor(themeRepository: Repository<Theme>);
    getThemes(): Promise<GetThemeDto[]>;
}
