import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { BolestService } from './bolest.service';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';

class DiseaseChildParams {
  diseaseId: string;
  childId: string;
}

@Controller('bolest')
export class BolestController {
  constructor(private readonly bolestService: BolestService) {}

  @Post()
  create(@Body() createBolestDto: CreateBolestDto) {
    return this.bolestService.create(createBolestDto);
  }

  @Get()
  findAll(@Query('naziv') diseaseName: string) {
    return this.bolestService.findAll(diseaseName);
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

  @Post(':diseaseId/dijete/:childId')
  assignDiseaseToChild(@Param() params: DiseaseChildParams) {
    return this.bolestService.assignDiseaseToChild(+params.diseaseId, +params.childId);
  }

  @Delete(':diseaseId/dijete/:childId')
  removeDiseaseFromChild(@Param() params: DiseaseChildParams) {
    return this.bolestService.removeDiseaseFromChild(+params.diseaseId, +params.childId);
  }
}
