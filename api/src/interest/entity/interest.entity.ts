import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "@user/entity/user.entity";
import { Theme } from "@theme/entity/theme.entity";

@Entity('interest')
export class Interest {
  @PrimaryGeneratedColumn()
  interest_id: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id'
  })
  @Column({
    type: 'integer'
  })
  user_id: number

  @ManyToOne(type => Theme)
  @JoinColumn({
    name: 'theme_id',
    referencedColumnName: 'theme_id'
   })
  @Column({
    type: 'integer'
  })
  theme_id: number
}