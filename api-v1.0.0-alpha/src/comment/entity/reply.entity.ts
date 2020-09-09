import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Comment } from "./comment.entity";

@Entity('reply')
export class Reply {
  @PrimaryGeneratedColumn()
  reply_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  reply_content: string;

  @Column({
    type: 'date'
  })
  publi_date: string;

  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id'
  })
  @Column({
    type: 'integer'
  })
  user_id: number;

  @ManyToOne(type => Comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'comment_id',
    referencedColumnName: 'comment_id'
  })
  @Column({
    type: 'integer'
  })
  comment_id: number;

}