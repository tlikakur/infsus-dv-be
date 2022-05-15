import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupaDto } from './createGrupa.dto';
import { IsString, IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateGrupaDto extends PartialType(CreateGrupaDto) {
  
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova'})
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova'})
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  name!: string;

  @IsNumber({}, { message: 'ID odgajatelja mora biti brojčana vrijednost' })
  odgajateljId!: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  children: number[];
}
