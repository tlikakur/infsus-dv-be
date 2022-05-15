import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DijeteService } from '../dijete/dijete.service';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Repository } from 'typeorm';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
import { Grupa } from './entities/grupa.entity';
import { GrupaSerializer } from './grupa.serializer';

export interface IGrupaDetails {
  id: number,
  naziv: string,
  datumOsnivanja: Date,
  djeca?: Dijete[]
}

@Injectable()
export class GrupaService {

  constructor(
    @InjectRepository(Grupa) private grupaRepository: Repository<Grupa>,
    private dijeteService: DijeteService
  ){}

  public async create(grupa: CreateGrupaDto) {
    await this.grupaRepository.insert(grupa);
  }

  public async findAll(): Promise<Grupa[]> {
    const groups = await this.grupaRepository.find();
    return GrupaSerializer.serialize(groups);
  }

  public async insertChild(groupId: number, childId: number){
    await this.dijeteService.assignGroup(childId, groupId);
  }

  public async findByName(groupName: string){
    await this.grupaRepository.find({where: { naziv: `%${groupName}%` } });
  }

  public async findOne(id: number): Promise<IGrupaDetails> {
    const grupa = await this.grupaRepository.findOne({idGrupa: id});

    if(!grupa) throw new NotFoundException(`Grupa #${id} ne postoji`);

    try{ grupa.djeca = await this.dijeteService.findByGroup(id); }
    catch(err: unknown){ console.log(err); }

    return GrupaSerializer.serialize({ 
      id: grupa.idGrupa,
      naziv: grupa.naziv,
      datumOsnivanja: grupa.datumOsnivanja,
      djeca: grupa.djeca 
    });
  }

  public async update(groupId: number, grupa: UpdateGrupaDto): Promise<number> {
    await this.grupaRepository.update({idGrupa: groupId}, grupa);
    return GrupaSerializer.serialize({id: groupId});
  }

  public async remove(groupId: number): Promise<number> {
    await this.grupaRepository.delete({idGrupa: groupId});
    return GrupaSerializer.serialize({id: groupId});
  }
}
