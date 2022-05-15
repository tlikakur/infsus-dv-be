import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DijeteService } from '../dijete/dijete.service';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Repository } from 'typeorm';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
import { Grupa } from './entities/grupa.entity';
import { NotFoundError } from 'rxjs';

export interface IGrupaDetails {
  grupa: Grupa,
  djeca: Dijete[]
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
    return await this.grupaRepository.find();
  }

  public async insertChild(groupId: number, childId: number){
    await this.dijeteService.assignGroup(childId, groupId);
  }

  public async findByName(groupName: string){
    await this.grupaRepository.find({where: { naziv: `%${groupName}%` } });
  }

  public async findOne(id: number): Promise<IGrupaDetails> {
    const grupa = await this.grupaRepository.findOne({idgrupa: id});

    if(!grupa) throw new NotFoundException(`Grupa #${id} ne postoji`);

    let djeca: Dijete[] = [];
    try{ djeca = await this.dijeteService.findByGroup(id); }
    catch(err: unknown){ console.log(err); }

    return { grupa: grupa, djeca: djeca }
  }

  public async update(id: number, grupa: UpdateGrupaDto): Promise<number> {
    await this.grupaRepository.update({idgrupa: id}, grupa);
    return id;
  }

  public async remove(id: number): Promise<number> {
    await this.grupaRepository.delete({idgrupa: id});
    return id;
  }
}
