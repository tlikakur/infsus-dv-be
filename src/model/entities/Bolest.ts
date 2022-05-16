import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Dijete } from './Dijete';

@Index('bolest_pkey', ['idbolest'], { unique: true })
@Index('bolest_naziv_key', ['naziv'], { unique: true })
@Entity('bolest', { schema: 'public' })
export class Bolest {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'idbolest' })
  idbolest: number;

  @Column('character varying', { name: 'naziv', unique: true, length: 50 })
  naziv: string;

  @ManyToMany(() => Dijete, (dijete) => dijete.bolests)
  @JoinTable({
    name: 'dijetebolest',
    joinColumns: [{ name: 'idbolest', referencedColumnName: 'idbolest' }],
    inverseJoinColumns: [{ name: 'iddijete', referencedColumnName: 'iddijete' }],
    schema: 'public'
  })
  dijetes: Dijete[];
}
