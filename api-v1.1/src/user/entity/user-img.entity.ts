import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_img')
export class UserImg {

  @PrimaryGeneratedColumn()
  user_img_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  img_url: string;
}