import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('article_img')
export class ArticleImg {

  @PrimaryGeneratedColumn()
  article_img_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  img_url: string;
}