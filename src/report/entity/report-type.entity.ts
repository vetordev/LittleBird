import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('report_type')
export class ReportType {
  @PrimaryGeneratedColumn()
  report_type_id: number;

  @Column({
    type: 'varchar',
    length: 45
  })
  report_type_name: string;

  @Column({
    type: 'varchar',
    length: 200
  })
  report_type_especification: string;
};