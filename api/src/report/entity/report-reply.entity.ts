import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Reply } from "../../comment/entity/reply.entity";
import { User } from "../../user/entity/user.entity";
import { ReportType } from "./report-type.entity";

@Entity('report_reply')
export class ReportReply {

  @PrimaryGeneratedColumn()
  report_reply_id: number;

  @Column({
    type: 'varchar',
    length: 80
  })
  report_content: string;

  @ManyToOne(type => Reply, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'reply_id',
    referencedColumnName: 'reply_id'
  })
  @Column({
    type: 'integer'
  })
  reply_id: number;

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