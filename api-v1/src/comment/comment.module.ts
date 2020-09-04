import { Module, forwardRef } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Reply } from './entity/reply.entity';
import { ForumModule } from '../forum/forum.module';
import { CommentGateway } from './comment.gateway';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Comment, Reply ]), forwardRef(() => ForumModule), UserModule],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway],
  exports: [TypeOrmModule]
})
export class CommentModule {}
