import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';
import { Bolest } from './entities/bolest.entity';
import { BolestSerializer } from './bolest.serializer';

@Injectable()
export class BolestService {
  constructor(@InjectRepository(Bolest) private bolestRepository: Repository<Bolest>) {}

  public async create(disease: CreateBolestDto): Promise<Bolest> {
    const count = await this.bolestRepository.count({ naziv: disease.naziv });
    if (count != 0)
      throw new ConflictException(`Bolest sa nazivom ${disease.naziv} je već u sustavu`);

    await this.bolestRepository.insert(disease);
    return BolestSerializer.serialize(disease);
  }

  public async findAll(): Promise<Bolest[]> {
    const diseases = await this.bolestRepository.find();
    if (!diseases.length) throw new NotFoundException('Popis bolesti je prazan');

    diseases.sort((first, second) => first.idbolest - second.idbolest);

    return BolestSerializer.serialize(diseases);
  }

  public async findOne(diseaseId: number): Promise<Bolest> {
    const disease = await this.bolestRepository.findOne({ idbolest: diseaseId });

    if (!disease)
      throw new NotFoundException(`Bolest #${diseaseId} ne postoji u sustavu.`);

    return BolestSerializer.serialize(disease);
  }

  public async findByName(diseaseName: string): Promise<Bolest> {
    const disease = await this.bolestRepository.findOne({ naziv: `%${diseaseName}%` });

    if (!disease)
      throw new NotFoundException(`Nema rezultata za pretragu bolesti "${diseaseName}"`);

    return disease;
  }

  public async update(
    diseaseId: number,
    updateBolestDto: UpdateBolestDto
  ): Promise<number> {
    const count = await this.bolestRepository.count({ idbolest: diseaseId });
    if (count == 0)
      throw new ConflictException(`Bolest #${diseaseId} ne postoji sustavu`);

    await this.bolestRepository.update({ idbolest: diseaseId }, updateBolestDto);

    return BolestSerializer.serialize({ id: diseaseId });
  }

  public async remove(diseaseId: number): Promise<number> {
    const count = await this.bolestRepository.count({ idbolest: diseaseId });

    if (count == 0)
      throw new ConflictException(`Bolest #${diseaseId} ne postoji sustavu`);

    await this.bolestRepository.delete({ idbolest: diseaseId });
    return BolestSerializer.serialize({ id: diseaseId });
  }
}
