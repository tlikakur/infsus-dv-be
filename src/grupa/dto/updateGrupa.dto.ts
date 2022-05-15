import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupaDto } from './createGrupa.dto';
import { IsString, IsOptional, MaxLength, MinLength, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Dijete } from 'src/dijete/entities/dijete.entity';
import { Odgajatelj } from 'src/model/entities/Odgajatelj';

export class UpdateGrupaDto extends PartialType(CreateGrupaDto) {
  
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova' })
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova '})
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  @IsOptional()

  naziv: string;

  @IsNumber({}, { message: 'Odgajateljev ID mora biti brojčana vrijednost'})
  @IsOptional()
  idodgajatelj: number | Odgajatelj;

  @IsOptional()
  iddjeca: Dijete[] | number[];
}
