import { Injectable } from '@nestjs/common';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';

@Injectable()
export class BolestService {
  create(createBolestDto: CreateBolestDto) {
    return 'This action adds a new bolest';
  }

  findAll() {
    return `This action returns all bolest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bolest`;
  }

  update(id: number, updateBolestDto: UpdateBolestDto) {
    return `This action updates a #${id} bolest`;
  }

  remove(id: number) {
    return `This action removes a #${id} bolest`;
  }
}
