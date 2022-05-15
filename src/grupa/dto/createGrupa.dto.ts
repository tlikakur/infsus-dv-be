import { IsDate, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Dijete } from 'src/dijete/entities/dijete.entity';

export class CreateGrupaDto {
  
  @MaxLength(20, { message: 'Ime grupe može sadržavati najviše 20 znakova'})
  @MinLength(5, { message: 'Ime grupe mora sadržavati najmanje 5 znakova'})
  @IsString({ message: 'Ime grupe mora biti niz znakova' })
  naziv!: string;

  @IsDate({message: 'Datum osnivanja mora biti u formatu YYYY-MM-DD'})
  datumosnivanja!: string;

  @IsOptional()
  iddjeca: Dijete[];
}
