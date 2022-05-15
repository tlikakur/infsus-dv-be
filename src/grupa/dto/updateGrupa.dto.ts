import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupaDto } from './createGrupa.dto';
import { IsString, IsNumber, IsOptional, MaxLength, MinLength, IsDate } from 'class-validator';
import { Dijete } from 'src/dijete/entities/dijete.entity';

export class UpdateGrupaDto extends PartialType(CreateGrupaDto) {
  
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova'})
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova'})
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  name!: string;

  @IsNumber({}, { message: 'ID odgajatelja mora biti brojčana vrijednost' })
  odgajatelj?: number; 

  @IsDate({message: 'Datum osnivanja mora biti u formatu YYYY-MM-DD'})
  datumosnivanja!: string;
  
  @IsOptional()
  iddjeca: Dijete[];
}
