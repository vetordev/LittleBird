import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { HandleJoinCommentDto, HandleLeaveCommentDto } from './comment.dto';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
declare class Message {
    comment_id: number;
    reply_id: number;
    reply_content: string;
    user_id: number;
    forum: string;
}
export declare class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly userRepository;
    wss: Server;
    private logger;
    constructor(userRepository: Repository<User>);
    afterInit(server: Socket): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinComment(client: Socket, data: HandleJoinCommentDto): void;
    handleLeaveComment(client: Socket, data: HandleLeaveCommentDto): void;
    handleNewMessage(message: Message): Promise<void>;
}
export {};
