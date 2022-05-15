import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Dijete } from "./Dijete";
import { Mjesto } from "./Mjesto";

@Index("dijeteziviu_pkey", ["iddijete"], { unique: true })
@Entity("dijeteziviu", { schema: "public" })
export class Dijeteziviu {
  @Column("character varying", { name: "adresa", length: 50 })
  adresa: string;

  @Column("integer", { primary: true, name: "iddijete" })
  iddijete: number;

  @OneToOne(() => Dijete, (dijete) => dijete.dijeteziviu)
  @JoinColumn([{ name: "iddijete", referencedColumnName: "iddijete" }])
  iddijete2: Dijete;

  @ManyToOne(() => Mjesto, (mjesto) => mjesto.dijetezivius)
  @JoinColumn([
    { name: "postanskibroj", referencedColumnName: "postanskibroj" },
  ])
  postanskibroj: Mjesto;
}
