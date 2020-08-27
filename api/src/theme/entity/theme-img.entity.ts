import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('theme_img')
export class ThemeImg {

  @PrimaryGeneratedColumn()
  theme_img_id: number;

  @Column({
    type: 'varchar',
    length: 200
  })
  img_url: string;
}