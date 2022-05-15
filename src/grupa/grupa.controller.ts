import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GrupaService } from './grupa.service';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';

@Controller('grupa')
export class GrupaController {
  constructor(private readonly grupaService: GrupaService) {}

  @Post()
  create(@Body() body: CreateGrupaDto) {
    return this.grupaService.create(body);
  }

  @Get()
  findAll() {
    return this.grupaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateGrupaDto) {
    return this.grupaService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupaService.remove(+id);
  }
}
