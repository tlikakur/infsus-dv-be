import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DijeteSerializer } from './dijete.serializer';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';
import { Dijete } from './entities/dijete.entity';
import { assignGroup, removeGroup } from './entities/dijete.query';

@Injectable()
export class DijeteService {
  constructor(@InjectRepository(Dijete) private dijeteRepository: Repository<Dijete>) {}

  public async create(child: CreateDijeteDto): Promise<CreateDijeteDto> {
    const count = await this.dijeteRepository.count({ oib: child.oib });
    if (count != 0)
      throw new ConflictException(`Dijete sa OIB-om ${child.oib} je već u sustavu`);

    await this.dijeteRepository.insert(child);
    return DijeteSerializer.serialize(child);
  }

  public async findAll(oib?: number): Promise<Dijete[]> {
    if (oib) return await this.findByOIB(oib);

    const children = await this.dijeteRepository.find();
    if (!children.length) throw new NotFoundException(`Popis djece je prazan`);

    children.sort((first, second) => first.iddijete - second.iddijete);

    return DijeteSerializer.serialize(children);
  }

  public async removeGroup(childId: number): Promise<void> {
    try {
      // TODO: Fix
      await this.dijeteRepository.query(removeGroup(childId));
    } catch (err) {
      //
    }
  }

  /**
   *
   * @param oib OIB of the child
   * @returns List of children that match given OIB
   */
  public async findByOIB(oib: number): Promise<Dijete[]> {
    const children = await this.dijeteRepository.find({
      where: { oib: oib }
    });

    if (!children.length) throw new NotFoundException(`Nema rezultata za OIB ${oib}`);

    return DijeteSerializer.serialize(children);
  }

  /**
   * @param groupId ID of a group that child belongs
   * @returns List of children that belong specified group
   */
  public async findByGroup(groupId: number): Promise<Dijete[]> {
    const children = await this.dijeteRepository.find({ where: { idgrupa: groupId } });

    if (!children.length)
      throw new NotFoundException(`Popis djece za grupu #${groupId} je prazan`);
    return DijeteSerializer.serialize(children);
  }

  public async findOne(childId: number): Promise<Dijete> {
    const child = await this.dijeteRepository.findOne({ iddijete: childId });

    if (!child) throw new NotFoundException(`Dijete #${childId} ne postoji`);
    return DijeteSerializer.serialize(child);
  }

  /**
   *
   * @param childId ID of a child
   * @param groupId ID of a group
   * @desc Assigns a group for a child
   */
  public async assignGroup(childId: number, groupId: number): Promise<number> {
    const count = await this.dijeteRepository.count({ iddijete: childId });
    if (count == 0) throw new ConflictException(`Dijete #${childId} ne postoji sustavu`);

    // TODO: Fix
    await this.dijeteRepository.query(assignGroup(groupId, childId));

    return DijeteSerializer.serialize({ iddijete: childId });
  }

  public async update(
    childId: number,
    updateDijeteDto: UpdateDijeteDto
  ): Promise<number> {
    const count = await this.dijeteRepository.count({ iddijete: childId });
    if (count == 0) throw new ConflictException(`Dijete #${childId} ne postoji sustavu`);

    await this.dijeteRepository.update({ iddijete: childId }, updateDijeteDto);

    return DijeteSerializer.serialize({ id: childId });
  }

  public async remove(childId: number): Promise<number> {
    const count = await this.dijeteRepository.count({ iddijete: childId });
    if (count == 0) throw new ConflictException(`Dijete #${childId} ne postoji sustavu`);

    await this.dijeteRepository.delete({ iddijete: childId });
    return DijeteSerializer.serialize({ id: childId });
  }
}
