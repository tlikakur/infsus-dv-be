import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Dijete } from "./Dijete";
import { Izlet } from "./Izlet";

@Index("izostanak_pkey", ["iddijete", "idizlet"], { unique: true })
@Entity("izostanak", { schema: "public" })
export class Izostanak {
  @Column("character varying", { name: "objasnjenje", length: 100 })
  objasnjenje: string;

  @Column("integer", { primary: true, name: "iddijete" })
  iddijete: number;

  @Column("integer", { primary: true, name: "idizlet" })
  idizlet: number;

  @ManyToOne(() => Dijete, (dijete) => dijete.izostanaks)
  @JoinColumn([{ name: "iddijete", referencedColumnName: "iddijete" }])
  iddijete2: Dijete;

  @ManyToOne(() => Izlet, (izlet) => izlet.izostanaks, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "idizlet", referencedColumnName: "idizlet" }])
  idizlet2: Izlet;
}
