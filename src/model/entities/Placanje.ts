import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Dijete } from "./Dijete";

@Index("placanje_pkey", ["idplacanje"], { unique: true })
@Entity("placanje", { schema: "public" })
export class Placanje {
  @PrimaryGeneratedColumn({ type: "integer", name: "idplacanje" })
  idplacanje: number;

  @Column("date", { name: "datum" })
  datum: string;

  @Column("double precision", { name: "iznos", precision: 53 })
  iznos: number;

  @ManyToOne(() => Dijete, (dijete) => dijete.placanjes)
  @JoinColumn([{ name: "iddijete", referencedColumnName: "iddijete" }])
  iddijete: Dijete;
}
