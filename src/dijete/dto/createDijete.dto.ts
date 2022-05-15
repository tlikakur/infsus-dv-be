import { IsDate, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDijeteDto {

  @IsDate({message: 'Datum rodenja mora biti u formatu YYYY-MM-DD'})
  datumRodenja!: Date;

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
  idGrupa: number;
}
