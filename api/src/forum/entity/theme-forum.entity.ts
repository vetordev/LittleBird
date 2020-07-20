import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Theme } from "../../theme/entity/theme.entity";
import { Forum } from "./forum.entity";

@Entity('theme_forum')
export class ThemeForum {

  @PrimaryGeneratedColumn()
  theme_article_id: number;

  @ManyToOne(type => Theme, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'theme_id',
    referencedColumnName: 'theme_id'
  })
  @Column({
    type: 'integer'
  })
  theme_id: number;

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
  forum_id: number;
}