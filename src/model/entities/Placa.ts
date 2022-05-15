import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zaposlenik } from "./Zaposlenik";

@Index("placa_pkey", ["idplaca"], { unique: true })
@Entity("placa", { schema: "public" })
export class Placa {
  @PrimaryGeneratedColumn({ type: "integer", name: "idplaca" })
  idplaca: number;

  @Column("date", { name: "datum" })
  datum: string;

  @Column("double precision", { name: "netoiznos", precision: 53 })
  netoiznos: number;

  @Column("double precision", { name: "brutoiznos", precision: 53 })
  brutoiznos: number;

  @ManyToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.placas)
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik: Zaposlenik;
}
