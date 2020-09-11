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
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const comment_dto_1 = require("./comment.dto");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_2 = require("typeorm");
class Message {
}
let CommentGateway = class CommentGateway {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('CommentGateway');
    }
    ;
    afterInit(server) {
        this.logger.log('Namespace "/comment" pronto');
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
    handleJoinComment(client, data) {
        client.join(data.nameRoom);
    }
    ;
    handleLeaveComment(client, data) {
        client.leave(data.nameRoom);
    }
    ;
    async handleNewMessage(message) {
        const user = await this.userRepository.createQueryBuilder('user')
            .select(['user.user_id', 'user.username', 'user_img'])
            .innerJoin('user.user_img_id', 'user_img')
            .getOne();
        this.wss.to(`${message.forum}-${message.comment_id}`).emit('new message', {
            reply_id: message.reply_id,
            reply_content: message.reply_content,
            user_id: user
        });
    }
    ;
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], CommentGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('join comment'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.HandleJoinCommentDto]),
    __metadata("design:returntype", void 0)
], CommentGateway.prototype, "handleJoinComment", null);
__decorate([
    websockets_1.SubscribeMessage('leave comment'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.HandleLeaveCommentDto]),
    __metadata("design:returntype", void 0)
], CommentGateway.prototype, "handleLeaveComment", null);
CommentGateway = __decorate([
    websockets_1.WebSocketGateway(3001, { namespace: '/comment' }),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentGateway);
exports.CommentGateway = CommentGateway;
//# sourceMappingURL=comment.gateway.js.map