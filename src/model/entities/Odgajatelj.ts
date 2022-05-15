import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Grupa } from "./Grupa";
import { Zaposlenik } from "./Zaposlenik";

@Index("odgajatelj_pkey", ["idodgajatelj"], { unique: true })
@Entity("odgajatelj", { schema: "public" })
export class Odgajatelj {
  @PrimaryGeneratedColumn({ type: "integer", name: "idodgajatelj" })
  idodgajatelj: number;

  @OneToMany(() => Grupa, (grupa) => grupa.idodgajatelj)
  grupas: Grupa[];

  @ManyToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.odgajateljs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik: Zaposlenik;
}
