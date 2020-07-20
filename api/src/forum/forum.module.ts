import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumImg } from './entity/forum-img.entity';
import { Forum } from './entity/forum.entity';
import { ThemeForum } from './entity/theme-forum.entity';
import { LikeForum } from './entity/like-forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ ForumImg, Forum, ThemeForum, LikeForum ])],
  controllers: [ForumController],
  providers: [ForumService]
})
export class ForumModule {}
