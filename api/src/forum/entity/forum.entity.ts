import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ForumImg } from "./forum-img.entity";

@Entity('forum')
export class Forum {

  @PrimaryGeneratedColumn()
  forum_id: number;

  @Column({
    type: 'varchar',
    length: '100'
  })
  title: string;

  @Column({
    type: 'integer'
  })
  no_like: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  forum_description: string;

  @OneToOne(type => ForumImg, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'forum_img_id',
    referencedColumnName: 'forum_img_id'
  })
  @Column({
    type: 'integer'
  })
  forum_img_id: number;

}