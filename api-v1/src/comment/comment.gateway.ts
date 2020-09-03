import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { HandleJoinCommentDto, HandleLeaveCommentDto } from './comment.dto';
import { ForumGateway } from '../forum/forum.gateway';

class Message {
  comment_id: number;
  reply_id: number;
  reply_content: string;
  user_id: number;
}

@WebSocketGateway(3001, { namespace: '/comment' })
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('CommentGateway');

  constructor (private readonly forumGateway: ForumGateway) {};

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

  };

  @SubscribeMessage('leave comment')
  handleLeaveComment(@ConnectedSocket() client: Socket, @MessageBody() data: HandleLeaveCommentDto): void {

  };

  handleNewMessage(message: Message): void {

  };

}
