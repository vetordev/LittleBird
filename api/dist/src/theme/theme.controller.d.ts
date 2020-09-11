import { ThemeService } from './theme.service';
export declare class ThemeController {
    private readonly themeService;
    constructor(themeService: ThemeService);
    getTheme(): Promise<import("./theme.dto").GetThemeDto[]>;
}
