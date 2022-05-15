import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BolestService } from './bolest.service';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';

@Controller('bolest')
export class BolestController {
  constructor(private readonly bolestService: BolestService) {}

  @Post()
  create(@Body() createBolestDto: CreateBolestDto) {
    return this.bolestService.create(createBolestDto);
  }

  @Get()
  findAll() {
    return this.bolestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBolestDto: UpdateBolestDto) {
    return this.bolestService.update(+id, updateBolestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolestService.remove(+id);
  }
}
