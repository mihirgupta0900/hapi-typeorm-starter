import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
export default class Profile {
  @Index()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 128 })
  name: string
}
