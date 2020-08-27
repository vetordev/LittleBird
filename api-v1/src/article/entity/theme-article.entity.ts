import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

import { Article } from "./article.entity";
import { Theme } from "../../theme/entity/theme.entity";

@Entity('theme_article')
export class ThemeArticle {

  @PrimaryGeneratedColumn()
  theme_article_id: number;

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

  @ManyToOne(type => Theme, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'theme_id',
    referencedColumnName: 'theme_id'
  })
  @Column({
    type: 'integer'
  })
  theme_id: number;
}