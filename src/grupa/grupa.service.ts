import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
import { Grupa } from './entities/grupa.entity';

@Injectable()
export class GrupaService {

  constructor(@InjectRepository(Grupa) private grupaRepository: Repository<Grupa>){}

  public async create(grupa: CreateGrupaDto) {
    await this.grupaRepository.insert(grupa);
  }

  public async findAll(): Promise<Grupa[]> {
    return await this.grupaRepository.find();
  }

  public async findOne(id: number): Promise<Grupa> {
    return await this.grupaRepository.findOne({idgrupa: id});
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
