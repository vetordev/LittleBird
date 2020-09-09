import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Forum } from "./forum.entity";

@Entity('like_forum')
export class LikeForum {

  @PrimaryGeneratedColumn()
  like_forum_id: number;

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
}