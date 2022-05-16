import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dijete } from '../../dijete/entities/dijete.entity';
@Index('grupa_pkey', ['idgrupa'], { unique: true })
@Index('grupa_naziv_key', ['naziv'], { unique: true })
@Entity('grupa', { schema: 'public' })
export class Grupa {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'idgrupa' })
  idgrupa: number;

  @Column('date', { name: 'datumosnivanja' })
  datumosnivanja: string;

  @Column('character varying', { name: 'naziv', unique: true, length: 50 })
  naziv: string;

  @OneToMany(() => Dijete, (dijete) => dijete.idgrupa)
  djeca: Dijete[];

  // @ManyToOne(() => Odgajatelj, (odgajatelj) => odgajatelj.grupe)
  // @JoinColumn([{ name: "idodgajatelj", referencedColumnName: "idodgajatelj" }])
  // idodgajatelj: Odgajatelj;

  // @ManyToMany(() => Izlet, (izlet) => izlet.grupas)
  // @JoinTable({
  //   name: "grupaizlet",
  //   joinColumns: [{ name: "idgrupa", referencedColumnName: "idgrupa" }],
  //   inverseJoinColumns: [{ name: "idizlet", referencedColumnName: "idizlet" }],
  //   schema: "public",
  // })
  // izlets: Izlet[];
}
