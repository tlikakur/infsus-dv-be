import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clanuprava } from "./Clanuprava";
import { Odgajatelj } from "./Odgajatelj";
import { Placa } from "./Placa";
import { Voditelj } from "./Voditelj";
import { Zaposleniksmjena } from "./Zaposleniksmjena";
import { Zaposlenikziviu } from "./Zaposlenikziviu";

@Index("zaposlenik_email_key", ["email"], { unique: true })
@Index("zaposlenik_pkey", ["idzaposlenik"], { unique: true })
@Entity("zaposlenik", { schema: "public" })
export class Zaposlenik {
  @PrimaryGeneratedColumn({ type: "integer", name: "idzaposlenik" })
  idzaposlenik: number;

  @Column("character varying", { name: "ime", length: 50 })
  ime: string;

  @Column("character varying", { name: "prezime", length: 50 })
  prezime: string;

  @Column("date", { name: "datumrodenja" })
  datumrodenja: string;

  @Column("date", { name: "datumzaposlenja" })
  datumzaposlenja: string;

  @Column("numeric", { name: "oib", precision: 11, scale: 0 })
  oib: string;

  @Column("character varying", { name: "spol", length: 1 })
  spol: string;

  @Column("character varying", { name: "email", unique: true, length: 50 })
  email: string;

  @Column("character varying", { name: "lozinka", length: 256 })
  lozinka: string;

  @OneToMany(() => Clanuprava, (clanuprava) => clanuprava.idzaposlenik)
  clanupravas: Clanuprava[];

  @OneToMany(() => Odgajatelj, (odgajatelj) => odgajatelj.idzaposlenik)
  odgajateljs: Odgajatelj[];

  @OneToMany(() => Placa, (placa) => placa.idzaposlenik)
  placas: Placa[];

  @OneToMany(() => Voditelj, (voditelj) => voditelj.idzaposlenik)
  voditeljs: Voditelj[];

  @OneToMany(
    () => Zaposleniksmjena,
    (zaposleniksmjena) => zaposleniksmjena.idzaposlenik2
  )
  zaposleniksmjenas: Zaposleniksmjena[];

  @OneToOne(
    () => Zaposlenikziviu,
    (zaposlenikziviu) => zaposlenikziviu.idzaposlenik2
  )
  zaposlenikziviu: Zaposlenikziviu;
}
