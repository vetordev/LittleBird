import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ThemeImg } from "./theme-img.entity";

@Entity('theme')
export class Theme {

  @PrimaryGeneratedColumn()
  theme_id: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  theme_name: string;

  @OneToOne(type => ThemeImg, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'theme_img_id',
    referencedColumnName: 'theme_img_id'
  })
  @Column({
    type: 'integer',
    unique: true
  })
  theme_img_id: number;
}