import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { UserImg } from "./user-img.entity";

@Entity('tb_user')
export class User {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 45
  })
  username: string;

  @Column({
    unique: false,
    type: 'varchar',
    length: 100,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 64
  })
  user_pass: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100
  })
  email: string

  @Column({
    type: 'date'
  })
  born_in: Date

  @ManyToOne(type => UserImg, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_img_id',
    referencedColumnName: 'user_img_id'
  })
  @Column({
    type: 'integer',
    unique: false,

  })
  user_img_id: number;
}