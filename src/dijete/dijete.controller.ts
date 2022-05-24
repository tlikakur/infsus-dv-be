import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DijeteService } from './dijete.service';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';

@Controller('dijete')
export class DijeteController {
  constructor(private readonly dijeteService: DijeteService) {}

  @Post()
  create(@Body() createDijeteDto: CreateDijeteDto) {
    return this.dijeteService.create(createDijeteDto);
  }

  @Get()
  findAll(@Query('oib') oib?: string) {
    return this.dijeteService.findAll(+oib);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dijeteService.findOne(+id);
  }

  @Delete(':id/grupa')
  deleteGroup(@Param('id') id: string) {
    return this.dijeteService.removeGroup(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDijeteDto: UpdateDijeteDto) {
    return this.dijeteService.update(+id, updateDijeteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dijeteService.remove(+id);
  }
}
