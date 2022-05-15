import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DijeteSerializer } from './dijete.serializer';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';
import { Dijete } from './entities/dijete.entity';

@Injectable()
export class DijeteService {
  constructor(
  @InjectRepository(Dijete) private dijeteRepository: Repository<Dijete>
  ){}

  public async create(child: CreateDijeteDto): Promise<CreateDijeteDto> {
    const count = await this.dijeteRepository.count({ oib: child.oib });
    if(count != 0) 
      throw new ConflictException(`Dijete sa OIB-om ${child.oib} je već u sustavu`);

    await this.dijeteRepository.insert(child);

    return DijeteSerializer.serialize(child);
  }

  public async findAll(): Promise<Dijete[]> {
    const children = await this.dijeteRepository.find();

    if(!children.length) throw new NotFoundException(`Popis djece je prazan`);
    return children;
  }

  public async findByGroup(groupId: number): Promise<Dijete[]> {
    const children = await this.dijeteRepository.find({where: {'idgrupa' : groupId}});

    if(!children.length) throw new NotFoundException(`Popis djece za grupu #${groupId} je prazan`);
    return DijeteSerializer.serialize(children);
  }

  public async findOne(id: number): Promise<Dijete> {
    const child = await this.dijeteRepository.findOne({iddijete: id});

    if(!child) throw new NotFoundException(`Dijete #${id} ne postoji`);
    return DijeteSerializer.serialize(child);
  }

  public async assignGroup(childId: number, groupId: number){
    await this.dijeteRepository
      .query(`UPDATE Dijete SET idGrupa = ${groupId} WHERE idDijete = ${childId}`);
  }

  public async update(id: number, updateDijeteDto: UpdateDijeteDto): Promise<number> {
    await this.dijeteRepository.update({iddijete: id}, updateDijeteDto);
    return id;
  }

  public async remove(id: number): Promise<number> {
    await this.dijeteRepository.delete({iddijete: id});
    return id;
  }
}
