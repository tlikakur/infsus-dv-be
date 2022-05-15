import { Injectable } from '@nestjs/common';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';

@Injectable()
export class DijeteService {
  create(createDijeteDto: CreateDijeteDto) {
    return 'This action adds a new dijete';
  }

  findAll() {
    return `This action returns all dijete`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dijete`;
  }

  update(id: number, updateDijeteDto: UpdateDijeteDto) {
    return `This action updates a #${id} dijete`;
  }

  remove(id: number) {
    return `This action removes a #${id} dijete`;
  }
}
