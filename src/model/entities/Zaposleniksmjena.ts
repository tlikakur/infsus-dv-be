import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Smjena } from "./Smjena";
import { Zaposlenik } from "./Zaposlenik";

@Index("zaposleniksmjena_pkey", ["datum", "idzaposlenik"], { unique: true })
@Entity("zaposleniksmjena", { schema: "public" })
export class Zaposleniksmjena {
  @Column("integer", { primary: true, name: "idzaposlenik" })
  idzaposlenik: number;

  @Column("date", { primary: true, name: "datum" })
  datum: string;

  @ManyToOne(() => Smjena, (smjena) => smjena.zaposleniksmjenas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idsmjena", referencedColumnName: "idsmjena" }])
  idsmjena: Smjena;

  @ManyToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.zaposleniksmjenas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik2: Zaposlenik;
}
