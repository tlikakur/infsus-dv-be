import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zaposleniksmjena } from "./Zaposleniksmjena";

@Index("smjena_pkey", ["idsmjena"], { unique: true })
@Index("smjena_naziv_key", ["naziv"], { unique: true })
@Entity("smjena", { schema: "public" })
export class Smjena {
  @PrimaryGeneratedColumn({ type: "integer", name: "idsmjena" })
  idsmjena: number;

  @Column("character varying", { name: "naziv", unique: true, length: 50 })
  naziv: string;

  @Column("time without time zone", { name: "vrijemepocetak" })
  vrijemepocetak: string;

  @Column("time without time zone", { name: "vrijemezavrsetak" })
  vrijemezavrsetak: string;

  @OneToMany(
    () => Zaposleniksmjena,
    (zaposleniksmjena) => zaposleniksmjena.idsmjena
  )
  zaposleniksmjenas: Zaposleniksmjena[];
}
