import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Zaposlenik } from "./Zaposlenik";
import { Mjesto } from "./Mjesto";

@Index("zaposlenikziviu_pkey", ["idzaposlenik"], { unique: true })
@Entity("zaposlenikziviu", { schema: "public" })
export class Zaposlenikziviu {
  @Column("character varying", { name: "adresa", length: 50 })
  adresa: string;

  @Column("integer", { primary: true, name: "idzaposlenik" })
  idzaposlenik: number;

  @OneToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.zaposlenikziviu)
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik2: Zaposlenik;

  @ManyToOne(() => Mjesto, (mjesto) => mjesto.zaposlenikzivius)
  @JoinColumn([
    { name: "postanskibroj", referencedColumnName: "postanskibroj" },
  ])
  postanskibroj: Mjesto;
}
