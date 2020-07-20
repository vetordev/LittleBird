import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('forum_img')
export class ForumImg {

  @PrimaryGeneratedColumn()
  forum_img_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  img_url: string;
}