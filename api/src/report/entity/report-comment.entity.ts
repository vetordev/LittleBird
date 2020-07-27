import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { ReportType } from "./report-type.entity";
import { Comment } from "../../comment/entity/comment.entity";

@Entity('report_comment')
export class ReportComment {

  @PrimaryGeneratedColumn()
  report_comment_id: number;

  @Column({
    type: 'varchar',
    length: 80
  })
  report_content: string;

  @ManyToOne(type => Comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'reporter_user_id',
    referencedColumnName: 'user_id'
  })
  @Column({
    type: 'integer'
  })
  reporter_user_id: number;

  @ManyToOne(type => ReportType, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'report_type',
    referencedColumnName: 'report_type_id'
  })
  @Column({
    type: 'integer'
  })
  report_type: number;
};