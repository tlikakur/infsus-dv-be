import { Column, Entity, Index, OneToMany } from "typeorm";
import { Dijeteziviu } from "./Dijeteziviu";
import { Zaposlenikziviu } from "./Zaposlenikziviu";

@Index("mjesto_naziv_key", ["naziv"], { unique: true })
@Index("mjesto_pkey", ["postanskibroj"], { unique: true })
@Entity("mjesto", { schema: "public" })
export class Mjesto {
  @Column("integer", { primary: true, name: "postanskibroj" })
  postanskibroj: number;

  @Column("character varying", { name: "naziv", unique: true, length: 50 })
  naziv: string;

  @OneToMany(() => Dijeteziviu, (dijeteziviu) => dijeteziviu.postanskibroj)
  dijetezivius: Dijeteziviu[];

  @OneToMany(
    () => Zaposlenikziviu,
    (zaposlenikziviu) => zaposlenikziviu.postanskibroj
  )
  zaposlenikzivius: Zaposlenikziviu[];
}
