import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Forum } from "../../forum/entity/forum.entity";

@Entity('tb_comment')
export class Comment {

  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  comment_content: string;

  @Column({
    type: 'date',
  })
  publi_date: string;

  @Column({
    type: 'integer'
  })
  no_like: number;

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
  user_id: number

  @ManyToOne(type => Forum, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'forum_id',
    referencedColumnName: 'forum_id'
  })
  @Column({
    type: 'integer'
  })
  forum_id: number
};