import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Grupa } from "./Grupa";
import { Izostanak } from "./Izostanak";

@Index("izlet_pkey", ["idizlet"], { unique: true })
@Index("izlet_naziv_key", ["naziv"], { unique: true })
@Entity("izlet", { schema: "public" })
export class Izlet {
  @PrimaryGeneratedColumn({ type: "integer", name: "idizlet" })
  idizlet: number;

  @Column("character varying", { name: "naziv", unique: true, length: 100 })
  naziv: string;

  @Column("timestamp without time zone", { name: "vrijemepocetak" })
  vrijemepocetak: Date;

  @Column("timestamp without time zone", { name: "vrijemezavrsetak" })
  vrijemezavrsetak: Date;

  @ManyToMany(() => Grupa, (grupa) => grupa.izlets)
  grupas: Grupa[];

  @OneToMany(() => Izostanak, (izostanak) => izostanak.idizlet2)
  izostanaks: Izostanak[];
}
