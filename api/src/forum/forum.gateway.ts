import { SubscribeMessage, WebSocketGateway, OnGatewayInit, ConnectedSocket, MessageBody, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { HandleJoinForumDto, HandleLeaveForumDto } from './forum.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entity/forum.entity';
import { User } from '../user/entity/user.entity';

class Message {
  forum_id: number;
  user_id: number;
  comment_id: number;
  comment_content: string;
  publi_date: string;
};

@Injectable()
@WebSocketGateway({ namespace: '/forum' })
export class ForumGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('ForumGateway');

  constructor(
    @InjectRepository(Forum) private readonly forumRepository: Repository<Forum>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {};

  afterInit(server: Socket) {
    this.logger.log('Namespace "/forum" pronto')
  };

  handleConnection(client: Socket) {
    console.log('Nova conexão: ' + client.id);
  };

  handleDisconnect(client: Socket) {
    console.log('Desconexão: ' + client.id)
  };

  @SubscribeMessage('join forum')
  handleJoinForum(@ConnectedSocket() client: Socket, @MessageBody() data: HandleJoinForumDto): void {
    client.join(data.idRoom);
  };

  @SubscribeMessage('leave forum')
  handleLeaveForum(@ConnectedSocket() client: Socket, @MessageBody() data: HandleLeaveForumDto): void {
    client.leave(data.idRoom);
  };

  async handleNewMessage(message: Message): Promise<void> {

    const user = await this.userRepository.createQueryBuilder('tb_user')
      .select(['tb_user.user_id', 'tb_user.username', 'tb_user.user_img'])
      .innerJoin('tb_user.user_img_id', 'user_img')
      .where('tb_user.user_id = :user_id', { user_id: message.user_id })
      .getOne();

    this.wss.to(String(message.forum_id)).emit('new message', {
      comment_id: message.comment_id,
      comment_content: message.comment_content,
      publi_date: message.publi_date,
      user_id: user,
      no_like: 0
    });
  };

}
