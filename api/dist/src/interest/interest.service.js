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
exports.InterestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const interest_entity_1 = require("./entity/interest.entity");
let InterestService = class InterestService {
    constructor(interestRespository) {
        this.interestRespository = interestRespository;
    }
    async createInterest(user_id, theme_id) {
        const interest = await this.interestRespository.createQueryBuilder('interest')
            .select('interest.interest_id')
            .where('interest.user_id = :user_id', { user_id })
            .andWhere('interest.theme_id = :theme_id', { theme_id })
            .getOne();
        if (!interest)
            await this.interestRespository.createQueryBuilder('interest')
                .insert()
                .into('interest').values({
                user_id,
                theme_id
            })
                .execute();
    }
    async getInterestByUser(user_id, page) {
        const themes_interests = await this.interestRespository.createQueryBuilder('interest')
            .innerJoinAndSelect('interest.theme_id', 'theme')
            .innerJoinAndSelect('theme.theme_img_id', 'theme_img')
            .where('interest.user_id = :user_id', { user_id })
            .offset((page - 1) * 4)
            .limit(4)
            .getMany();
        return themes_interests;
    }
    async deleteInterest(interest_id, response) {
        const interest = await this.interestRespository.createQueryBuilder('interest')
            .select('interest.interest_id')
            .where('interest.interest_id = :interest_id', { interest_id })
            .getOne();
        if (!interest)
            return response.status(404).json({ error: "O interesse não foi encontrado no servidor" });
        await this.interestRespository.createQueryBuilder('interest')
            .delete()
            .where('interest_id = :interest_id', { interest_id })
            .execute();
        return response.status(204).send();
    }
};
InterestService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(interest_entity_1.Interest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InterestService);
exports.InterestService = InterestService;
//# sourceMappingURL=interest.service.js.map