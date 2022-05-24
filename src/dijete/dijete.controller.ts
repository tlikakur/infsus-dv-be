import { DijeteService } from './dijete.service';
import { CreateDijeteDto } from './dto/createDijete.dto';
import { UpdateDijeteDto } from './dto/updateDijete.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode
} from '@nestjs/common';

@Controller('dijete')
export class DijeteController {
  constructor(private readonly dijeteService: DijeteService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createDijeteDto: CreateDijeteDto) {
    return this.dijeteService.create(createDijeteDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('oib') oib?: string) {
    return this.dijeteService.findAll(+oib);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.dijeteService.findOne(+id);
  }

  @Delete(':id/grupa')
  @HttpCode(200)
  deleteGroup(@Param('id') id: string) {
    return this.dijeteService.removeGroup(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateDijeteDto: UpdateDijeteDto) {
    return this.dijeteService.update(+id, updateDijeteDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.dijeteService.remove(+id);
  }
}
