import { Grupa } from "../../grupa/entities/grupa.entity";
import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


@Index("dijete_pkey", ["iddijete"], { unique: true })
@Entity("dijete", { schema: "public" })
export class Dijete {
  @PrimaryGeneratedColumn({ type: "integer", name: "iddijete" })
  iddijete: number;

  @Column("character varying", { name: "ime", length: 50 })
  ime: string;

  @Column("character varying", { name: "prezime", length: 50 })
  prezime: string;

  @Column("numeric", { name: "oib", precision: 11, scale: 0 })
  oib: string;

  @Column("date", { name: "datumrodenja" })
  datumrodenja: string;

  
  @ManyToOne(() => Grupa, (grupa) => grupa.djeca)
  @JoinColumn([{ name: "idgrupa", referencedColumnName: "idgrupa" }])
  idgrupa: Grupa;

  // @ManyToMany(() => Bolest, (bolest) => bolest.dijetes)
  // bolests: Bolest[];

  // @OneToOne(() => Dijeteziviu, (dijeteziviu) => dijeteziviu.iddijete2)
  // dijeteziviu: Dijeteziviu;

  // @OneToMany(() => Izostanak, (izostanak) => izostanak.iddijete2)
  // izostanaks: Izostanak[];

  // @OneToMany(() => Placanje, (placanje) => placanje.iddijete)
  // placanjes: Placanje[];
}
