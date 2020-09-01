import { SubscribeMessage, WebSocketGateway, OnGatewayInit, ConnectedSocket, MessageBody, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001, { namespace: '/forum' })
export class ForumGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('ForumGateway');

  afterInit(server: Socket) {
    this.logger.log('Inicializado!')
  };

  handleConnection(client: Socket) {
    console.log('Nova conexão: ' + client.id);
  };

  handleDisconnect(client: Socket) {
    console.log('Desconexão: ' + client.id)
  };

  @SubscribeMessage('connect on forum')
  handleConnect(@ConnectedSocket() client: Socket, @MessageBody() data: { name: string }): void {
    // return { event: 'response to message', data }
    client.join(data.name)
    client.broadcast.emit('new user', 'user#'+client.id)
  };

  @SubscribeMessage('leave forum')
  handleLeave(@ConnectedSocket() client: Socket, @MessageBody() data: { name: string }): void {
    client.leave(data.name)
    client.broadcast.emit('leave user', 'user#'+client.id);
  };
}
