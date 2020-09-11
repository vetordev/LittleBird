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
exports.ForumGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const forum_dto_1 = require("./forum.dto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const forum_entity_1 = require("./entity/forum.entity");
const user_entity_1 = require("../user/entity/user.entity");
class Message {
}
;
let ForumGateway = class ForumGateway {
    constructor(forumRepository, userRepository) {
        this.forumRepository = forumRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('ForumGateway');
    }
    ;
    afterInit(server) {
        this.logger.log('Namespace "/forum" pronto');
    }
    ;
    handleConnection(client) {
        console.log('Nova conexão: ' + client.id);
    }
    ;
    handleDisconnect(client) {
        console.log('Desconexão: ' + client.id);
    }
    ;
    handleJoinForum(client, data) {
        client.join(data.nameRoom);
    }
    ;
    handleLeaveForum(client, data) {
        client.leave(data.nameRoom);
    }
    ;
    async handleNewMessage(message) {
        const forum = await this.forumRepository.createQueryBuilder('forum')
            .select(['forum.title'])
            .where('forum.forum_id = :forum_id', { forum_id: message.forum_id })
            .getOne();
        const user = await this.userRepository.createQueryBuilder('user')
            .select(['user.user_id', 'user.username', 'user_img'])
            .innerJoin('user.user_img_id', 'user_img')
            .where('user.user_id = :user_id', { user_id: message.user_id })
            .getOne();
        this.wss.to(forum.title).emit('new message', {
            comment_id: message.comment_id,
            comment_content: message.comment_content,
            user_id: user,
            no_like: 0
        });
    }
    ;
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ForumGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('join forum'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.HandleJoinForumDto]),
    __metadata("design:returntype", void 0)
], ForumGateway.prototype, "handleJoinForum", null);
__decorate([
    websockets_1.SubscribeMessage('leave forum'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, forum_dto_1.HandleLeaveForumDto]),
    __metadata("design:returntype", void 0)
], ForumGateway.prototype, "handleLeaveForum", null);
ForumGateway = __decorate([
    common_1.Injectable(),
    websockets_1.WebSocketGateway(3001, { namespace: '/forum' }),
    __param(0, typeorm_2.InjectRepository(forum_entity_1.Forum)),
    __param(1, typeorm_2.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ForumGateway);
exports.ForumGateway = ForumGateway;
//# sourceMappingURL=forum.gateway.js.map