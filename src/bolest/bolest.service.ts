import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';
import { Bolest } from './entities/bolest.entity';
import { BolestSerializer } from './bolest.serializer';
import { DijeteService } from '../dijete/dijete.service';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { assignDisease } from './entities/bolest.query';

@Injectable()
export class BolestService {
  constructor(
    @InjectRepository(Bolest) private bolestRepository: Repository<Bolest>,
    @Inject(forwardRef(() => DijeteService)) private dijeteService: DijeteService
  ) {}

  public async create(disease: CreateBolestDto): Promise<Bolest> {
    const count = await this.bolestRepository.count({ naziv: disease.naziv });
    if (count != 0)
      throw new ConflictException(`Bolest sa nazivom ${disease.naziv} je već u sustavu`);

    await this.bolestRepository.insert(disease);
    return BolestSerializer.serialize(disease);
  }

  public async findAll(diseaseName?: string): Promise<Bolest[]> {
    if (diseaseName) return await this.findByName(diseaseName);

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

  /**
   *
   * @param diseaseName Name or part of the name of the disease
   * @returns List of diseases that match regex %diseaseName%
   */
  public async findByName(diseaseName: string): Promise<Bolest[]> {
    const diseases = await this.bolestRepository.find({
      naziv: Like(`%${diseaseName}%`)
    });

    if (!diseases.length)
      throw new NotFoundException(`Nema rezultata za pretragu bolesti "${diseaseName}"`);

    return BolestSerializer.serialize(diseases);
  }

  /**
   * @desc Assigns a disease of a child (If both exist)
   * @param diseaseId ID of a disease
   * @param childId ID of a child
   * @returns Disease ID
   */
  public async assignDiseaseToChild(diseaseId: number, childId: number): Promise<number> {
    const count = await this.bolestRepository.count({ idbolest: diseaseId });
    if (count == 0)
      throw new ConflictException(`Bolest #${diseaseId} ne postoji sustavu`);

    const child = await this.dijeteService.findOne(childId);
    if (!child) throw new ConflictException(`Dijete #${childId} ne postoji u sustavu`);

    // TODO: Fix
    await this.bolestRepository.query(assignDisease(diseaseId, childId));

    return BolestSerializer.serialize({ idbolest: diseaseId });
  }

  /**
   * @desc Remove a disease from child (If both exist)
   * @param diseaseId ID of a disease
   * @param childId ID of a child
   * @returns Disease ID
   */
  public async removeDiseaseFromChild(
    diseaseId: number,
    childId: number
  ): Promise<number> {
    const count = await this.bolestRepository.count({ idbolest: diseaseId });
    if (count == 0)
      throw new ConflictException(`Bolest #${diseaseId} ne postoji sustavu`);

    const child = await this.dijeteService.findOne(childId);
    if (!child) throw new ConflictException(`Dijete #${childId} ne postoji u sustavu`);

    // TODO: Fix
    await this.bolestRepository.query(
      `DELETE FROM DijeteBolest WHERE idbolest = ${diseaseId} AND iddijete = ${childId};`
    );

    return BolestSerializer.serialize({ idbolest: diseaseId });
  }

  public async update(diseaseId: number, bolest: UpdateBolestDto): Promise<number> {
    const count = await this.bolestRepository.count({ idbolest: diseaseId });
    if (count == 0)
      throw new ConflictException(`Bolest #${diseaseId} ne postoji sustavu`);

    await this.bolestRepository.update({ idbolest: diseaseId }, bolest);

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
