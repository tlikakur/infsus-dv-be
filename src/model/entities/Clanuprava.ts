import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zaposlenik } from "./Zaposlenik";

@Index("clanuprava_pkey", ["idclanuprava"], { unique: true })
@Entity("clanuprava", { schema: "public" })
export class Clanuprava {
  @PrimaryGeneratedColumn({ type: "integer", name: "idclanuprava" })
  idclanuprava: number;

  @ManyToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.clanupravas, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik: Zaposlenik;
}
