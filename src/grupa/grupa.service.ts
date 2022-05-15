import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DijeteService } from '../dijete/dijete.service';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Repository } from 'typeorm';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
import { Grupa } from './entities/grupa.entity';

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
  
  public async findByName(groupName: string){
    return await this.grupaRepository.find({where: {naziv: groupName} });
  }

  public async findOne(id: number): Promise<IGrupaDetails> {
    const grupa = await this.grupaRepository.findOne({idgrupa: id});
    const djeca = await this.dijeteService.findByGroup(id);

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
