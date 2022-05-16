import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  findAll(@Query('naziv') groupName?: string) {
    return this.grupaService.findAll(groupName);
  }

  @Get(':groupId')
  findOne(@Param('groupId') groupId: string) {
    return this.grupaService.findOne(+groupId);
  }

  @Post(':groupId/dijete/:childId')
  insertChild(@Param('groupId') groupId: string, @Param('childId') childId: string) {
    return this.grupaService.insertChild(+groupId, +childId);
  }

  @Patch(':groupId')
  update(@Param('groupId') groupId: string, @Body() body: UpdateGrupaDto) {
    return this.grupaService.update(+groupId, body);
  }

  @Delete(':groupId')
  remove(@Param('groupId') groupId: string) {
    return this.grupaService.remove(+groupId);
  }
}
