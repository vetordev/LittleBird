import { User } from "../../user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('like_comment')
export class LikeComment {
  @PrimaryGeneratedColumn()
  like_comment_id: number;

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
}