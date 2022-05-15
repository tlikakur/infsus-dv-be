import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Zaposlenik } from "./Zaposlenik";

@Index("voditelj_pkey", ["idvoditelj"], { unique: true })
@Entity("voditelj", { schema: "public" })
export class Voditelj {
  @PrimaryGeneratedColumn({ type: "integer", name: "idvoditelj" })
  idvoditelj: number;

  @ManyToOne(() => Zaposlenik, (zaposlenik) => zaposlenik.voditeljs, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "idzaposlenik", referencedColumnName: "idzaposlenik" }])
  idzaposlenik: Zaposlenik;
}
