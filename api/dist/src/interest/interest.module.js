"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestModule = void 0;
const common_1 = require("@nestjs/common");
const interest_controller_1 = require("./interest.controller");
const interest_service_1 = require("./interest.service");
const typeorm_1 = require("@nestjs/typeorm");
const interest_entity_1 = require("./entity/interest.entity");
const theme_module_1 = require("../theme/theme.module");
let InterestModule = class InterestModule {
};
InterestModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([interest_entity_1.Interest]), theme_module_1.ThemeModule],
        controllers: [interest_controller_1.InterestController],
        providers: [interest_service_1.InterestService]
    })
], InterestModule);
exports.InterestModule = InterestModule;
//# sourceMappingURL=interest.module.js.map