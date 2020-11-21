import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { HandleJoinCommentDto, HandleLeaveCommentDto } from './comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

class Message {
  comment_id: number;
  reply_id: number;
  reply_content: string;
  user_id: number;
  forum: string;
}

@WebSocketGateway({ namespace: '/comment' })
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('CommentGateway');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {};

  afterInit(server: Socket) {
    this.logger.log('Namespace "/comment" pronto')
  };

  handleConnection(client: Socket) {
    console.log('Nova conexão: ' + client.id);
  };

  handleDisconnect(client: Socket) {
    console.log('Desconexão: ' + client.id)
  };

  @SubscribeMessage('join comment')
  handleJoinComment(@ConnectedSocket() client: Socket, @MessageBody() data: HandleJoinCommentDto): void {
    //comment room = forum_id-comment_id
    client.join(data.idRoom);
  };

  @SubscribeMessage('leave comment')
  handleLeaveComment(@ConnectedSocket() client: Socket, @MessageBody() data: HandleLeaveCommentDto): void {
    client.leave(data.idRoom);
  };

  async handleNewMessage(message: Message): Promise<void> {

    const user = await this.userRepository.createQueryBuilder('tb_user')
    .select(['tb_user.user_id', 'tb_user.username', 'tb_user.user_img'])
    .innerJoin('tb_user.user_img_id', 'user_img')
    .where('tb_user.user_id = :user_id', { user_id: message.user_id })
    .getOne();

    this.wss.to(`${message.forum}-${message.comment_id}`).emit('new message', {
      reply_id: message.reply_id,
      reply_content: message.reply_content,
      user_id: user
    });
  };

}
