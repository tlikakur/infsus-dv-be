import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DijeteService } from '../dijete/dijete.service';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Like, Repository } from 'typeorm';
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

  public async addChildren(groupId: number, childrenIds: string) {
    const children = childrenIds.split(',');

    for (const childId of children) {
      try {
        await this.dijeteService.assignGroup(+childId, groupId);
      } catch (err: unknown) {
        // eslint-disable-next-line no-console
        console.log(
          `Pogreška kod dodavanja djeteta #${childId} u grupu #${groupId}- preskacem...`
        );
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }

    return GrupaSerializer.serialize({ idgrupa: groupId });
  }

  public async create(grupa: CreateGrupaDto): Promise<Grupa> {
    // eslint-disable-next-line no-console
    console.log('Grupa create service');

    const count = await this.grupaRepository.count({ naziv: grupa.naziv });
    if (count != 0) {
      // eslint-disable-next-line no-console
      console.log('Error grupa postoji');
      throw new ConflictException(`Grupa ${grupa.naziv} već postoji u sustavu`);
    }
    await this.grupaRepository.insert(grupa);

    // eslint-disable-next-line no-console
    console.log('Returning...');
    return GrupaSerializer.serialize(grupa);
  }

  public async findAll(groupName?: string): Promise<Grupa[]> {
    if (groupName) return await this.findByName(groupName);

    const groups = await this.grupaRepository.find();

    groups.sort((first, second) => first.idgrupa - second.idgrupa);

    return GrupaSerializer.serialize(groups);
  }

  public async insertChild(groupId: number, childId: number): Promise<number> {
    const count = await this.grupaRepository.count({ idgrupa: groupId });
    if (count == 0) throw new ConflictException(`Grupa #${groupId} ne postoji sustavu`);

    await this.dijeteService.assignGroup(childId, groupId);

    return GrupaSerializer.serialize({ idgrupa: groupId });
  }

  /**
   *
   * @param groupName Name or part of the name of a group
   * @returns List of groups that match regex %groupName%
   */
  public async findByName(groupName: string): Promise<Grupa[]> {
    const groups = await this.grupaRepository.find({
      where: { naziv: Like(`%${groupName}%`) }
    });

    if (!groups.length)
      throw new NotFoundException(`Nema rezultata za pretragu grupe '${groupName}'`);

    return GrupaSerializer.serialize(groups);
  }

  public async findOne(id: number): Promise<Grupa> {
    const group = await this.grupaRepository.findOne({ idgrupa: id });
    if (!group) throw new NotFoundException(`Grupa #${id} ne postoji`);

    let djeca: Dijete[] = [];
    try {
      djeca = await this.dijeteService.findByGroup(id);
    } catch (err: unknown) {
      // TODO: Handle
    }

    return GrupaSerializer.serialize({
      idgrupa: group.idgrupa,
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
