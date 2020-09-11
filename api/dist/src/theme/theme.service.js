"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const theme_entity_1 = require("./entity/theme.entity");
const typeorm_2 = require("@nestjs/typeorm");
const theme_dto_1 = require("./theme.dto");
let ThemeService = class ThemeService {
    constructor(themeRepository) {
        this.themeRepository = themeRepository;
    }
    async getThemes() {
        const themes = await this.themeRepository.createQueryBuilder("theme")
            .innerJoinAndSelect("theme.theme_img_id", "theme_img")
            .getMany();
        return themes;
    }
};
ThemeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(theme_entity_1.Theme)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ThemeService);
exports.ThemeService = ThemeService;
//# sourceMappingURL=theme.service.js.map