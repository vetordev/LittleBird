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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const auth_service_1 = require("../auth/auth.service");
const hash_password_1 = __importDefault(require("./utils/hash.password"));
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async createUser(user) {
        const created_user = await this.userRepository.createQueryBuilder("tb_user")
            .insert()
            .into("tb_user")
            .values({
            email: user.email,
            user_pass: hash_password_1.default(user.user_pass),
            username: user.username,
            born_in: user.born_in,
            user_img_id: user.user_img_id
        })
            .execute();
        const payload_user = { sub: created_user.identifiers[0].user_id, email: user.email };
        const token = this.authService.login(payload_user.sub, payload_user.email);
        return token;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.createQueryBuilder("tb_user")
            .select("tb_user.user_pass")
            .addSelect("tb_user.email")
            .addSelect("tb_user.user_id")
            .where('tb_user.email = :email', { email })
            .getOne();
        if (!user) {
            return null;
        }
        return {
            user_id: user.user_id,
            email: user.email,
            user_pass: user.user_pass
        };
    }
    async getUserById(user_id) {
        const user = await this.userRepository.createQueryBuilder("tb_user")
            .select('tb_user.email')
            .addSelect('tb_user.username')
            .addSelect('tb_user.user_img_id')
            .innerJoinAndSelect('tb_user.user_img_id', 'user_img')
            .where('tb_user.user_id = :user_id', { user_id })
            .getOne();
        return user;
    }
    async updateUser(user_id, user) {
        await this.userRepository.createQueryBuilder("tb_user")
            .update()
            .set(user)
            .where("tb_user.user_id = :user_id", { user_id })
            .execute();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map