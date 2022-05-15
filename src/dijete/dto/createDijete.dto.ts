import { Grupa } from "../../grupa/entities/grupa.entity";
import { 
  IsDate, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  Max, 
  MaxLength, 
  Min, 
  MinLength 
} from "class-validator";


export class CreateDijeteDto {

  @Max(99999999999, { message: 'OIB djeteta mora sadržavati točno 11 znakova'})
  @Min(10000000000, { message: 'OIB djeteta mora sadržavati točno 11 znakova'})
  @IsNumber({}, { message: 'OIB djeteta mora biti brojčana vrijednost'})
  @IsNotEmpty({ message: 'OIB djeteta ne smije biti prazan'})
  oib!: string;

  @IsDate({message: 'Datum rodenja mora biti u formatu YYYY-MM-DD'})
  datumRodenja!: string;

  @MaxLength(30, {message: 'Ime djeteta može sadržavati najviše 30 znakova'})
  @MinLength(2, {message: 'Ime djeteta mora sadržavati barem 2 znaka'})
  @IsString({message: 'Ime djeteta mora biti niz znakova'})
  ime!: string;

  @MaxLength(30, {message: 'Prezime djeteta može sadržavati najviše 30 znakova'})
  @MinLength(2, {message: 'Prezime djeteta mora sadržavati barem 2 znaka'})
  @IsString({message: 'Prezime djeteta mora biti niz znakova'})
  prezime!: string;

  @IsNumber({}, {message: 'ID grupe mora biti brojčana vrijednost'})
  @IsOptional()
  idGrupa: Grupa;
}
