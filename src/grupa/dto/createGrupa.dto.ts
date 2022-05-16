import { Dijete } from 'src/dijete/entities/dijete.entity';
import { Odgajatelj } from 'src/model/entities/Odgajatelj';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateGrupaDto {
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova' })
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova ' })
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  @IsNotEmpty({ message: 'Ime grupe ne smije biti prazno' })
  naziv!: string;

  @IsDate({ message: 'Datum osnivanja mora biti u formatu YYYY-MM-DD' })
  @IsNotEmpty({ message: 'Datum osnivanja ne smije biti prazan' })
  datumosnivanja!: string;

  @IsNumber({}, { message: 'Odgajateljev ID mora biti brojčana vrijednost' })
  @IsOptional()
  idodgajatelj: number | Odgajatelj;

  @IsOptional()
  iddjeca: Dijete[] | number[];
}
