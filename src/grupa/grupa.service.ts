import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DijeteService } from '../dijete/dijete.service';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Repository } from 'typeorm';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
import { Grupa } from './entities/grupa.entity';
import { GrupaSerializer } from './grupa.serializer';

export interface IGroupDetails {
  id: number;
  naziv: string;
  datumosnivanja: Date;
  djeca?: Dijete[];
}

@Injectable()
export class GrupaService {
  constructor(
    @InjectRepository(Grupa) private grupaRepository: Repository<Grupa>,
    private dijeteService: DijeteService
  ) {}

  public async create(grupa: CreateGrupaDto) {
    const count = await this.grupaRepository.count({ naziv: grupa.naziv });
    if (count != 0)
      throw new ConflictException(`Grupa ${grupa.naziv} već postoji u sustavu`);

    await this.grupaRepository.insert(grupa);
  }

  public async findAll(): Promise<Grupa[]> {
    const groups = await this.grupaRepository.find();

    groups.sort((first, second) => first.idgrupa - second.idgrupa);

    return GrupaSerializer.serialize(groups);
  }

  public async insertChild(groupId: number, childId: number) {
    const count = await this.grupaRepository.count({ idgrupa: groupId });
    if (count == 0) throw new ConflictException(`Grupa #${groupId} ne postoji sustavu`);

    await this.dijeteService.assignGroup(childId, groupId);
  }

  /**
   *
   * @param groupName Name or part of the name of a group
   * @returns List of groups that match regex %groupName%
   */
  public async findByName(groupName: string) {
    const group = await this.grupaRepository.find({ where: { naziv: `%${groupName}%` } });

    if (!group.length)
      throw new NotFoundException(`Nema rezultata za pretragu grupe '${groupName}'`);

    return GrupaSerializer.serialize(group);
  }

  public async findOne(id: number): Promise<any> {
    const group = await this.grupaRepository.findOne({ idgrupa: id });
    if (!group) throw new NotFoundException(`Grupa #${id} ne postoji`);

    let djeca: Dijete[] = [];
    try {
      djeca = await this.dijeteService.findByGroup(id);
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    return GrupaSerializer.serialize({
      naziv: group.naziv,
      datumosnivanja: group.datumosnivanja,
      djeca: djeca
    });
  }

  public async update(groupId: number, grupa: UpdateGrupaDto): Promise<number> {
    const count = await this.grupaRepository.count({ idgrupa: groupId });
    if (count == 0) throw new ConflictException(`Grupa #${groupId} ne postoji sustavu`);

    await this.grupaRepository.update({ idgrupa: groupId }, grupa);
    return GrupaSerializer.serialize({ id: groupId });
  }

  public async remove(groupId: number): Promise<number> {
    const count = await this.grupaRepository.count({ idgrupa: groupId });
    if (count == 0) throw new ConflictException(`Grupa #${groupId} ne postoji sustavu`);

    await this.grupaRepository.delete({ idgrupa: groupId });
    return GrupaSerializer.serialize({ id: groupId });
  }
}
