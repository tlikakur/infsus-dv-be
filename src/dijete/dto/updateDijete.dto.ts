import { PartialType } from '@nestjs/mapped-types';
import { CreateDijeteDto } from './createDijete.dto';
import { Grupa } from '../../grupa/entities/grupa.entity';
import { 
  IsDate, 
  IsNumber,
  IsOptional, 
  IsString, 
  Max, 
  MaxLength, 
  Min, 
  MinLength 
} from "class-validator";

export class UpdateDijeteDto extends PartialType(CreateDijeteDto) {

  @Max(99999999999, { message: 'OIB djeteta mora sadržavati točno 11 znakova'})
  @Min(10000000000, { message: 'OIB djeteta mora sadržavati točno 11 znakova'})
  @IsNumber({}, { message: 'OIB djeteta mora biti brojčana vrijednost'})
  oib: string;

  @IsDate({message: 'Datum rodenja mora biti u formatu datuma'})
  @IsOptional()
  datumrodenja: string;

  @MaxLength(30, {message: 'Ime djeteta može sadržavati najviše 30 znakova'})
  @MinLength(2, {message: 'Ime djeteta mora sadržavati barem 2 znaka'})
  @IsString({message: 'Ime djeteta mora biti niz znakova'})ž
  @IsOptional()
  ime: string;

  @MaxLength(30, {message: 'Prezime djeteta može sadržavati najviše 30 znakova'})
  @MinLength(2, {message: 'Prezime djeteta mora sadržavati barem 2 znaka'})
  @IsString({message: 'Prezime djeteta mora biti niz znakova'})
  @IsOptional()
  prezime: string;

  @IsNumber({}, {message: 'ID grupe mora biti brojčana vrijednost'})
  @IsOptional()
  idgrupa: Grupa;
}


