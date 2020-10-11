import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity('recommendation_article')
export class RecommendationArticle {

  @PrimaryGeneratedColumn()
  recommendation_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  recommendation_url: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  recommendation_type: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

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