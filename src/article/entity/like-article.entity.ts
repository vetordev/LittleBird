import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

import { Article } from "./article.entity";
import { User } from "../../user/entity/user.entity";

@Entity('like_article')
export class LikeArticle {

  @PrimaryGeneratedColumn()
  like_article_id: number;

  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id'
  })
  @Column({
    type: 'integer'
  })
  user_id: number;

  @ManyToOne(type => Article, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'article_id',
    referencedColumnName: 'article_id'
  })
  @Column({
    type: 'integer'
  })
  article_id: number;
}