import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { HandleJoinForumDto, HandleLeaveForumDto } from './forum.dto';
import { Repository } from 'typeorm';
import { Forum } from './entity/forum.entity';
import { User } from '../user/entity/user.entity';
declare class Message {
    forum_id: number;
    user_id: number;
    comment_id: number;
    comment_content: string;
}
export declare class ForumGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly forumRepository;
    private readonly userRepository;
    wss: Server;
    private logger;
    constructor(forumRepository: Repository<Forum>, userRepository: Repository<User>);
    afterInit(server: Socket): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinForum(client: Socket, data: HandleJoinForumDto): void;
    handleLeaveForum(client: Socket, data: HandleLeaveForumDto): void;
    handleNewMessage(message: Message): Promise<void>;
}
export {};
