import { BolestService } from './bolest.service';
import { CreateBolestDto } from './dto/createBolest.dto';
import { UpdateBolestDto } from './dto/updateBolest.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  HttpCode
} from '@nestjs/common';

class DiseaseChildParams {
  diseaseId: string;
  childId: string;
}

@Controller('bolest')
export class BolestController {
  constructor(private readonly bolestService: BolestService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createBolestDto: CreateBolestDto) {
    return this.bolestService.create(createBolestDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('naziv') diseaseName: string) {
    return this.bolestService.findAll(diseaseName);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.bolestService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateBolestDto: UpdateBolestDto) {
    return this.bolestService.update(+id, updateBolestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolestService.remove(+id);
  }

  @Post(':diseaseId/dijete/:childId')
  @HttpCode(201)
  assignDiseaseToChild(@Param() params: DiseaseChildParams) {
    return this.bolestService.assignDiseaseToChild(+params.diseaseId, +params.childId);
  }

  @Delete(':diseaseId/dijete/:childId')
  @HttpCode(200)
  removeDiseaseFromChild(@Param() params: DiseaseChildParams) {
    return this.bolestService.removeDiseaseFromChild(+params.diseaseId, +params.childId);
  }
}
