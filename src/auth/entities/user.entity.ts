import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    length: 100,
    nullable: false
  })
  name: string

  @Column('varchar', {
    length: 100,
    unique: true,
    nullable: false
  })
  email: string

  @Column('varchar', {
    length: 100,
    nullable: false
  })
  password: string
}
