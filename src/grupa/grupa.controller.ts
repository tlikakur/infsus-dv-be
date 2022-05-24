import { GrupaService } from './grupa.service';
import { CreateGrupaDto } from './dto/createGrupa.dto';
import { UpdateGrupaDto } from './dto/updateGrupa.dto';
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

@Controller('grupa')
export class GrupaController {
  constructor(private readonly grupaService: GrupaService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateGrupaDto) {
    return this.grupaService.create(body);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('naziv') groupName?: string) {
    return this.grupaService.findAll(groupName);
  }

  @Get(':groupId')
  @HttpCode(200)
  findOne(@Param('groupId') groupId: string) {
    return this.grupaService.findOne(+groupId);
  }

  @Post(':groupId/dijete/:childId')
  @HttpCode(201)
  insertChild(@Param('groupId') groupId: string, @Param('childId') childId: string) {
    return this.grupaService.insertChild(+groupId, +childId);
  }

  @Patch(':groupId')
  @HttpCode(200)
  update(@Param('groupId') groupId: string, @Body() body: UpdateGrupaDto) {
    return this.grupaService.update(+groupId, body);
  }

  @Delete(':groupId')
  @HttpCode(200)
  remove(@Param('groupId') groupId: string) {
    return this.grupaService.remove(+groupId);
  }

  @Post(':groupId/djeca')
  @HttpCode(201)
  addChildren(
    @Param('groupId') groupId: string,
    @Query('childrenIds') childrenIds: string
  ) {
    return this.grupaService.addChildren(+groupId, childrenIds);
  }
}
