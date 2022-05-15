import { Injectable } from '@nestjs/common';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';

@Injectable()
export class GrupaService {
  create(grupa: CreateGrupaDto) {
    return 'Adds new group';
  }

  findAll() {
    return `Returns list of groups`;
  }

  findOne(id: number) {
    return `Returns group #${id}`;
  }

  update(id: number, grupa: UpdateGrupaDto) {
    return `Updates group #${id}`;
  }

  remove(id: number) {
    return `Removes group #${id}`;
  }
}
