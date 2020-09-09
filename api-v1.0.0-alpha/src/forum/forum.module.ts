import { Module, forwardRef } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumImg } from './entity/forum-img.entity';
import { Forum } from './entity/forum.entity';
import { ThemeForum } from './entity/theme-forum.entity';
import { LikeForum } from './entity/like-forum.entity';
import { CommentModule } from '../comment/comment.module';
import { ForumGateway } from './forum.gateway';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ ForumImg, Forum, ThemeForum, LikeForum ]), forwardRef(() => CommentModule), UserModule],
  controllers: [ForumController],
  providers: [ForumService, ForumGateway],
  exports: [TypeOrmModule, ForumGateway]
})
export class ForumModule {}
