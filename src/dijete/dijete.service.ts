import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';
import { Dijete } from './entities/dijete.entity';

@Injectable()
export class DijeteService {
  constructor(
  @InjectRepository(Dijete) private dijeteRepository: Repository<Dijete>){}

  public async create(dijete: CreateDijeteDto): Promise<CreateDijeteDto> {
    await this.dijeteRepository.insert(dijete);
    return dijete;
  }

  public async findAll(): Promise<Dijete[]> {
    const dijeteList = await this.dijeteRepository.find();

    if(!dijeteList.length) throw new NotFoundException(`Popis djece je prazan`);
    return dijeteList;
  }

  public async findOne(id: number): Promise<Dijete> {
    const dijete = await this.dijeteRepository.findOne({iddijete: id});

    if(!dijete) throw new NotFoundException(`Dijete #${id} ne postoji`);
    return dijete;
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
