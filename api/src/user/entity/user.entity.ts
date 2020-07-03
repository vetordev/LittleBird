import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { UserImg } from "./user-img.entity";

@Entity('tb_user')
export class User {

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 45,
    // unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 45
  })
  user_pass: string;

  @Column({
    type: 'varchar',
    length: 100,
    // unique: true
  })
  email: string

  @Column({
    type: 'date'
  })
  born_in: Date


  @ManyToOne(type => UserImg)
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